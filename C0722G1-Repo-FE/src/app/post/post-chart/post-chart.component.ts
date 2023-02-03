import {Component, OnInit} from '@angular/core';
import {PortChart} from '../../entity/post/port-chart';
import {PostService} from '../post.service';
import {Chart} from 'chart.js';

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

  /** Constructor initialization
   *  Dependency Injection PostService
   *  Assign a value to the variable current year and current month,Initialize monthList[]
   *  Use method getYearList() to create yearList[]
   *  Author:DatTQ ; Date:02/02/2023
   */
  constructor(private postService: PostService) {
    this.currentMonth = new Date().getMonth() + 1;
    this.currentYear = new Date().getFullYear();
    this.monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.getYearList();
  }

  /**
   * Initialize the value of the variable: postList through the displayListChart() method in PostService
   * Initialize the value of the variable: totalTransaction through the getTotalTransaction() method
   * Initialize the value of the variable: countSuccess,countTotal through the getTotalPostSuccess() method
   * Initialize the value of the variable: count1,count2,count3,count4,count5,count6,
   count7,count8,count9,count10,count11,count12
   * Initialize post chart value at current year
   * Author: DatTQ  ;  Date:02/02/2023
   */
  ngOnInit(): void {
    this.postService.displayListChart().subscribe(data => {
      this.postCharList = data;
      this.getTotalTransaction();
      this.getTotalPostSuccess();
      let posts = this.postCharList.length;
      for (let i = 0; i < posts; i++) {
        if (this.postCharList[i].monthPost == 1 && this.postCharList[i].yearPost == this.currentYear) {
          this.count1 += 1;
        }
        if (this.postCharList[i].monthPost == 2 && this.postCharList[i].yearPost == this.currentYear) {
          this.count2 += 1;
        }
        if (this.postCharList[i].monthPost == 3 && this.postCharList[i].yearPost == this.currentYear) {
          this.count3 += 1;
        }
        if (this.postCharList[i].monthPost == 4 && this.postCharList[i].yearPost == this.currentYear) {
          this.count4 += 1;
        }
        if (this.postCharList[i].monthPost == 5 && this.postCharList[i].yearPost == this.currentYear) {
          this.count5 += 1;
        }
        if (this.postCharList[i].monthPost == 6 && this.postCharList[i].yearPost == this.currentYear) {
          this.count6 += 1;
        }
        if (this.postCharList[i].monthPost == 7 && this.postCharList[i].yearPost == this.currentYear) {
          this.count7 += 1;
        }
        if (this.postCharList[i].monthPost == 8 && this.postCharList[i].yearPost == this.currentYear) {
          this.count8 += 1;
        }
        if (this.postCharList[i].monthPost == 10 && this.postCharList[i].yearPost == this.currentYear) {
          this.count10 += 1;
        }
        if (this.postCharList[i].monthPost == 11 && this.postCharList[i].yearPost == this.currentYear) {
          this.count11 += 1;
        }
        if (this.postCharList[i].monthPost == 12 && this.postCharList[i].yearPost == this.currentYear) {
          this.count12 += 1;
        }
      }

      /*===CREATE CHART*/
      new Chart('myChart', {
        type: 'line',
        data: {
          labels: ['Tháng1', 'Tháng2', 'Tháng3', 'Tháng4', 'Tháng5', 'Tháng6',
            'Tháng7', 'Tháng8', 'Tháng9', 'Tháng10', 'Tháng11', 'Tháng12'],
          datasets: [{
            label: 'Tổng bài đăng',
            data: [this.count1, this.count2, this.count3, this.count4, this.count5, this.count6,
              this.count7, this.count8, this.count9, this.count10, this.count11, this.count12],
            backgroundColor: '#02165f',
            borderColor: '#02165f',
            borderWidth: 2,
            fill: false,
          }]
        },
      });
    })
  }

  /**
   * Function of event (click)="searchChart(month.value,year.value)
   * Get the value of the variable: postCharList through the searchChart() method in PostService
   * Get the value of the variable: totalTransaction,countSuccess,countTotal
   * @param month
   * @param year
   * Author: DatTQ  ;  Date:02/02/2023
   */
  searchChart(month: string, year: string) {
    this.postService.searchChart(month, year).subscribe(data => {
      this.postCharList = data;
      this.totalTransaction = 0;
      this.countSuccess = 0;
      this.countTotal = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].statusPost == 1) {
          // @ts-ignore
          this.totalTransaction += data[i].price;
          this.countSuccess += 1;
          this.countTotal = this.postCharList.length;
        }
      }
    })
  }

  /**
   * Function of event (change)="changeYear(yearChange.value);
   * Get the value of the variable: postCharList through the displayListChart() method in PostService;
   * Get the value of the variable: totalTransaction,countSuccess,countTotal;
   * Create Chart corresponding to param (yearChange)
   * @param yearChange;
   * Author: DatTQ  ;  Date:02/02/2023;
   */
  changeYear(yearChange: string) {
    this.postService.displayListChart().subscribe(data => {
      this.postCharList = data;
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
      let posts = this.postCharList.length;
      for (let i = 0; i < posts; i++) {
        if (this.postCharList[i].monthPost == 1 && this.postCharList[i].yearPost == +yearChange) {
          this.count1 += 1;
        }
        if (this.postCharList[i].monthPost == 2 && this.postCharList[i].yearPost == +yearChange) {
          this.count2 += 1;
        }
        if (this.postCharList[i].monthPost == 3 && this.postCharList[i].yearPost == +yearChange) {
          this.count3 += 1;
        }
        if (this.postCharList[i].monthPost == 4 && this.postCharList[i].yearPost == +yearChange) {
          this.count4 += 1;
        }
        if (this.postCharList[i].monthPost == 5 && this.postCharList[i].yearPost == +yearChange) {
          this.count5 += 1;
        }
        if (this.postCharList[i].monthPost == 6 && this.postCharList[i].yearPost == +yearChange) {
          this.count6 += 1;
        }
        if (this.postCharList[i].monthPost == 7 && this.postCharList[i].yearPost == +yearChange) {
          this.count7 += 1;
        }
        if (this.postCharList[i].monthPost == 8 && this.postCharList[i].yearPost == +yearChange) {
          this.count8 += 1;
        }
        if (this.postCharList[i].monthPost == 10 && this.postCharList[i].yearPost == +yearChange) {
          this.count10 += 1;
        }
        if (this.postCharList[i].monthPost == 11 && this.postCharList[i].yearPost == +yearChange) {
          this.count11 += 1;
        }
        if (this.postCharList[i].monthPost == 12 && this.postCharList[i].yearPost == +yearChange) {
          this.count12 += 1;
        }
      }

      /*===CREATE CHART*/
      new Chart('myChart', {
        type: 'radar',
        data: {
          labels: ['Tháng1', 'Tháng2', 'Tháng3', 'Tháng4', 'Tháng5', 'Tháng6',
            'Tháng7', 'Tháng8', 'Tháng9', 'Tháng10', 'Tháng11', 'Tháng12'],
          datasets: [{
            label: 'Tổng bài đăng năm ' + yearChange,
            data: [this.count1, this.count2, this.count3, this.count4, this.count5, this.count6,
              this.count7, this.count8, this.count9, this.count10, this.count11, this.count12],
            backgroundColor: '#ec0326',
            borderColor: '#ec0326',
            borderWidth: 1,
            fill: false,
          }]
        }
      });

    })

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
      if (this.postCharList[i].statusPost == 1) {
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
      if (this.postCharList[i].statusPost == 1) {
        this.countSuccess += 1;
      }
      this.countTotal = this.postCharList.length;
    }
  }
}
