export class Employee {
  constructor(
    public _id: any,
    public firstname: string,
    public lastname: string,
    public startwork: number,
    public department: string,
    public shifts: []
  ) {}
}
