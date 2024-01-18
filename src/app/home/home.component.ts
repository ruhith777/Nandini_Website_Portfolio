import { Component } from '@angular/core';
import { Task1Service } from '../task1.service';
import { FormBuilder, FormGroup } from '@angular/forms';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  orgdetails: FormGroup;
  array = [];
  constructor(private org: Task1Service,
    private _fb: FormBuilder
  ) { }
  ngOnInit() {
    this.initializeForm();
    this.getAll();
  }
  initializeForm() {
    this.orgdetails = this._fb.group({
      tableName: [''],
      status: [' '],
    })
  }
  get id() { return this.orgdetails.get('id') };
  get tableName() { return this.orgdetails.get('tableName') };
  get status() { return this.orgdetails.get('status') };
  getAll() {
    this.org.DashboardTabList().subscribe(data => {
        this.array=data;    
        console.log(this.array, "array1") ;    
    })
  }  
}