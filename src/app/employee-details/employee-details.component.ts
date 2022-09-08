import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from '../employee';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
  sub: Subscription = new Subscription();

  employeeId: any = '';
  fullname: any = ''
  employee: Employee = {
    firstname: '',
    lastname: '',
    startwork: 0,
    department: '',
    shifts: [],
    _id: undefined
  };


  constructor(
    private avr: ActivatedRoute,
    private srv: UtilsService,
    private router: Router
  ) {}

  addShift() {
    this.router.navigate(['/app/add-shift/' + this.employeeId]);
  }

  ngOnInit(): void {
    this.avr.params.subscribe((data: any) => {
      this.employeeId = data['id'];
      this.sub = this.srv
        .getEmployee(this.employeeId)
        .subscribe((data: any) => (this.employee = data));
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
