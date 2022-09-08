import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employee/employee.component';
import { RightSideSectionComponent } from './right-side-section/right-side-section.component';
import { LeftSideSectionComponent } from './left-side-section/left-side-section.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentComponent } from './department/department.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AddShiftComponent } from './add-shift/add-shift.component';
import { ShiftCompComponent } from './shift-comp/shift-comp.component';






const appRoutes : Routes = [{path: "", component: LoginComponent},
                            {path: "app", component: HomepageComponent, 
                            children:[{path: "employees", component: EmployeesComponent},
                                      {path: "add-employee", component: AddEmployeeComponent},
                                      {path: "edit-employee/:id", component: EditEmployeeComponent},
                                      {path: "departments", component: DepartmentsComponent},
                                      {path: "add-department", component: AddDepartmentComponent },
                                      {path: "edit-department/:id", component: EditDepartmentComponent},
                                      {path: "add-shift/:id", component: AddShiftComponent},
                                      {path: "employee/:id", component: EmployeeDetailsComponent}]}]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    NavbarComponent,
    EmployeesComponent,
    EmployeeComponent,
    RightSideSectionComponent,
    LeftSideSectionComponent,
    AddEmployeeComponent,
    DepartmentsComponent,
    DepartmentComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    EditEmployeeComponent,
    EmployeeDetailsComponent,
    AddShiftComponent,
    ShiftCompComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
