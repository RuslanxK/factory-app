import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilsService } from '../utils.service';
import { faXmarkCircle, faEdit } from '@fortawesome/free-regular-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  sub: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  @Input()
  departmentId: any = '';
  department: Department = {
    _id: '',
    name: '',
    manager: '',
  };
  faXmarkCircle = faXmarkCircle;
  faEdit = faEdit;
  deletePopup: boolean = false;
  actions: any = 0;
  user: any = {};
  fullname: any = '';

  constructor(
    private srv: UtilsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  editDep() {
    this.router.navigate(['/app/edit-department/' + this.departmentId]);
  }

  displayPopup() {
    this.deletePopup = true;
  }

  deleteDep() {
    this.sub2 = this.srv.deleteDepartment(this.departmentId).subscribe(() => {
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

  back() {
    this.deletePopup = false;
  }

  ngOnInit(): void {
    this.actions = sessionStorage.getItem('actions');
    this.user = sessionStorage.getItem('user');
    this.user = JSON.parse(this.user);

    this.sub = this.srv
      .getDepartment(this.departmentId)
      .subscribe((data: any) => (this.department = data));

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
