import { Component, OnInit } from '@angular/core';
import { Task1Service } from './task1.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Master } from './master';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(){}
  ngOnInit(): void {
  }
  path: string = "./assets/clockimage.jpg"
  
}