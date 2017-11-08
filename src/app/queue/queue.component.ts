import { Component, OnInit, OnDestroy } from '@angular/core';
import { QueueService } from './queue.service';
import { Queue } from './queue';
import { LoginService } from '../login/login.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit, OnDestroy {

  queues: Queue[];
  userUrl: string;
  $login: Subscription;

  constructor(private queueService: QueueService,
              private loginService: LoginService) {


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
