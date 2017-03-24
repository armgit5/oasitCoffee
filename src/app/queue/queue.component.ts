import { Component, OnInit } from '@angular/core';
import { QueueService } from './queue.service';
import { Queue } from './queue';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  queues: Queue[];

  constructor(private queueService: QueueService) { }

  ngOnInit() {
    // this.queue.customerName = this.queueService.queue.customerName;
    this.queueService.getQueue().subscribe(
      queues => this.queues = queues
    );
  }


}
