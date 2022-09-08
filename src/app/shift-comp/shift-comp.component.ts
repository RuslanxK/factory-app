import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { Subscription } from 'rxjs';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-shift-comp',
  templateUrl: './shift-comp.component.html',
  styleUrls: ['./shift-comp.component.scss'],
})
export class ShiftCompComponent implements OnInit {
  sub: Subscription = new Subscription();
  faXmarkCircle = faXmarkCircle;

  @Input()
  shift: any = '';
  @Input()
  employee: any = {};
  deletePopup: boolean = false;
  actions: any = 0;
  user: any = {};

  constructor(
    private srv: UtilsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  back() {
    this.deletePopup = false;
  }

  openPopup() {
    this.deletePopup = true;
  }

  deleteShift() {
    let shift = this.employee.shifts.find((s: any) => s == this.shift);

    let index = this.employee.shifts.indexOf(this.shift);

    if (shift) {
      this.employee.shifts.splice(index, 1);
      this.sub = this.srv
        .updateEmployee(this.employee._id, this.employee)
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
              this.router.navigate([`/app/employee/${this.employee._id}`], {
                relativeTo: this.route,
              });
            });
          }
        });
    }
  }

  ngOnInit(): void {
    this.actions = sessionStorage.getItem('actions');
    this.user = sessionStorage.getItem('user');
    this.user = JSON.parse(this.user);
  }
}
