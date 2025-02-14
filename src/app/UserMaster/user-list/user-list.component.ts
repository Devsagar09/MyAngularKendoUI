import { Component } from '@angular/core';
import { SortDescriptor } from '@progress/kendo-data-query';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  title = 'User Data';

  public gridItems: any[] = [];
  public pageSize: number = 10;
  public skip: number = 0;
  public sortDescriptor: SortDescriptor[] = [];
  public filterTerm: number | null = null;

  constructor(private apiService: ApiServiceService) { this.loadGridItems(); }

  private loadGridItems(): void {
    this.apiService.getAllUser().subscribe((data: any[]) => {
      console.log(data);
      this.gridItems = data;
    });
  }

}
