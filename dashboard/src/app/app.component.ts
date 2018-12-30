import { Component, OnInit } from '@angular/core';
import { ChatService } from './service/chat.service';
import {OrderComponent} from './component/order/order.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      console.log('message from app component');
      console.log(msg);
    });
  }

  getOrders() {
    return this.chat.getOrders();
  }
}
