import {Injectable} from '@angular/core';
import {IFood, IMenu} from '../dtos';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menu: IMenu = {
    pizza: [],
    drinks: []
  };
  public sendCart: IFood[] = [];

  constructor() {
  }

  public setMenu(menu: IMenu) {
    this.menu = menu;
  }

  public getMenu() {
    return this.menu;
  }

  public addToCart(food) {
    this.sendCart.push(food);
    console.log(food);
  }

  public getCart() {
    return this.sendCart;
  }
}
