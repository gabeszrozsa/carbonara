import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket;
  public observer;
  private observable;

  private APP = 'APP';
  private TYPE = 'DASHBOARD';
  private URL = 'https://carbonara-app.herokuapp.com';
  private ID: String;

  private orders = [
      {
        id: '1',
        cart: [1, 2, 3 , 4]
      },
      {
        id: '2',
        cart: [1, 2, 3 , 4]
      },
      {
        id: '3',
        cart: [1, 2, 3 , 4]
      },
      {
        id: '4',
        cart: [1, 2, 3 , 4]
      },
      {
        id: '5',
        cart: [1, 2, 3 , 4]
      }
  ];

  constructor() {}

  connect(): Rx.Subject<MessageEvent> {

    this.socket = io(this.URL);
    this.observer = {
      next: (data) => {
        this.socket.emit(data.name, data);
      },
    };

    this.observable = new Observable(o => {
      this.socket.on('APP', msg => this.app(msg));
      this.socket.on('INIT', msg => this.init(msg));
      this.socket.on('NEW_ORDER', msg => this.newOrder(msg));
    });

    return Rx.Subject.create(this.observer, this.observable);
  }

  getOrders() { return this.orders; }

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

  init (data) {
    console.log(data);
  }

  newOrder(data) {
    this.orders.push(data);
    console.log('NEW_ORDER');
    console.log(data);
    return 'abc';
  }
}

// return () => {
//   this.socket.disconnect();
// };
