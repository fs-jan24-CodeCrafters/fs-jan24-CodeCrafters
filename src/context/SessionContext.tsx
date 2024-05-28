import React, { createContext, useContext, useEffect, useReducer } from 'react';
import * as z from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { t } from 'i18next';

import useLocalStorage from '../hooks/useLocalStorage';
import { UserSession } from '../types/User';
import { getUserById, loginUser } from '../api/user';
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
  googleLogin: () => void;
  logout: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType>({
  ...initialState,
  dispatch: () => {},
  login: async () => {},
  googleLogin: () => {},
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

  const navigate = useNavigate();

  const [userId] = useSearchParams();
  const userIdParam = userId.get('userId');

  const loginByGoogle = async (id: string) => {
    try {
      const sessionData = await getUserById(id);
      dispatch({ type: 'auth/setUser', payload: sessionData });
      setUserSession(sessionData);

      if (userId) {
        navigate('/', { replace: true });
      }
    } catch (e) {
      toast.error(t('common:auth.errorRegister'));
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    if (userIdParam) {
      loginByGoogle(userIdParam);
    }
  }, [userIdParam]);

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

  const googleLogin = () => {
    window.location.href =
      'https://fs-jan24-code-crafters-server.vercel.app/api/auth/google';
  };

  return (
    <SessionContext.Provider
      value={{ session, dispatch, login, logout, googleLogin }}
    >
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
