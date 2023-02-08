import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PageNotificationDto} from '../../dto/notification/page-notification-dto';
import {NotificationService} from '../../service/notification.service';
import {ToastrService} from 'ngx-toastr';
import {NotificationDeleteDto} from '../../dto/notification/notification-delete-dto';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-notification-home',
  templateUrl: './notification-home.component.html',
  styleUrls: ['./notification-home.component.css']
})
export class NotificationHomeComponent implements OnInit {
  pageNotifications!: PageNotificationDto;
  rfSearch!: FormGroup;
  deleteIds!: number[];
  deleteNotifications: NotificationDeleteDto[] = [];
  checkedAll!: boolean;
  orderNumber!: number;
​

  constructor(private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private titleService: Title) {
    this.titleService.setTitle('DANH SÁCH THÔNG BÁO');
  }
  ngOnInit(): void {
    this.createSearchForm();
    this.searchNotification(0);
    this.deleteIds = [];
    this.checkedAll = false;
  }
  searchNotification(pageNumber: number): void {
    this.notificationService.getPageNotifications(this.rfSearch.value, pageNumber).subscribe(next => {
      this.pageNotifications = next;
    }, error => {
    });
  }
  getSearchDate(timeInfo: string): string {
    const today = new Date();
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
  createSearchForm(): void {
    this.rfSearch = this.formBuilder.group({
      title: ['', [
        Validators.maxLength(45)
      ]], content: ['', [
        Validators.maxLength(100)
      ]],
      startDate: ['', this.constrainNotAfterToday]
    });
  }​

  constrainNotAfterToday(abstractControl: AbstractControl): any {
    // tslint:disable-next-line:triple-equals
    if (abstractControl.value == '') {
      return null;
    }
    const today = new Date().getTime();
    const inputSearchDate = new Date(abstractControl.value).getTime();
    return (today - inputSearchDate >= 0) ? null : {invalidSearchDate: true};
  }

​

  resetFormAndData(): void {
    this.ngOnInit();
  }

​

  gotoPage(pageNumber: number): void {
    this.searchNotification(pageNumber);
  }

​

  addToDelete(id: number): void {
    const index = this.deleteIds.indexOf(id);
    index > -1 ? this.deleteIds.splice(index, 1) : this.deleteIds.push(id);
  }

​

  addAllToDelete(): void {
    this.checkedAll = true;
    for (const value of this.pageNotifications.content) {
      // tslint:disable-next-line:triple-equals
      if (value.idNotification != undefined && !this.deleteIds.includes(value.idNotification)) {
        this.checkedAll = false;
        break;
      }
    }
    if (this.checkedAll) {
      for (const value of this.pageNotifications.content) {
        // tslint:disable-next-line:triple-equals
        if (value.idNotification != undefined) {
          const index = this.deleteIds.indexOf(value.idNotification, 0);
          this.deleteIds.splice(index, 1);
        }
      }
    } else {for (const value of this.pageNotifications.content) {
        // tslint:disable-next-line:triple-equals
        if (value.idNotification != undefined) {
          const index = this.deleteIds.indexOf(value.idNotification, 0);
          // tslint:disable-next-line:triple-equals
          if (index == -1) {
            this.deleteIds.push(value.idNotification);
          }
        }
      }
    }
  }

​

  sendToDeleteGroupModal(): void {
    this.deleteNotifications = [];
    this.notificationService.findByListId(this.deleteIds).subscribe(data => {
      this.deleteNotifications = data;
    }, error => {
    });
  }

  delete(): void {
    this.notificationService.delete(this.deleteIds).subscribe(next => {
      this.toastrService.success('Xóa thành công', 'Thông báo', {
        timeOut: 2000,
        progressBar: true,
        positionClass: 'toast-top-right',
        easing: 'ease-in'
      });
    }, error => {
      this.toastrService.error('Đã xảy ra lỗi khi xóa', 'Lỗi', {
        timeOut: 2000,
        progressBar: true,
        positionClass: 'toast-top-right',
        easing: 'ease-in'
      });
    }, () => {
      this.ngOnInit();
    });
  }

  // tslint:disable-next-line:typedef
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
