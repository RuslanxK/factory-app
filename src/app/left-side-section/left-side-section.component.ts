import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faCodeBranch,
  faUser,
  faFileLines,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-left-side-section',
  templateUrl: './left-side-section.component.html',
  styleUrls: ['./left-side-section.component.scss'],
})
export class LeftSideSectionComponent implements OnInit {
  faCodeBranch = faCodeBranch;
  faUser = faUser;
  faFileLines = faFileLines;

  constructor(private router: Router) {}

  navigateEmps() {
    this.router.navigate(['/app/employees']);
  }

  navigateDeps() {
    this.router.navigate(['/app/departments']);
  }

  ngOnInit(): void {}
}
