import { Injectable } from '@angular/core';
import { ITEMS } from '../mock-items';
import { Item } from '../models/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items: Item[] = ITEMS;
  serviceItems: Item[] | undefined;

  constructor() {}

  getItems(): Observable<Item[]> {
    return new Observable((observer) => {
      if (this.serviceItems) {
        observer.next(this.serviceItems);
      } else {
        this.serviceItems = this.items;
        observer.next(this.serviceItems);
      }
    });
  }

  addItem(newItem: Item): Item[] {
    if (this.serviceItems) {
      newItem.id = this.findMaxId() + 1;
      this.serviceItems.push(newItem);
      return this.serviceItems;
    } else {
      return [];
    }
  }

  findMaxId(): number {
    let maxId = 0;
    this.serviceItems!.forEach((item) => {
      if (item.id > maxId) {
        maxId = item.id;
      }
    });
    return maxId;
  }

  deleteItem(id: number): Item[] {
    if (this.serviceItems) {
      const indexOfItemToBeDeleted = this.serviceItems.findIndex((item) => item.id == id);
      this.serviceItems.splice(indexOfItemToBeDeleted, 1);
      return this.serviceItems;
    } else {
      return [];
    }
  }

  editItem(editedItem: Item): Item[] {
    if (this.serviceItems) {
      const index = this.serviceItems.findIndex((item) => item.id === editedItem.id);
      if (index !== -1) {
        this.serviceItems[index] = editedItem;
      }
      return this.serviceItems;
    } else {
      return [];
    }
  }
}
