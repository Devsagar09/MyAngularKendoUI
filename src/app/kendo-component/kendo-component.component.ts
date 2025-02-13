import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { Category, categories } from '../category';
import { cartIcon, SVGIcon, codeIcon, alignCenterIcon, alignRightIcon, alignLeftIcon, alignJustifyIcon } from '@progress/kendo-svg-icons';
import { NotificationService } from '@progress/kendo-angular-notification';
import { FileRestrictions } from '@progress/kendo-angular-upload';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-kendo-component',
  standalone: false,
  templateUrl: './kendo-component.component.html',
  styleUrl: './kendo-component.component.css',
  providers: [ProductService]
})
export class KendoComponentComponent {
  title = 'Dev Sagar';

  public svgCart: SVGIcon = cartIcon;
  public svgCode: SVGIcon = codeIcon;
  public svgRight: SVGIcon = alignRightIcon;
  public svgCenter: SVGIcon = alignCenterIcon;
  public svgLeft: SVGIcon = alignLeftIcon;
  public svgJustify: SVGIcon = alignJustifyIcon;

  public date:Date = new Date();

  public gridItems: Observable<GridDataResult> | undefined;
  public pageSize: number = 10;
  public skip: number = 0;
  public sortDescriptor: SortDescriptor[] = [];
  public filterTerm: number | null = null;

  public dropDownItems: Category[] = categories;
  public defaultItem: Category = { text: "Filter by Category", value: null };

  constructor(private service: ProductService, private Notificationservice: NotificationService) {
    setInterval(() => {
      this.date = new Date();
    }, 1000);

    this.loadGridItems();
    
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
    this.gridItems = this.service.getProducts(
      this.skip,
      this.pageSize,
      this.sortDescriptor,
      this.filterTerm
    );
  }

  public handleFilterChange(item: Category): void {
    this.filterTerm = item.value;
    this.skip = 0;
    this.loadGridItems();
  }

  public onSelectedChange(e: boolean): void {
    console.log(e);
  }

  //Notification
  public showNotification(): void {
    this.Notificationservice.show({
      content: 'Hello, World!', 
      hideAfter: 1000,
      animation: { type: 'fade', duration: 500 },
      position: { horizontal: 'right', vertical: 'top' },
      type: { style: 'success', icon: true },
      height: 100,
      width: 300 ,
      cssClass: ['.notification-font']
    });
  }

  //Dialog
  public opened = false;

  public close(): void {
    this.opened = false;
  }
  public open(): void {
    this.opened = true;
  }

  //Gauges
  public gaugeValue = 90; 

  //Upload file restriction 
  public RestrictionFile :FileRestrictions = {
    allowedExtensions: ['.jpg', '.png'],
    minFileSize: 0,
    maxFileSize: 1000000 
  }

  //called the component from the child component
  public message: string = '';

  public receiveMessage(message: string): void {
    this.message = message;
  }

  //called the component to the child component
  public ParentMessage: string = "Hello This Message is from Parent Component";

}
