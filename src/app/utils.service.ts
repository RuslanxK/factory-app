import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from './department';
import { Employee } from './employee';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private http: HttpClient) {}

  getAllUsers = () => {
    return this.http.get('https://factory-app.herokuapp.com/api/users');
  };

  AddUser = (obj: User) => {
    return this.http.post('https://factory-app.herokuapp.com/api/users', obj);
  };

  updateUser = (id: any, obj: any) => {
    return this.http.put('https://factory-app.herokuapp.com/api/users/' + id, obj);
  };

  getAllEmployees = () => {
    return this.http.get('https://factory-app.herokuapp.com/api/employees');
  };

  getEmployee = (id: Employee) => {
    return this.http.get('https://factory-app.herokuapp.com/api/employees/' + id);
  };

  updateEmployee = (id: any, obj: Employee) => {
    return this.http.put('https://factory-app.herokuapp.com/api/employees/' + id, obj);
  };

  deleteEmployee = (id: any) => {
    return this.http.delete('https://factory-app.herokuapp.com/api/employees/' + id);
  };

  getAllDepartments = () => {
    return this.http.get('https://factory-app.herokuapp.com/api/departments/');
  };

  getDepartment = (id: Department) => {
    return this.http.get('https://factory-app.herokuapp.com/api/departments/' + id);
  };

  addDepartment = (obj: Department) => {
    return this.http.post('https://factory-app.herokuapp.com/api/departments/', obj);
  };

  editDepartment = (id: any, obj: Department) => {
    return this.http.put('https://factory-app.herokuapp.com/api/departments/' + id, obj);
  };

  deleteDepartment = (id: any) => {
    return this.http.delete('https://factory-app.herokuapp.com/api/departments/' + id);
  };

  addEmployee = (obj: Employee) => {
    return this.http.post('https://factory-app.herokuapp.com/api/employees/', obj);
  };
}
