import { Component, OnInit } from '@angular/core';
import {PageNotificationDto} from "../../dto/notification/page-notification-dto";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationDeleteDto} from "../../dto/notification/notification-delete-dto";
import {NotificationService} from "../../service/notification.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  pageNotifications!: PageNotificationDto;
  rfSearch!: FormGroup;
  deleteIds!: number[];
  deleteNotifications!: NotificationDeleteDto[];
  checkedAll!: boolean;
  orderNumber!: number;
  testDate = (new Date()).getTime();

  constructor(private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.createSearchForm();
    this.searchNotification(0);
    this.deleteIds = [];
    this.checkedAll = false;
  }

  /**
   * Create by: DatLA
   * Function: Search notification by role admin
   * @Param pageNumber
   * Date: 02/02/2023
   */
  searchNotification(pageNumber: number): void {
    this.notificationService.getPageNotifications(this.rfSearch.value, pageNumber,5).subscribe(next => {
      this.pageNotifications = next;
    }, error => {
    });
  }

  /**
   * Create by: DatLA
   * Function: calculate the time to assign to the interval find function
   * @Param timeInfo
   * Date: 02/02/2023
   */
  getSearchDate(timeInfo: string): string {
    let today = new Date();
    switch (timeInfo) {
      case 'withinWeek':
        return (new Date(today.getTime() - 1000 * 60 * 60 * 24 * 7)).toJSON().substring(0, 10);
      case 'withinMonth':
        return (new Date(today.getTime() - 1000 * 60 * 60 * 24 * 30)).toJSON().substring(0, 10);
      case 'withinThreeMonth':
        return (new Date(today.getTime() - 1000 * 60 * 60 * 24 * 90)).toJSON().substring(0, 10);
      case 'withinYear':
        return (new Date(today.getTime() - 1000 * 60 * 60 * 24 * 365)).toJSON().substring(0, 10);
      default:
        return '';
    }
  }

  /**
   * Create by: DatLA
   * Function: Create search form
   * Date: 02/02/2023
   */
  createSearchForm(): void {
    this.rfSearch = this.formBuilder.group({
      title: ['', [
        Validators.maxLength(70)
      ]],
      content: ['', [
        Validators.maxLength(100)
      ]],
      startDate: ['', this.constrainNotAfterToday]
    });
  }

  /**
   * Create by: DatLA
   * Function: Constrain not after today to validate the search date input
   * @Param abstractControl
   * Date: 02/02/2023
   */
  constrainNotAfterToday(abstractControl: AbstractControl): any {
    if (abstractControl.value == '') {
      return null;
    }
    let today = new Date().getTime();
    let inputSearchDate = new Date(abstractControl.value).getTime();
    return (today - inputSearchDate >= 0) ? null : {invalidSearchDate: true};
  }

  /**
   * Create by: DatLA
   * Function: Refresh form and data in search engine
   * Date: 02/02/2023
   */
  resetFormAndData(): void {
    this.ngOnInit();
  }

  /**
   * Create by: DatLA
   * Function: Go to different pages
   * @Param pageNumber
   * Date: 02/02/2023
   */
  gotoPage(pageNumber: number): void {
    this.searchNotification(pageNumber);
  }

  /**
   * Create by: DatLA
   * Function: add the id you want to delete into the deleteIds array
   * @Param id
   * Date: 02/02/2023
   */
  addToDelete(id: number): void {
    const index = this.deleteIds.indexOf(id);
    index > -1 ? this.deleteIds.splice(index, 1) : this.deleteIds.push(id);
  }

  /**
   * Create by: DatLA
   * Function: add all ids in a page to deleteIds array
   * Date: 02/02/2023
   */
  addAllToDelete(): void {
    this.checkedAll = true;
    for (let value of this.pageNotifications.content) {
      if (value.idNotification != undefined && !this.deleteIds.includes(value.idNotification)) {
        this.checkedAll = false;
        break;
      }
    }
    if (this.checkedAll) {
      for (let value of this.pageNotifications.content) {
        if (value.idNotification != undefined) {
          const index = this.deleteIds.indexOf(value.idNotification, 0);
          this.deleteIds.splice(index, 1);
        }
      }
    } else {
      for (let value of this.pageNotifications.content) {
        if (value.idNotification != undefined) {
          const index = this.deleteIds.indexOf(value.idNotification, 0);
          if (index == -1) {
            this.deleteIds.push(value.idNotification);
          }
        }
      }
    }
  }

  /**
   * Create by: DatLA
   * Function: get backend objects by id list, send to modal delete
   * Date: 02/02/2023
   */
  sendToDeleteGroupModal(): void {
    this.deleteNotifications = [];
    this.notificationService.findByListId(this.deleteIds).subscribe(data => {
      this.deleteNotifications = data;
    }, error => {
    });
  }

  /**
   * Create by: DatLA
   * Function: delete objects
   * Date: 02/02/2023
   */
  delete(): void {
    this.notificationService.delete(this.deleteIds).subscribe(next => {
      this.toastrService.success('Xóa thành công.', 'Thông báo', {
        timeOut: 2000,
        progressBar: true,
        positionClass: 'toast-top-right',
        easing: 'ease-in'
      });
    }, error => {
      this.toastrService.error('Đã xảy ra lỗi khi xóa.', 'Lỗi', {
        timeOut: 2000,
        progressBar: true,
        positionClass: 'toast-top-right',
        easing: 'ease-in'
      });
    }, () => {
      this.ngOnInit();
    });
  }

  /**
   * Create by: DatLA
   * Function: expand or collapse notification content
   * @Param id,action
   * Date: 02/02/2023
   */
  expandOrCollapse(id: number, action: string) {
    if (action === 'expand') {
      // @ts-ignore
      document.getElementById('expandedContent' + id).style.display = 'inline-block';
      // @ts-ignore
      document.getElementById('collapsedContent' + id).style.display = 'none';
    } else {
      // @ts-ignore
      document.getElementById('expandedContent' + id).style.display = 'none';
      // @ts-ignore
      document.getElementById('collapsedContent' + id).style.display = 'inline-block';
    }
  }
}
