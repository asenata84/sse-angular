import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class SseService {
  url: string = 'http://localhost:3002/events';
  eventSource: EventSource;

  constructor(private _zone: NgZone) {
    this.eventSource = new EventSource(this.url)
  }

  getServerSentEvent(): Observable<any> {
    return Observable.create((observer: any) => {
      this.eventSource.onmessage = event => {
        this._zone.run(() => {
          observer.next(event);
        });
      };

      this.eventSource.onerror = error => {
        this._zone.run(() => {
          observer.error(error);
        });
      };

    });
  }

  stopEventSource() {
    this.eventSource.close();
  }

  startEventSource() {
    this.eventSource.close();
    this.eventSource = new EventSource(this.url)
  }
}
