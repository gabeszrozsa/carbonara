import {Component, OnInit} from '@angular/core';
import {ChatService} from '../service/chat.service';
import {MenuService} from '../service/menu.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private chat: ChatService, private menuService: MenuService) {
  }

  ngOnInit() {
  }

  sendMessage() {
    this.chat.sendMsg(
      {
        cart: this.menuService.getCart(),
        name: 'NEW_ORDER'
      });
  }
}
