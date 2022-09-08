import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss'],
})
export class AddDepartmentComponent implements OnInit {
  sub: Subscription = new Subscription();
  dep: any = {};
  actions: any = 0;
  user: any = {};
  fullname: any = '';
  addDepartmentMessage: boolean = false;

  constructor(
    private srv: UtilsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  submit() {
    if (
      (!this.dep.manager && !this.dep.name) ||
      !this.dep.manager ||
      !this.dep.name
    ) {
      this.addDepartmentMessage = true;
    } else if (this.dep.manager.length && this.dep.name.length) {
      this.sub = this.srv.addDepartment(this.dep).subscribe(() => {
        if (this.actions == 0) {
          this.router.navigate(['/']);
        } else {
          this.actions = this.actions - 1;
          sessionStorage.setItem('actions', this.actions);

          const obj = { actions: this.actions };

          this.srv.updateUser(this.user._id, obj).subscribe(() => {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['/app/departments'], {
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

    this.fullname = sessionStorage.getItem('fullname');
    if (!this.fullname) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
