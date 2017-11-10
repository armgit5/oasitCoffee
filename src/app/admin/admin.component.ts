import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { User } from './users/users';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css',
                './animate.min.css',
                './demo.css',
                './light-bootstrap-dashboard.css']
})
export class AdminComponent implements OnInit {


  constructor(private loginService: LoginService) {
    loginService.userOutput.subscribe(
      (user: User) => {
        console.log(user);
      }
    );
  }

  ngOnInit() {
  }

}
