import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from '../employee';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  sub: Subscription = new Subscription();

  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  fullname: any = '';

  constructor(private srv: UtilsService, private router: Router) {}

  search(value: any) {
    this.filteredEmployees = this.employees.filter(
      (employee: Employee) =>
        employee.firstname.toLowerCase().startsWith(value) ||
        employee.lastname.toLowerCase().startsWith(value) ||
        employee.department.toLowerCase().startsWith(value)
    );
  }

  ngOnInit(): void {
    this.sub = this.srv.getAllEmployees().subscribe((data: any) => {
      this.employees = data;
      this.filteredEmployees = data;
      
    });

    this.fullname = sessionStorage.getItem('fullname');
    if (!this.fullname) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
