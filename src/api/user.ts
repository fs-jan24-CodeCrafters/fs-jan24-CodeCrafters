import { BASE_URL } from '../helpers/fetchClient';
import { LoginSchema, RegistrationSchema } from '../schemas';
import * as z from 'zod';

const fetchData = async <T extends z.ZodTypeAny>(
  url: string,
  data: unknown,
  schema: T,
) => {
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
  return schema.parse(result);
};

export const createUser = async (data: z.infer<typeof RegistrationSchema>) => {
  return fetchData('/api/auth/register', data, RegistrationSchema);
};

export const loginUser = async (data: z.infer<typeof LoginSchema>) => {
  return fetchData('/api/auth/login', data, LoginSchema);
};
