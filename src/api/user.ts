import * as z from 'zod';

import { BASE_URL } from '../helpers/fetchClient';
import { LoginSchema, RegistrationSchema } from '../schemas';
import { UserSession } from '../types/User';

const fetchData = async <T extends z.ZodTypeAny>(
  url: string,
  data: unknown,
  schema: T,
) => {
  const parseResult = schema.safeParse(data);

  if (!parseResult.success) {
    throw parseResult.error.format();
  }
  const response = await fetch(`${BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
  const result = await response.json();

  return result;
};

export const createUser = async (data: z.infer<typeof RegistrationSchema>) => {
  return fetchData('/api/auth/register', data, RegistrationSchema);
};

export const loginUser = async (
  data: z.infer<typeof LoginSchema>,
): Promise<UserSession> => {
  return fetchData('/api/auth/login', data, LoginSchema);
};
