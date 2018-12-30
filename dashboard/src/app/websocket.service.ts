import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  // Our socket connection
  private socket;

  constructor() { }

  connect(): Rx.Subject<MessageEvent> {
    // If you aren't familiar with environment variables then
    // you can hard code `environment.ws_url` as `http://localhost:5000`

    const URL = 'https://carbonara-app.herokuapp.com';
    const PORT = '30932';

    this.socket = io(URL);

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    const observable = new Observable(o => {
      this.socket.on('message', (data) => {
        console.log('Received message from Websocket Server');
        o.next(data);
      });

    });

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    const observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Rx.Subject.create(observer, observable);
  }

}



// DC

// return () => {
//   this.socket.disconnect();
// };