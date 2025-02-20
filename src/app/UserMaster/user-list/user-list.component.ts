import { Component } from '@angular/core';
import { SortDescriptor } from '@progress/kendo-data-query';
import { ApiServiceService } from '../api-service.service';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { pencilIcon, plusIcon, SVGIcon, trashIcon } from '@progress/kendo-svg-icons';
import { Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';

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
  public svgPlus: SVGIcon = plusIcon;

  public gridItems: any[] = [];
  public pageSize: number = 10;
  public skip: number = 0;
  public sortDescriptor: SortDescriptor[] = [];
  public filterTerm: number | null = null;

  /**
   * Constructs an instance of UserListComponent.
   * 
   * @param apiService - The service used to interact with the API.
   * @param route - The Angular Router service for navigation.
   * @param Notificationservice - The service used to display notifications.
   */
  constructor(private apiService: ApiServiceService, private route: Router, private Notificationservice: NotificationService) { this.loadGridItems(); }

  /**
   * A boolean flag indicating whether the user list component is opened or not.
   * When set to `true`, the component is displayed; otherwise, it is hidden.
   */
  public opened = false;
  public userIdToDelete: number | null = null;

  userIdToUpdate: number | null = null;
  updatedUserData: any = {};

  public editDialogopen = false;

  user = {
    useid: this.userIdToUpdate,
    username: '',
    email: '',
    password: '',
    address: ''
  };

  openDialog(userId: number): void {
    this.userIdToDelete = userId;
    this.opened = true;
  }

  closeDialog(): void {
    this.opened = false;
    this.userIdToDelete = null;
  }

  openEditDialog(userId: number): void {
    this.userIdToUpdate = userId;
    this.getUserId(userId);
    this.apiService.getUserById(userId).subscribe((data: any) => {
      console.log(data);
      this.updatedUserData = { ...data };

      this.user = {
        useid: userId,
        username: data.username,
        email: data.email,
        password: data.password,
        address: data.address
      };
      this.editDialogopen = true;
    });
  }

  getUserId(userId: number): void {
    this.apiService.getUserById(userId).subscribe((data: any) => {
      console.log(data);
      this.userIdToUpdate = userId;
      this.updatedUserData = { ...data }
    });
  }

  closeEditDialog(): void {
    this.editDialogopen = false;
    this.userIdToUpdate = null;
    this.updatedUserData = {};
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

  UpdateUser(): void {
    if (this.userIdToUpdate !== null && this.updatedUserData) {
      this.updatedUserData.userid = this.userIdToUpdate;
      const updatedUser = {
        userid: this.userIdToUpdate,
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        address: this.user.address
      };

      this.apiService.updateUser(this.userIdToUpdate, updatedUser).subscribe(() => {
        this.loadGridItems();
        this.closeEditDialog();
        this.showNotification('Updated user Successfully','success');
      });
    }
  }

  deleteUser(): void {
    if (this.userIdToDelete !== null) {
      this.apiService.deleteUser(this.userIdToDelete).subscribe(() => {
        this.loadGridItems();
        this.closeDialog();
        this.showNotification('User Delete','error');
      });
    }
  }

  navigateToRegisterUser(): void {
    console.log("Register User");
    this.route.navigate(['/registeruser']);
  }

  //Notitfication
  public showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning'): void {
    this.Notificationservice.show({
      content: message,
      hideAfter: 2000,
      animation: { type: 'fade', duration: 500 },
      position: { horizontal: 'center', vertical: 'top' },
      type: { style: type, icon: true },
      height: 60,
      width: 300,
      cssClass: 'custom-notification'
    });
  }
}
