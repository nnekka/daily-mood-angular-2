import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string
  password: string
  sub: Subscription
  @ViewChild('loginForm') form: any

  constructor(

  ) {}

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.form.value)
  }

}
