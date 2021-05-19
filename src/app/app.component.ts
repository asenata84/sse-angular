import { Component } from '@angular/core';
import { SseService } from "./sse.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sse-angular';
  message = null;
  startSSE: Function;
  stopSSE: Function;

  constructor(private sseService: SseService) {
    this.startSSE = () => {
      this.sseService.startEventSource()
    }

    this.stopSSE = () => {
      this.sseService.stopEventSource()
    }
  }

  ngOnInit() {
    this.sseService
      .getServerSentEvent()
      .subscribe(data => {
        this.message = JSON.parse(data.data);
        console.log(data.data)
      });
  }

}
