import { Component } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
logIn: boolean = true;
signUp: boolean = false

  constructor(private api: ServiceService) {}

  ngOnInit() {
    this.api.signUpClickedEvent.subscribe((data)=>{
      console.log(data);
      this.signUp = data;
      this.logIn = false
    })

    this.api.logInClickedEvent.subscribe((data)=>{
      console.log(data);
      this.logIn = data;
      this.signUp = false
    })
  }
}
