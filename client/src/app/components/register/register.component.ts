import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm') registerForm: any
  @ViewChild('input') inputRef: ElementRef

  name: string
  email: string
  password: string
  image: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.registerForm.value)
  }

  onFileUpload(){

  }
  triggerClick(){
    this.inputRef.nativeElement.click()
  }

}
