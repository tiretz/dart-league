import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Observable } from 'rxjs';

import { DeleteDialogComponent, DeleteDialogData } from '../../../../shared/components/delete-dialog/delete-dialog.component';
import { OverlayComponent } from '../../../../shared/components/overlay/overlay.component';

import { CreateItemDialogComponent } from './components/create-item-dialog/create-item-dialog.component';
import { EditItemDialogComponent } from './components/edit-item-dialog/edit-item-dialog.component';

import { IListItem } from './models/list-item';

@Component({
  selector: 'app-list-setting',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatDividerModule, DragDropModule, MatMenuModule, OverlayComponent],
  templateUrl: './list-setting.component.html',
  styleUrl: './list-setting.component.scss',
})
export class ListSettingComponent {
  @Output()
  createItem: EventEmitter<string> = new EventEmitter<string>();

  protected dataSource = new MatTableDataSource<IListItem>();

  @Output()
  deleteItem: EventEmitter<IListItem> = new EventEmitter<IListItem>();

  protected displayedColumns = ['drag', 'value', 'actions'];

  @Output()
  editItem: EventEmitter<IListItem> = new EventEmitter<IListItem>();

  @Input({ required: true })
  icon?: string;

  @Input({ required: true })
  isLoading$?: Observable<boolean>;

  @Input({ required: true })
  itemPluralName?: string;

  @Input({ required: true })
  itemSingularName?: string;

  @Output()
  reorderItems: EventEmitter<IListItem[]> = new EventEmitter<IListItem[]>();

  @ViewChild(MatTable, { static: true })
  table?: MatTable<IListItem>;

  @Input({ required: true })
  set values(items: IListItem[] | undefined) {
    this.dataSource.data = items || [];
  }

  constructor(private readonly dialogService: MatDialog) {}

  openCreateItemDialog(): void {
    const createItemDialogRef = this.dialogService.open(CreateItemDialogComponent, { data: this.itemSingularName });

    createItemDialogRef.afterClosed().subscribe((newItem: string | undefined) => {
      if (!newItem) {
        return;
      }

      this.createItem.emit(newItem);
    });
  }

  openDeleteItemDialog(itemToDelete: IListItem): void {
    const dialogData: DeleteDialogData = { text: `${this.itemSingularName} '${itemToDelete.name}' wirklich löschen?`, title: `${this.itemSingularName} löschen` };

    const deleteDialogRef = this.dialogService.open(DeleteDialogComponent, { data: dialogData });

    deleteDialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (!result) {
        return;
      }

      this.deleteItem.emit(itemToDelete);
    });
  }

  openEditItemDialog(itemToEdit: IListItem): void {
    const editPlayerDialogRef = this.dialogService.open(EditItemDialogComponent, { data: { itemName: this.itemSingularName, itemToEdit } });

    editPlayerDialogRef.afterClosed().subscribe((editedItem: IListItem | undefined) => {
      if (!editedItem) {
        return;
      }

      this.editItem.emit(editedItem);
    });
  }

  drop(event: CdkDragDrop<string>) {
    const previousIndex = this.dataSource.data.findIndex((d) => d === event.item.data);

    moveItemInArray(this.dataSource.data, previousIndex, event.currentIndex);

    this.table?.renderRows();

    this.reorderItems.emit(this.dataSource.data);
  }
}
