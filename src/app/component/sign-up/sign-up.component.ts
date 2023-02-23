import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private api: ServiceService) {
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.signUpForm.controls['confirmPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signUpForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, this.confirmationValidator]]
    });
  }

  signUpFormSubmit(){
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value);
      localStorage.setItem('token', JSON.stringify(this.signUpForm.value.email));
      localStorage.setItem('useName', JSON.stringify(this.signUpForm.value.email));
      this.api.loggedIn(true);
      this.router.navigate(['/todos']);
    }
    
  }
}
