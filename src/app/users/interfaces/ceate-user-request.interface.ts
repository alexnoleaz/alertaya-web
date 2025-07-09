export interface CreateUserRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone?: string;
  roleNames?: string[];
}
