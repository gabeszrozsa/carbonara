import { Component, OnInit } from '@angular/core';
import { ChatService } from './service/chat.service';
import {OrderComponent} from './component/order/order.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  MSG = 'Test Message';
  orders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      console.log('message from app component');
      console.log(msg);
    });
  }

  sendMessage() {
    this.chat.sendMsg(this.MSG);
  }

}
