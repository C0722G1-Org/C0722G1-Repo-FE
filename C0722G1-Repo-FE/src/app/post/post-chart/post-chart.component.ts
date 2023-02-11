import {Component, OnInit, ViewChild} from '@angular/core';
import {PortChart} from '../../entity/post/port-chart';
import {PostService} from '../post.service';
// @ts-ignore
import {Chart} from 'chart.js';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-post-chart',
  templateUrl: './post-chart.component.html',
  styleUrls: ['./post-chart.component.css']
})
export class PostChartComponent implements OnInit {
  monthList: number[] = [];
  yearList: number[] = [];
  yearStart = 2022;
  postCharList: PortChart[] = [];
  countSuccess = 0;
  countTotal = 0;
  totalTransaction = 0;
  currentYear: number;
  currentMonth: number;
  yearCount = "";
  monthCount = "";
  count1 = 0;
  count2 = 0;
  count3 = 0;
  count4 = 0;
  count5 = 0;
  count6 = 0;
  count7 = 0;
  count8 = 0;
  count9 = 0;
  count10 = 0;
  count11 = 0;
  count12 = 0;
  p = 1;
  showMore = false;
  itemsPerPage = 6;
  chart = null;

  /** Constructor initialization
   *  Dependency Injection PostService
   *  Assign a value to the variable current year and current month,Initialize monthList[]
   *  Use method getYearList() to create yearList[]
   *  Author:DatTQ ; Date:02/02/2023
   */
  constructor(private postService: PostService, private toastr: ToastrService, private title: Title) {
    this.title.setTitle('Thống kê bài đăng');
    this.currentMonth = new Date().getMonth() + 1;
    this.currentYear = new Date().getFullYear();
    this.getYearList();
    // this.chart = new Chart('myChart', {
    //   type: 'bar',
    //   data: {
    //     labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    //       'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    //     datasets: [{
    //       label: 'Tổng bài đăng',
    //       data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //       // [this.count1, this.count2, this.count3, this.count4, this.count5, this.count6,
    //       // this.count7, this.count8, this.count9, this.count10, this.count11, this.count12],
    //       backgroundColor: '#fa0234',
    //       borderColor: '#fa0234',
    //       borderWidth: 2,
    //       fill: false,
    //     }]
    //   }
    // });
  }

  /**
   * Initialize the value of the variable: postList through the displayListChart() method in PostService &&
   * Register to listen to the event: subscribe
   * Initialize the value of the variable: totalTransaction through the getTotalTransaction() method
   * Initialize the value of the variable: countSuccess,countTotal through the getTotalPostSuccess() method
   * Initialize the value of the variable: count1,count2,count3,count4,count5,count6,
   * count7,count8,count9,count10,count11,count12
   * Initialize post chart value at current year with method createChart();
   * Author: DatTQ  ;  Date:02/02/2023
   */
  ngOnInit(): void {
    this.postService.displayListChart().subscribe(data => {
      this.postCharList = data;
      this.getTotalTransaction();
      this.getTotalPostSuccess();
      this.postCharList.length;
      this.getCountFullList();
      this.chart = new Chart('myChart', {
        type: 'bar',
        data: {
          labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
            'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
          datasets: [{
            label: 'Tổng bài đăng',
            data: [this.count1, this.count2, this.count3, this.count4, this.count5, this.count6,
              this.count7, this.count8, this.count9, this.count10, this.count11, this.count12],
            backgroundColor: '#fa0234',
            borderColor: '#fa0234',
            borderWidth: 2,
            fill: false,
          }]
        }
      });
      this.createChart();
      this.successToastr('Biểu đồ bài đăng tất cả các năm trong danh sách.');
    }, error => {
    }, () => {
    });
  }

  /**
   * Function of event (click)="searchChart(month.value,year.value)
   * Get the value of the variable: postCharList through the searchChart() method in PostService
   * && Register to listen to the event: subscribe
   * Get the value of the variable: totalTransaction,countSuccess,countTotal
   * @param month: string
   * @param year:string
   * Author: DatTQ  ;  Date:02/02/2023
   */
  searchChart(month: string, year: string): void {
    this.postService.searchChart(month.replace('Tháng ', "0"), year).subscribe(data => {
      this.postCharList = data;
      this.totalTransaction = 0;
      this.countSuccess = 0;
      this.countTotal = 0;
      this.yearCount = year;
      this.monthCount = month;
      if ((month != null && month !== '' && month !== '-1')
        && (year != null && year !== '' && year === '-1') && this.postCharList != null) {
        this.toastr.warning('Bạn không chọn năm nên dữ liệu  hiển thị ở tháng & năm hiện tại.', 'Thông báo.', {
          timeOut: 2000
        });
      }
      if ((month != null && month !== '' && month !== '-1') && (year != null && year !== '' && year !== '-1')
        && this.postCharList != null) {
        this.successToastr('Thống kê bài đăng tháng ' + month + ', năm ' + year + '.');
      }
      if ((month != null && month !== '' && month === '-1') && (year != null && year !== '' && year !== '-1')
        && this.postCharList != null) {
        this.successToastr('Thống kê bài đăng năm ' + year + '.');
      }
      if ((month != null && month !== '' && month === '-1') && (year != null && year !== '' && year === '-1')
        && this.postCharList != null) {
        this.successToastr('Thống kê bài đăng trong danh sách.');
      }
      for (let i = 0; i < this.postCharList.length; i++) {
        if (this.postCharList[i].statusPost === 1) {
          // @ts-ignore
          this.totalTransaction += data[i].price;
          this.countSuccess += 1;
          this.countTotal = this.postCharList.length;
        }
      }
    }, error => {
      this.totalTransaction = 0;
      this.countSuccess = 0;
      this.countTotal = 0;
      this.postCharList = [];
      for (let i = 0; i < this.postCharList.length; i++) {
        if (this.postCharList[i].statusPost === 1) {
          // @ts-ignore
          this.totalTransaction += data[i].price;
          this.countSuccess += 1;
          this.countTotal = this.postCharList.length;
        }
      }
      this.errorToastr('Không có dữ liệu bài đăng tháng ' + month + ', năm ' + year + '.');
    });
  }

  /**
   * Function of event (change)="changeYear(yearChange.value);
   * Get the value of the variable: postCharList through the displayListChart() method in PostService;
   * Get the value of the variable: totalTransaction,countSuccess,countTotal;
   * Create Chart corresponding to param (yearChange) with method createChart();
   * @param yearChange: string;
   * Author: DatTQ  ;  Date:02/02/2023;
   */
  changeYear(yearChange: string): void {
    this.count1 = 0;
    this.count2 = 0;
    this.count3 = 0;
    this.count4 = 0;
    this.count5 = 0;
    this.count6 = 0;
    this.count7 = 0;
    this.count8 = 0;
    this.count9 = 0;
    this.count10 = 0;
    this.count11 = 0;
    this.count12 = 0;
    if (yearChange === '-1') {
      this.postService.displayListChart().subscribe(data => {
        this.postCharList = data;
        this.getCountFullList();
        this.createChart();
      })
    }
    if (yearChange !== '-1') {
      this.postService.displayListChart().subscribe(data => {
        this.postCharList = data;
        const posts = this.postCharList.length;
        for (let i = 0; i < posts; i++) {
          // tslint:disable-next-line:triple-equals
          if (this.postCharList[i].monthPost == 1 && this.postCharList[i].yearPost == +yearChange) {
            this.count1 += 1;
          }
          // tslint:disable-next-line:triple-equals
          if (this.postCharList[i].monthPost == 2 && this.postCharList[i].yearPost == +yearChange) {
            this.count2 += 1;
          }
          // tslint:disable-next-line:triple-equals
          if (this.postCharList[i].monthPost == 3 && this.postCharList[i].yearPost == +yearChange) {
            this.count3 += 1;
          }
          // tslint:disable-next-line:triple-equals
          if (this.postCharList[i].monthPost == 4 && this.postCharList[i].yearPost == +yearChange) {
            this.count4 += 1;
          }
          // tslint:disable-next-line:triple-equals
          if (this.postCharList[i].monthPost == 5 && this.postCharList[i].yearPost == +yearChange) {
            this.count5 += 1;
          }
          // tslint:disable-next-line:triple-equals
          if (this.postCharList[i].monthPost == 6 && this.postCharList[i].yearPost == +yearChange) {
            this.count6 += 1;
          }
          // tslint:disable-next-line:triple-equals
          if (this.postCharList[i].monthPost == 7 && this.postCharList[i].yearPost == +yearChange) {
            this.count7 += 1;
          }
          // tslint:disable-next-line:triple-equals
          if (this.postCharList[i].monthPost == 8 && this.postCharList[i].yearPost == +yearChange) {
            this.count8 += 1;
          }
          // tslint:disable-next-line:triple-equals
          if (this.postCharList[i].monthPost == 9 && this.postCharList[i].yearPost == +yearChange) {
            this.count9 += 1;
          }
          // tslint:disable-next-line:triple-equals
          if (this.postCharList[i].monthPost == 10 && this.postCharList[i].yearPost == +yearChange) {
            this.count10 += 1;
          }
          // tslint:disable-next-line:triple-equals
          if (this.postCharList[i].monthPost == 11 && this.postCharList[i].yearPost == +yearChange) {
            this.count11 += 1;
          }
          // tslint:disable-next-line:triple-equals
          if (this.postCharList[i].monthPost == 12 && this.postCharList[i].yearPost == +yearChange) {
            this.count12 += 1;
          }
        }
        this.createChart();
        if (yearChange !== '-1') {
          this.successToastr('Biểu đồ bài đăng năm: ' + yearChange + '.');
        }
      });
    }
  }

  /**
   * Function creat chart
   * Author: DatTQ  ;  Date:02/02/2023;
   */
  createChart(): void {
    console.log(this.chart);
    if (this.chart != null) {
      // @ts-ignore
      this.chart.destroy();
    }
    return this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
          'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [{
          label: 'Tổng bài đăng',
          data: [this.count1, this.count2, this.count3, this.count4, this.count5, this.count6,
            this.count7, this.count8, this.count9, this.count10, this.count11, this.count12],
          backgroundColor: '#fa0234',
          borderColor: '#fa0234',
          borderWidth: 2,
          fill: false,
        }]
      }
    });
  }

  /**
   * Function Initialize the value of yearList[]
   * Author: DatTQ  ;  Date:02/02/2023
   */
  getYearList(): number[] {
    for (let i = this.yearStart; i <= this.currentYear; i++) {
      this.yearList.push(i);
    }
    return this.yearList;
  }

  /**
   * Function Initialize the value of totalTransaction
   * Author: DatTQ  ;  Date:02/02/2023
   */
  getTotalTransaction(): void {
    for (let i = 0; i <= this.postCharList.length; i++) {
      if (this.postCharList[i]?.statusPost === 1) {
        // @ts-ignore
        this.totalTransaction += this.postCharList[i].price;
      }
    }
  }

  /**
   * Function Initialize the value of countSuccess,countTotal
   * Author: DatTQ  ;  Date:02/02/2023
   */
  getTotalPostSuccess(): void {
    for (let i = 0; i <= this.postCharList.length; i++) {
      if (this.postCharList[i]?.statusPost === 1) {
        this.countSuccess += 1;
      }
      this.countTotal = this.postCharList.length;
    }
  }

  /**
   * Function generate message for success case
   * Author: DatTQ  ;  Date:04/02/2023
   * @param mess:string
   */
  successToastr(mess: string): void {
    this.toastr.success(mess, 'Thông báo.', {
      timeOut: 2000
    });
  }

  /**
   * Function generate message for error case
   * Author: DatTQ  ;  Date:04/02/2023
   * @param mess:string
   */
  errorToastr(mess: string): void {
    this.toastr.error(mess, 'Thông Báo.', {
      timeOut: 2000
    });
  }

  /**
   * Function create monthList when click select option "Năm"
   * Author: DatTQ  ;  Date:04/02/2023
   * @param mess:string
   */
  getMonthList() {
    this.monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }

  expandOrCollapseNote(id: number, action: string) {
    if (action === 'expand') {
      // @ts-ignore
      document.getElementById('expandedContentNote' + id).style.display = 'inline-block';
      // @ts-ignore
      document.getElementById('collapsedContentNote' + id).style.display = 'none';
    } else {
      // @ts-ignore
      document.getElementById('expandedContentNote' + id).style.display = 'none';
      // @ts-ignore
      document.getElementById('collapsedContentNote' + id).style.display = 'inline-block';
    }
  }

  getCountFullList(): void {
    for (let i = 0; i < this.postCharList.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.postCharList[i].monthPost == 1) {
        this.count1 += 1;
      }
      // tslint:disable-next-line:triple-equals
      if (this.postCharList[i].monthPost == 2) {
        this.count2 += 1;
      }
      // tslint:disable-next-line:triple-equals
      if (this.postCharList[i].monthPost == 3) {
        this.count3 += 1;
      }
      // tslint:disable-next-line:triple-equals
      if (this.postCharList[i].monthPost == 4) {
        this.count4 += 1;
      }
      // tslint:disable-next-line:triple-equals
      if (this.postCharList[i].monthPost == 5) {
        this.count5 += 1;
      }
      // tslint:disable-next-line:triple-equals
      if (this.postCharList[i].monthPost == 6) {
        this.count6 += 1;
      }
      // tslint:disable-next-line:triple-equals
      if (this.postCharList[i].monthPost == 7) {
        this.count7 += 1;
      }
      // tslint:disable-next-line:triple-equals
      if (this.postCharList[i].monthPost == 8) {
        this.count8 += 1;
      }
      // tslint:disable-next-line:triple-equals
      if (this.postCharList[i].monthPost == 9) {
        this.count9 += 1;
      }
      // tslint:disable-next-line:triple-equals
      if (this.postCharList[i].monthPost == 10) {
        this.count10 += 1;
      }
      // tslint:disable-next-line:triple-equals
      if (this.postCharList[i].monthPost == 11) {
        this.count11 += 1;
      }
      // tslint:disable-next-line:triple-equals
      if (this.postCharList[i].monthPost == 12) {
        this.count12 += 1;
      }
    }

  }
}
