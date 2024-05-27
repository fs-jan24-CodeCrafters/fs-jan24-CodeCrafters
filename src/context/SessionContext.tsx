import React, { createContext, useContext, useEffect, useReducer } from 'react';
import * as z from 'zod';

import useLocalStorage from '../hooks/useLocalStorage';
import { UserSession } from '../types/User';
import { loginUser } from '../api/user';
import { LoginSchema } from '../schemas';

type State = {
  session: UserSession | null;
};

const initialState: State = {
  session: null,
};

type SessionContextType = State & {
  dispatch: React.Dispatch<Action>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType>({
  ...initialState,
  dispatch: () => {},
  login: async () => {},
  logout: async () => {},
});

export type Action =
  | { type: 'auth/setUser'; payload: UserSession }
  | { type: 'auth/clearUser' };

type Props = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'auth/setUser':
      return { ...state, session: action.payload };
    case 'auth/clearUser':
      return { ...state, session: null };
    default:
      return state;
  }
}

const SessionProvider: React.FC<Props> = ({ children }) => {
  const [userSession, setUserSession] = useLocalStorage<UserSession | null>(
    'session',
    null,
  );

  const [{ session }, dispatch] = useReducer(reducer, initialState, () => {
    return {
      ...initialState,
      session: userSession,
    };
  });

  useEffect(() => {
    setUserSession(session);
  }, [session]);

  const login = async (userData: z.infer<typeof LoginSchema>) => {
    const sessionData = await loginUser(userData);
    dispatch({ type: 'auth/setUser', payload: sessionData });
    setUserSession(sessionData);
  };

  const logout = async () => {
    setUserSession(null);
  };

  return (
    <SessionContext.Provider value={{ session, dispatch, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSession must be used within an SessionProvider');
  }

  return context;
};

export { useSession, SessionProvider };
