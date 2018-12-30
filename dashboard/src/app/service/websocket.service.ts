import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket;
  private observer;
  private observable;

  private APP = 'APP';
  private TYPE = 'DASHBOARD';
  private URL = 'https://carbonara-app.herokuapp.com';
  // private PORT = '30932';
  private ID: String;

  constructor() {}

  connect(): Rx.Subject<MessageEvent> {

    this.socket = io(this.URL);
    this.observer = {
      next: (data) => {
        this.socket.emit(data.name, data);
      },
    };

    this.observable = new Observable(o => {
      this.socket.on('message', (data) => {
        console.log('Received message from Websocket Server');
        o.next(data);
      });


      this.socket.on('APP', msg => this.app(msg));
      this.socket.on('INIT', msg => this.init(msg));

    });

    return Rx.Subject.create(this.observer, this.observable);
  }


  app(data) {
    console.log('ACK');

    this.ID = data.id;

    const resp = {
      name: this.APP,
      id: this.ID,
      type: this.TYPE
    };
    this.observer.next(resp);

    console.log(resp);
    console.log('ME');
  }

  init(data) {
      console.log('INIT');
      console.log(data);
  }


}



// return () => {
//   this.socket.disconnect();
// };
