export interface User {
  id: string;
  name?: string;
  email: string;
  image?: string;
  password?: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
}
