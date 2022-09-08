import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Department } from '../department';
import { Employee } from '../employee';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  sub: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  employeeId: any = '';
  fullname: any = '';
  disableOption: any = false;
  employee: Employee = {
    firstname: '',
    lastname: '',
    startwork: 0,
    department: '',
    shifts: [],
    _id: undefined,
  };
  departments: Department[] = [];
  dep: any = '';
  actions: any = 0;
  user: any = {};
  editEmployeeMessage: boolean = false;

  constructor(
    private srv: UtilsService,
    private router: Router,
    private avr: ActivatedRoute
  ) {}

  submit() {
    if (
      (!this.employee.firstname &&
        !this.employee.lastname &&
        !this.employee.startwork &&
        !this.employee.department) ||
      !this.employee.firstname ||
      !this.employee.lastname ||
      !this.employee.startwork ||
      !this.employee.department
    ) {
      this.editEmployeeMessage = true;
    } else if (
      this.employee.firstname.length &&
      this.employee.lastname.length &&
      this.employee.startwork
    ) {
      this.srv.updateEmployee(this.employeeId, this.employee).subscribe(() => {
        if (this.actions == 0) {
          this.router.navigate(['/']);
        } else {
          this.actions = this.actions - 1;
          sessionStorage.setItem('actions', this.actions);

          const obj = { actions: this.actions };

          this.srv.updateUser(this.user._id, obj).subscribe(() => {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['/app/employees'], {
              relativeTo: this.avr,
            });
          });
        }
      });
    }
  }

  onChange(optionVal: any) {
    this.employee.department = optionVal;
  }

  ngOnInit(): void {
    this.actions = sessionStorage.getItem('actions');
    this.user = sessionStorage.getItem('user');
    this.user = JSON.parse(this.user);

    this.avr.params.subscribe((data) => {
      this.employeeId = data['id'];

      this.sub = this.srv
        .getEmployee(this.employeeId)
        .subscribe((data: any) => (this.employee = data));

      this.sub2 = this.srv.getAllDepartments().subscribe((data: any) => {
        this.departments = data;

        this.departments.forEach((department: any) => {
          if (department.name === this.employee.department) {
            this.dep = department.name;
          }
        });

        let arr: any[] = [];
        this.departments.forEach((department: any) => {
          if (department.name != this.dep) {
            arr.push(department);
          }
        });

        this.departments = arr;
      });
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
