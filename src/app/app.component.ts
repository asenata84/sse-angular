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

  constructor(private sseService: SseService) { }

  startSSE() {
    this.sseService
      .startEventSource()
      .subscribe(data => {
        this.message = JSON.parse(data.data);
        console.log(data.data)
      });
  }

  stopSSE() {
    this.sseService.stopEventSource()
  }

  ngOnInit() {
    this.startSSE()
  }

}
