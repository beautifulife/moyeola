interface UserModel {
  id;
}

declare global {
  namespace Express {
    export interface User extends UserModel {}
  }
}
