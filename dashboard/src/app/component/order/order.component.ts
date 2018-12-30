import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../service/chat.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  constructor(private chat: ChatService) { }

  sendMessage() {
    this.chat.sendMsg({
      name: 'FINISH_ORDER',
      cart: [4, 3, 2, 1]
    });
  }

  getOrders() {
    return this.chat.getOrders();
  }

}
