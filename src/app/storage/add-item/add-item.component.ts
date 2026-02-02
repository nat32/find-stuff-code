import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/item';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-item',
  standalone: false,
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
})
export class AddItemComponent implements OnInit {
  myForm!: FormGroup;
  item!: Item;
  @Output() newItemEvent = new EventEmitter<Item>();

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.myForm = this.fb.group({});
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      location: ['', [Validators.required, Validators.maxLength(30)]],
      section: ['', [Validators.required, Validators.maxLength(30)]],
      container: ['', [Validators.required, Validators.maxLength(30)]],
      description: ['', [Validators.maxLength(150)]],
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  // Submit handler
  onSubmit(): void {
    if (this.myForm?.valid) {
      this.newItemEvent.emit(this.myForm.value);
    } else {
      this.openSnackBar('The form is invalid', 'Close');
    }
  }
}
