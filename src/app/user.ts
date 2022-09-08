export class User {
  constructor(
    public _id: string,
    public fullname: string,
    public username: string,
    public password: string,
    public actions: any
  ) {}
}
