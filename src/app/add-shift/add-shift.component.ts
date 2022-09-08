import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.scss'],
})
export class AddShiftComponent implements OnInit {
  sub: Subscription = new Subscription();
  sub2: Subscription = new Subscription();

  employeeId: any = '';
  employee: any = {};
  date: any = '';
  notExistData: boolean = false;
  text: boolean = false;
  actions: any = 0;
  user: any = {};
  fullname: any = '';

  constructor(
    private router: Router,
    private avr: ActivatedRoute,
    private srv: UtilsService,
    private route: ActivatedRoute
  ) {}

  data() {
    this.notExistData = false;
    this.text = false;
  }

  addShift() {
    const sameDate = this.employee.shifts.find(
      (shift: any) => shift === this.date
    );

    if (this.date && !sameDate) {
      this.employee.shifts.push(this.date);

      this.sub2 = this.srv
        .updateEmployee(this.employeeId, this.employee)
        .subscribe(() => {
          if (this.actions == 0) {
            this.router.navigate(['/']);
          } else {
            this.actions = this.actions - 1;
            sessionStorage.setItem('actions', this.actions);

            const obj = { actions: this.actions };

            this.srv.updateUser(this.user._id, obj).subscribe(() => {
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate([`/app/employee/${this.employeeId}`], {
                relativeTo: this.route,
              });
            });
          }
        });
    } else if (!this.date) {
      this.notExistData = true;
      this.text = false;
    } else {
      this.text = true;
      this.notExistData = false;
    }
  }

  ngOnInit(): void {
    this.actions = sessionStorage.getItem('actions');
    this.user = sessionStorage.getItem('user');
    this.user = JSON.parse(this.user);

    this.avr.params.subscribe((data: any) => {
      this.employeeId = data['id'];

      this.sub = this.srv
        .getEmployee(this.employeeId)
        .subscribe((data: any) => (this.employee = data));
    });

    this.fullname = sessionStorage.getItem('fullname');
    if (!this.fullname) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
