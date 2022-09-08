import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Department } from '../department';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {
  sub: Subscription = new Subscription();

  departments: Department[] = [];
  filteredDepartments: Department[] = [];
  fullname: any = ''

  constructor(private srv: UtilsService, private router: Router) {}

  search(value: any) {
    this.filteredDepartments = this.departments.filter(
      (department: Department) =>
        department.name.toLowerCase().startsWith(value) ||
        department.manager.toLowerCase().startsWith(value)
    );
  }

  ngOnInit(): void {
    this.sub = this.srv.getAllDepartments().subscribe((data: any) => {
      this.departments = data;
      this.filteredDepartments = data;
    });

    this.fullname = sessionStorage.getItem('fullname')
    if(!this.fullname) {

       this.router.navigate(['/'])
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
