import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ChatService} from './service/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mobile';
  MSG = 'Test Message';
  orders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    public router: Router,
    private chat: ChatService
  ) {
  }

  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      console.log('message from app component');
      console.log(msg);
    });
  }


  isActive(route: string): string {
    return this.router.url.includes(route) &&
    (route.length === this.router.url.length || this.router.url[route.length] === '/')
      ? 'active'
      : '';
  }
}
