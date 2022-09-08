import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilsService } from '../utils.service';
import {
  faCalendarPlus,
  faXmarkCircle,
  faEdit,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  sub: Subscription = new Subscription();

  @Input()
  employeeId: any = '';
  employee: Employee = {
    firstname: '',
    lastname: '',
    startwork: 0,
    department: '',
    shifts: [],
    _id: undefined,
  };
  faCalendarPlus = faCalendarPlus;
  faXmarkCircle = faXmarkCircle;
  faEdit = faEdit;
  faUser = faUser;
  deletePopup = false;
  actions: any = 0;
  user: any = {};

  constructor(
    private srv: UtilsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  moreDetails() {
    this.router.navigate(['/app/employee/' + this.employeeId]);
  }

  displayPopup() {
    this.deletePopup = true;
  }

  deleteEmp() {
    this.srv.deleteEmployee(this.employeeId).subscribe(() => {
      if (this.actions == 0) {
        this.router.navigate(['/']);
      } else {
        this.actions = this.actions - 1;
        sessionStorage.setItem('actions', this.actions);

        const obj = { actions: this.actions };

        this.srv.updateUser(this.user._id, obj).subscribe(() => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/app/employees'], { relativeTo: this.route });
        });
      }
    });
  }

  addShifts() {
    this.router.navigate(['/app/add-shift/' + this.employeeId]);
  }

  editEmp() {
    this.router.navigate(['/app/edit-employee/' + this.employeeId]);
  }

  back() {
    this.deletePopup = false;
  }

  ngOnInit(): void {
    this.actions = sessionStorage.getItem('actions');
    this.user = sessionStorage.getItem('user');
    this.user = JSON.parse(this.user);

    this.sub = this.srv
      .getEmployee(this.employeeId)
      .subscribe((data: any) => (this.employee = data));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
