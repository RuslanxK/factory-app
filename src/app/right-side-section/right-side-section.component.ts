import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faUserPlus,
  faFileCirclePlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-right-side-section',
  templateUrl: './right-side-section.component.html',
  styleUrls: ['./right-side-section.component.scss'],
})
export class RightSideSectionComponent implements OnInit {
  faUserPlus = faUserPlus;
  faFileCirclePlus = faFileCirclePlus;

  fullname: any = '';
  actions: any = 0;

  constructor(private router: Router) {}

  addEmployee() {
    this.router.navigate(['/app/add-employee']);
  }

  addDepartment() {
    this.router.navigate(['/app/add-department']);
  }

  ngOnInit(): void {
    this.fullname = sessionStorage.getItem('fullname');
    this.actions = sessionStorage.getItem('actions');
  }
}
