import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employees } from 'src/app/models/employee';
import { EmployeesService } from 'src/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  employeeDetails: Employees = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: '',
  };

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.employeeService.getEmployee(id).subscribe({
            next: (Response) => {
              this.employeeDetails = Response;
            },
          });
        }
      },
    });
  }
  updateEmployee() {
    this.employeeService
      .updateEmployee(this.employeeDetails.id, this.employeeDetails)
      .subscribe({
        next: (Response) => {
          this.router.navigate(['employees']);
        },
      });
  }
  deleteEmployee(id:string) {
    this.employeeService
      .deleteEmployee(id)
      .subscribe({
        next: (Response) => {
          this.router.navigate(['employees']);
        },
      });
  }
}
