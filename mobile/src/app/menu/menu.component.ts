import {Component, OnInit} from '@angular/core';
import {IFood, IMenu} from '../dtos';
import {MenuService} from '../service/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu: IMenu;

  constructor(public menuService: MenuService) {
  }

  ngOnInit() {
    this.menu = this.menuService.getMenu();
  }

  addToCart(food) {
    this.menuService.addToCart(food);
  }

}
