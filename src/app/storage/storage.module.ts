import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { StorageRoutingModule } from './storage-routing.module';
import { StorageComponent } from './storage.component';
import { AddItemComponent } from './add-item/add-item.component';

import { EditItemComponent } from './edit-item/edit-item.component';

@NgModule({
  declarations: [StorageComponent, AddItemComponent, EditItemComponent],
  imports: [
    CommonModule,
    StorageRoutingModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class StorageModule {}
