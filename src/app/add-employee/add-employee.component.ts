import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Department } from '../department';
import { Employee } from '../employee';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  sub: Subscription = new Subscription();
  emp: Employee = {
    firstname: '',
    lastname: '',
    startwork: 0,
    department: '',
    shifts: [],
    _id: undefined,
  };
  departments: Department[] = [];
  disableOption: boolean = false;
  actions: any = 0;
  user: any = {};
  fullname: any = '';
  addEmployeeMessage: boolean = false;

  constructor(
    private srv: UtilsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  submit() {
    if (
      (!this.emp.firstname &&
        !this.emp.lastname &&
        !this.emp.startwork &&
        !this.emp.department) ||
      !this.emp.firstname ||
      !this.emp.lastname ||
      !this.emp.startwork ||
      !this.emp.department
    ) {
      this.addEmployeeMessage = true;
    } else if (
      this.emp.firstname.length &&
      this.emp.lastname.length &&
      this.emp.startwork
    ) {
      this.sub = this.srv.addEmployee(this.emp).subscribe(() => {
        if (this.actions === 0) {
          this.router.navigate(['/']);
        } else {
          this.actions = this.actions - 1;
          sessionStorage.setItem('actions', this.actions);

          const obj = { actions: this.actions };

          this.srv.updateUser(this.user._id, obj).subscribe(() => {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['/app/employees'], {
              relativeTo: this.route,
            });
          });
        }
      });
    }
  }

  onChange(optionVal: any) {
    this.emp.department = optionVal;
  }

  disableFirstOption() {
    this.disableOption = true;
  }

  ngOnInit(): void {
    this.actions = sessionStorage.getItem('actions');
    this.user = sessionStorage.getItem('user');
    this.user = JSON.parse(this.user);

    this.sub = this.srv
      .getAllDepartments()
      .subscribe((data: any) => (this.departments = data));

    this.fullname = sessionStorage.getItem('fullname');
    if (!this.fullname) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
