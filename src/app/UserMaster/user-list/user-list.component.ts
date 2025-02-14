import { Component } from '@angular/core';
import { SortDescriptor } from '@progress/kendo-data-query';
import { ApiServiceService } from '../api-service.service';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { pencilIcon, SVGIcon, trashIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  title = 'User Data';

  public svgTransh: SVGIcon = trashIcon;
  public svgPencil: SVGIcon = pencilIcon;

  public gridItems: any[] = [];
  public pageSize: number = 10;
  public skip: number = 0;
  public sortDescriptor: SortDescriptor[] = [];
  public filterTerm: number | null = null;

  constructor(private apiService: ApiServiceService) { this.loadGridItems(); }

  public opened = false;
  public userIdToDelete: number | null = null;

  openDialog(userId: number): void {
    this.userIdToDelete = userId;
    this.opened = true;
  }

  closeDialog(): void {
    this.opened = false;
    this.userIdToDelete = null;
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadGridItems();
  }

  public handleSortChange(descriptor: SortDescriptor[]): void {
    this.sortDescriptor = descriptor;
    this.loadGridItems();
  }

  private loadGridItems(): void {
    this.apiService.getAllUser().subscribe((data: any[]) => {
      console.log(data);
      this.gridItems = data;
    });
  }

  deleteUser(): void {
    if (this.userIdToDelete !== null) {
      this.apiService.deleteUser(this.userIdToDelete).subscribe(() => {
        this.loadGridItems();
        this.closeDialog();
      });
    }
  }
}
