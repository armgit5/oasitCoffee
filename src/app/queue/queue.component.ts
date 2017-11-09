import { Component, OnInit, OnDestroy } from '@angular/core';
import { QueueService } from './queue.service';
import { Queue } from './queue';
import { LoginService } from '../login/login.service';
import { Subscription } from 'rxjs/Rx';
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

  constructor(private queueService: QueueService,
              private loginService: LoginService) {

                loginService.userOutput.subscribe(
                  (user: User) => {
                    this.role = user.role;
                  }
                );
  }

  ngOnInit() {
    this.queueService.getQueue().subscribe(
      queues => {
        this.queues = queues;
      }
    );
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
