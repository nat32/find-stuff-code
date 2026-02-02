import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/item';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-item',
  standalone: false,
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss',
})
export class EditItemComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;
  item!: Item;
  @Output() editedItem = new EventEmitter<Item>();
  @Input() itemToEdit!: Item;

  private eventsChangeSubscription: Subscription | undefined;

  @Input() events: Observable<Item> | undefined;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.myForm = this.fb.group({});
  }

  ngOnInit() {
    this.eventsChangeSubscription = this.events!.subscribe((item) => this.initForm(item));
    this.myForm = this.fb.group({
      name: [this.itemToEdit.name, [Validators.required, Validators.maxLength(30)]],
      location: [this.itemToEdit.location, [Validators.required, Validators.maxLength(30)]],
      section: [this.itemToEdit.section, [Validators.required, Validators.maxLength(30)]],
      container: [this.itemToEdit.container, [Validators.required, Validators.maxLength(30)]],
      description: [this.itemToEdit.description, [Validators.maxLength(150)]],
    });
  }

  initForm(item: Item) {
    this.itemToEdit = item;
    this.myForm = this.fb.group({
      name: [item.name, [Validators.required, Validators.maxLength(30)]],
      location: [item.location, [Validators.required, Validators.maxLength(30)]],
      section: [item.section, [Validators.required, Validators.maxLength(30)]],
      container: [item.container, [Validators.required, Validators.maxLength(30)]],
      description: [item.description, [Validators.maxLength(150)]],
    });
  }

  // Submit handler
  onSubmit(): void {
    if (this.myForm?.valid) {
      this.item = this.myForm.value;
      this.item.id = this.itemToEdit.id;
      this.editedItem.emit(this.item);
    } else {
      this.openSnackBar('The form is invalid', 'Close');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    this.eventsChangeSubscription?.unsubscribe();
  }
}
