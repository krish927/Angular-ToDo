import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  signUp: boolean = true;
  logIn: boolean = false;
  logOut: boolean = false;
  apiKey: string = '261f1522f2a24e77bba550db239af261';
  city: any;
  location: any;

  constructor(private api: ServiceService, private router: Router) {
  }

  ngOnInit() {
    if(this.api.isLoggedIn()){
      this.logOut = true;
        this.logIn = false;
        this.signUp = false;
        this.getLocation();
  }
  this.api.loggedInEvent.subscribe((data)=>{
    if(data){
      this.logOut = true;
      this.logIn = false;
      this.signUp = false;
    }
  })
  
  this.city = (localStorage.getItem('city') == null || localStorage.getItem('city') == undefined) ? localStorage.getItem('city') : ""; 
}


  signUpClick(){
    this.signUp = false;
    this.logIn = true;
    this.api.signUpClicked(true);
  }

  logInClick(){
    this.signUp = true;
    this.logIn = false;
    this.api.logInClicked(true);
  }

  logOutClick(){
    this.signUp = true;
    this.logIn = false;
    this.logOut = false;
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  getLocation() {
    this.api.getLocation(this.apiKey).subscribe((data)=>{
      console.log(data);
      this.location =  data;
      this.city = this.location.city;
      JSON.stringify(localStorage.setItem('city', this.city));
    })
  }
}
