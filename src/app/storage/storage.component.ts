import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Item } from '../models/item';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemService } from '../services/item.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-storage',
  standalone: false,
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.scss',
})
export class StorageComponent implements OnInit {
  itemsEmpty: boolean = true;
  items: Item[] = [];

  // Add Edit Stuff
  isAddFormVisible: boolean = false;
  addButtonText: string = 'Add New Item';
  isEditFormVisible: boolean = false;
  editButtonText: string = 'Close the Edit Form';
  currentItem!: Item;

  eventsChangeSubject: Subject<Item> = new Subject<Item>();

  displayedColumns: string[] = [
    'id',
    'name',
    'location',
    'section',
    'container',
    'description',
    'actions',
  ];
  dataSource = new MatTableDataSource(this.items);

  // STATISTIC DATA

  total!: number;
  totalDR!: number;
  totalGarage!: number;
  totalBasement!: number;
  isUpdated: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private snackBar: MatSnackBar,
    private itemService: ItemService,
  ) {
    this.initItems();
  }

  ngOnInit(): void {
    this.initItems();
  }

  initItems(): void {
    if (!this.itemService.serviceItems) {
      this.itemService.getItems().subscribe((serviceItems: Item[]) => {
        this.items = serviceItems;
        if (this.items.length > 0) {
          this.itemsEmpty = false;
        }
        this.dataSource = new MatTableDataSource(this.items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    } else {
      this.itemsEmpty = false;
      this.dataSource = new MatTableDataSource(this.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.calculateStatistics();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteItem(id: number) {
    this.items = this.itemService.deleteItem(id);
    this.updateData();
    this.openSnackBar('You successfully deleted an item', 'Close');
  }

  updateData() {
    this.dataSource = new MatTableDataSource(this.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isUpdated = true;
    this.calculateStatistics();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  calculateStatistics() {
    this.total = this.items.length;
    this.totalDR = this.items.filter((item) => item.location === 'Dressing-room').length;
    this.totalGarage = this.items.filter((item) => item.location === 'Garage').length;
    this.totalBasement = this.items.filter((item) => item.location === 'Basement').length;
  }

  showAddForm() {
    this.isAddFormVisible = this.isAddFormVisible ? false : true;
    this.addButtonText = this.isAddFormVisible ? 'Close the Add Form' : 'Add New Item';
  }

  addItem(newItem: Item) {
    this.items = this.itemService.addItem(newItem);
    this.updateData();
    this.isAddFormVisible = false;
    this.openSnackBar('You successfully added an item', 'Close');
    this.addButtonText = 'Add New Item';
  }

  clickToEditItem(item: Item) {
    this.currentItem = item;
    this.eventsChangeSubject.next(this.currentItem);
    this.isEditFormVisible = true;

    setTimeout(() => {
      const targetElement = document.getElementById('edit-form');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500);
  }

  editItem(editedItem: Item) {
    this.items = this.itemService.editItem(editedItem);
    this.updateData();
    this.isEditFormVisible = false;
    this.openSnackBar('You successfully eddited an item', 'Close');
  }

  closeEditItemForm() {
    this.isEditFormVisible = false;
  }
}
