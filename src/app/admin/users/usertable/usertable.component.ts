import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsersService } from '../users.service';
import { User } from '../users';

@Component({
  selector: 'usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['../../admin.component.css',
                '../../animate.min.css',
                '../../demo.css',
                '../../light-bootstrap-dashboard.css',
                './usertable.component.css']
})
export class UserTableComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  @ViewChild('staticModal') button;
  users: User[];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.loadAllUsers();
  }

  newUser() {
    this.button.show();
  }

  hide() {
  this.button.hide();
}

  hideModal() {
    this.hide();
  }

  loadAllUsers() {
    this.usersService.loadAllUsers().subscribe(
      users => {
        console.log(users);
        this.users = users;
      }
    );
  }

  deleteUser($key: string, uid: string) {
    this.usersService.deleteUser($key, uid);
  }

  ngOnDestroy() {

  }
}
