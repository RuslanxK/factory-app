import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Department } from '../department';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss'],
})
export class EditDepartmentComponent implements OnInit {
  sub: Subscription = new Subscription();
  sub2: Subscription = new Subscription();

  departmentId: any = '';
  department: Department = {
    _id: '',
    name: '',
    manager: '',
  };
  actions: any = 0;
  user: any = {};
  fullname: any = '';
  editDepartmentMessage: boolean = false;

  constructor(
    private srv: UtilsService,
    private router: Router,
    private avr: ActivatedRoute
  ) {}

  submit() {
    if (
      (!this.department.manager && !this.department.name) ||
      !this.department.manager ||
      !this.department.name
    ) {
      this.editDepartmentMessage = true;
    } else if (this.department.manager.length && this.department.name.length) {
      this.sub2 = this.srv
        .editDepartment(this.departmentId, this.department)
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
              this.router.navigate(['/app/departments'], {
                relativeTo: this.avr,
              });
            });
          }
        });
    }
  }

  ngOnInit(): void {
    this.avr.params.subscribe((data) => {
      this.departmentId = data['id'];

      this.sub = this.srv
        .getDepartment(this.departmentId)
        .subscribe((data: any) => (this.department = data));
    });

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
    this.sub2.unsubscribe();
  }
}
