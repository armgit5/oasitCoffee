import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['../../admin.component.css',
                '../../animate.min.css',
                '../../demo.css',
                '../../light-bootstrap-dashboard.css',
                './usertable.component.css']
})
export class UserTableComponent implements OnInit {

  registerForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
