import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private api: ServiceService){}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginFormSubmit(){
    if(this.loginForm.valid){
    console.log(this.loginForm.value);
    localStorage.setItem('token', JSON.stringify(this.loginForm.value.email));
    localStorage.setItem('userName', JSON.stringify(this.loginForm.value.email));
    this.api.loggedIn(true);
    this.router.navigate(['/todos']);
  }
}
}
