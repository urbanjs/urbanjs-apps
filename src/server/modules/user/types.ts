export const TYPE_USER_SERVICE = 'TYPE_USER_SERVICE';

export type User = {
  id: string;
  displayName: string;
};

export interface IUserService {
  getUser(id: string): Promise<User>;
  createUser(user: User): Promise<User>;
}
