import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { QueueService } from './queue.service';
import { Queue } from './queue';
import { LoginService } from '../login/login.service';
import { Subscription, Observable } from 'rxjs/Rx';
import { User } from '../admin/users/users';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})

export class QueueComponent implements OnInit, OnDestroy {

  queues: Queue[];
  userUrl: string;
  $login: Subscription;
  role = '';
  highlighted = false;

  constructor(private queueService: QueueService,
    private loginService: LoginService) {
    if (this.loginService.user.email == null) {
      loginService.userOutput.subscribe(
        (user: User) => {
          this.role = user.role;
        }
      );
    } else {
      this.role = this.loginService.user.role;
    }

    // $('#fresh-table').bootstrapTable({
    //   toolbar: ".toolbar",
    //   showRefresh: true,
    //   search: false,
    //   showToggle: true,
    //   showColumns: true,
    //   pagination: true,
    //   striped: true
    // });
  }

  ngOnInit() {
    this.queueService.getQueue().subscribe(
      queues => {
        this.queues = queues;
      }
    );

    let timer = Observable.timer(2000, 1000);
    timer.subscribe(t => {
      if (this.highlighted) {
        this.highlighted = false;
      } else {
        this.highlighted = true;
      }
    });

  }

  deleteQueue($key) {
    this.queueService.deleteQueue($key);
  }

  markReady($key, status) {
    this.queueService.markReady($key, status);
  }

  ngOnDestroy() {

  }
}
