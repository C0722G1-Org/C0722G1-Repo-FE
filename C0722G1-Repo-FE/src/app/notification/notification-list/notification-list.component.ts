import {NotificationService} from '../../service/notification.service';
import {PageNotificationDto} from '../../dto/notification/page-notification-dto';
import {NotificationDeleteDto} from '../../dto/notification/notification-delete-dto';
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

// @ts-ignore
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})

/**
 * Create by: DatLA
 * Screen: Notification-manager
 * Role: Admin
 * Date: 02/02/2023
 */
export class NotificationListComponent implements OnInit {
  pageNotifications!: PageNotificationDto;
  rfSearch!: FormGroup;
  deleteIds!: number[];
  deleteNotifications: NotificationDeleteDto[] = [];
  checkedAll!: boolean;
  orderNumber!: number;
  flagNotToastReset!: boolean;
  recordPerPage!: number;

  constructor(private notificationService: NotificationService,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private titleService: Title) {
    this.titleService.setTitle('Danh sách thông báo');
  }

  ngOnInit(): void {
    this.createSearchForm();
    this.searchNotification(0, false);
    this.deleteIds = [];
    this.checkedAll = false;
  }

  searchNotification(pageNumber: number, flagSearchToast: boolean): void {
    let notificationToSearch = this.rfSearch.value;
    notificationToSearch.startDate = this.rfSearch.value.startDate.trim();
    notificationToSearch.title = this.rfSearch.value.title.trim();
    notificationToSearch.content = this.rfSearch.value.content.trim();
    this.notificationService.getPageNotifications(notificationToSearch, pageNumber, this.recordPerPage).subscribe(data => {
      if (data == null) {
        this.pageNotifications = data;
        this.toastrService.warning('Không tìm thấy kết quả phù hợp.', '', {
          timeOut: 2000,
          progressBar: true,
          positionClass: 'toast-top-right',
          easing: 'ease-in'
        });
        return;
      }
      if (notificationToSearch.title == '%' || notificationToSearch.title == '/' ||
        notificationToSearch.content == '%' || notificationToSearch.content == '/') {
        this.toastrService.error('Không được nhập duy nhất ký tự "%" hoặc "/" trong ô tìm kiếm.', 'Lỗi tìm kiếm', {
          timeOut: 5000,
          progressBar: true,
          positionClass: 'toast-top-right',
          easing: 'ease-in'
        });
        this.pageNotifications.content = [];
        return;
      }
      if (this.flagNotToastReset == false && flagSearchToast == true && data !== null && notificationToSearch.title !== '%' && notificationToSearch.title !== '/' &&
        notificationToSearch.content !== '%' && notificationToSearch.content !== '/') {
        this.pageNotifications = data;
        this.toastrService.success('Tìm kiếm thành công.', 'Thông báo', {
          timeOut: 2000,
          progressBar: true,
          positionClass: 'toast-top-right',
          easing: 'ease-in'
        });
      }

      if (this.flagNotToastReset == true && flagSearchToast == true && data !== null && notificationToSearch.title !== '%' && notificationToSearch.title !== '/' &&
        notificationToSearch.content !== '%' && notificationToSearch.content !== '/') {
        this.pageNotifications = data;
        this.toastrService.success('Làm mới thành công.', 'Thông báo', {
          timeOut: 2000,
          progressBar: true,
          positionClass: 'toast-top-right',
          easing: 'ease-in'
        });
      }
      this.pageNotifications = data;
    }, error => {
      this.toastrService.error('Đã xảy ra lỗi khi tìm kiếm.', 'Lỗi', {
        timeOut: 2000,
        progressBar: true,
        positionClass: 'toast-top-right',
        easing: 'ease-in'
      });
    }, () => {
    });
  }

  setflagNotToastResetFalse() {
    this.flagNotToastReset = false;
  }


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

  createSearchForm(): void {
    this.rfSearch = this.formBuilder.group({
      title: ['', [
        Validators.maxLength(45)
      ]],
      content: ['', [
        Validators.maxLength(100)
      ]],
      startDate: ['', this.constrainNotAfterToday]
    });
  }

  constrainNotAfterToday(abstractControl: AbstractControl): any {
    if (abstractControl.value == '') {
      return null;
    }
    let today = new Date().getTime();
    let inputSearchDate = new Date(abstractControl.value).getTime();
    return (today - inputSearchDate >= 0) ? null : {invalidSearchDate: true};
  }

  resetFormAndData(): void {
    this.flagNotToastReset = true;
    this.createSearchForm();
    this.searchNotification(0, false);
    this.deleteIds = [];
    this.checkedAll = false;
  }

  gotoPage(pageNumber: number): void {
    this.searchNotification(pageNumber, false);
  }

  addToDelete(id: number): void {
    const index = this.deleteIds.indexOf(id);
    index > -1 ? this.deleteIds.splice(index, 1) : this.deleteIds.push(id);
  }

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

  sendToDeleteGroupModal(): void {
    this.deleteNotifications = [];
    this.notificationService.findByListId(this.deleteIds).subscribe(data => {
      this.deleteNotifications = data;
    }, error => {
      this.toastrService.error('Đã xảy ra lỗi.', 'Lỗi', {
        timeOut: 2000,
        progressBar: true,
        positionClass: 'toast-top-right',
        easing: 'ease-in'
      });
    });
  }

  delete(): void {
    this.notificationService.delete(this.deleteIds).subscribe(next => {
      this.toastrService.info('Xóa thành công.', 'Thông báo', {
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
  };

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
