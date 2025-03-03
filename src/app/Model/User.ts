// user.model.ts

export class User {
  id?: number;
  email: string;
  username: string;
  password: string;

  constructor(email: string, username: string, password: string, id?: number) {
    this.email = email;
    this.username = username;
    this.password = password;
    if (id) this.id = id;
  }
}
