import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, ViewChild } from '@angular/core';

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
  protected dataSource = new MatTableDataSource<IListItem>();
  protected displayedColumns = ['drag', 'value', 'actions'];

  @Input({ required: true })
  icon?: string;

  @Input({ required: true })
  isLoading$?: Observable<boolean>;

  @Input({ required: true })
  itemPluralName?: string;

  @Input({ required: true })
  itemSingularName?: string;

  @ViewChild(MatTable, { static: true })
  table?: MatTable<IListItem>;

  @Input({ required: true })
  set values(items: IListItem[] | undefined) {
    this.dataSource.data = items || [];
  }

  constructor(private readonly dialogService: MatDialog) {}

  openAddNewItemDialog(): void {
    const createItemDialogRef = this.dialogService.open(CreateItemDialogComponent, { data: this.itemSingularName });

    createItemDialogRef.afterClosed().subscribe((newItem: string | undefined) => {
      if (newItem) {
        console.error(`Item '${newItem}' erstellt.`);
        return;
      }

      console.error('Erstellen eines neuen Items abgebrochen.');
    });
  }

  openDeleteItemDialog(itemToDelete: IListItem): void {
    const dialogData: DeleteDialogData = { text: `${this.itemSingularName} '${itemToDelete.name}' wirklich löschen?`, title: `${this.itemSingularName} löschen` };

    const deleteDialogRef = this.dialogService.open(DeleteDialogComponent, { data: dialogData });

    deleteDialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        console.error(`${this.itemSingularName} '${itemToDelete.name}' gelöscht.`);
        return;
      }

      console.error(`Löschen von ${this.itemSingularName} '${itemToDelete.name}' abgebrochen.`);
    });
  }

  openEditItemDialog(itemToEdit: IListItem): void {
    const editPlayerDialogRef = this.dialogService.open(EditItemDialogComponent, { data: { itemName: this.itemSingularName, itemToEdit } });

    editPlayerDialogRef.afterClosed().subscribe((editedItem: IListItem | undefined) => {
      if (editedItem) {
        console.error(`Item '${editedItem.name}' beabeitet.`);
        return;
      }

      console.error(`Bearbeiten des Items '${itemToEdit.name}' abgebrochen.`);
    });
  }

  drop(event: CdkDragDrop<string>) {
    const previousIndex = this.dataSource.data.findIndex((d) => d === event.item.data);

    moveItemInArray(this.dataSource.data, previousIndex, event.currentIndex);

    this.table?.renderRows();
  }
}
