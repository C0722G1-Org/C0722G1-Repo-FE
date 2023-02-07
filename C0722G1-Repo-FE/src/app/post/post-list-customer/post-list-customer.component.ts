import {Component, OnInit} from '@angular/core';
import {Post} from '../../entity/post/post';
import {PagePostDto} from '../../dto/post/page-post-dto';
import {PostListCustomerService} from '../../service/post-list-customer/post-list-customer.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post-list-customer',
  templateUrl: './post-list-customer.component.html',
  styleUrls: ['./post-list-customer.component.css']
})
export class PostListCustomerComponent implements OnInit {
  pageTotal: number | undefined = 0;
  pageNumber: number | undefined = 1;
  postListCustomer: Post[] | undefined;
  idAccount: string | null | undefined = '';
  idCustomer: string | null | undefined = '';
  role: any;
  demandType: string | undefined | null = '';
  resultPage: PagePostDto | undefined;
  search = 'transparent !important';

  constructor(private postListCustomerService: PostListCustomerService, private activatedRoute: ActivatedRoute) {
  }

  /**
   * Created by: UyDD
   * Date Created: 03/02/2023
   * * @return call function gotoPage(nameDemandType: string, idAccount: string, pageNumber: number) to display list post of customer with true role log in
   */

  ngOnInit(): void {
    this.role = localStorage.getItem('roles');
    // @ts-ignore
    // this.role = (JSON.parse(this.role)).forEach(data => {
    //   if (data.authority == "CUSTOMER") {
    //     this.idAccount = localStorage.getItem("idAccount");
    //   }
    // })
    if (this.idAccount !== '') {
      this.goToPageWithRoleCustomer(this.idAccount + '', '', 0);
      // this._postListCustomerService.getCustomerByIdAccount(this.idAccount+"").subscribe(value => {
      //   this.customer = value;
      // })
    } else {
      this.idCustomer = this.activatedRoute.snapshot.params['idCustomer'];
      this.goToPageWithRoleAdmin(this.idCustomer + '', '', 0);
      // this._postListCustomerService.getCustomerById(this.idCustomer+"").subscribe(value => {
      //   this.customer = value;
      // })
    }
  }

  /**
   * Created by: UyDD
   * Date Created: 03/02/2023
   * @param value
   * @return call function gotoPage(nameDemandType: string, idAccount: string, pageNumber: number) to search by nameDemandType
   */
  searchByNameDemandType(value: string): void {
    console.log(value);
    this.search = 'red';
    if (this.idCustomer !== '') {
      this.demandType = value;
      this.pageNumber = 0;
      this.goToPageWithRoleAdmin(this.idCustomer + '', value, this.pageNumber);
    } else if (this.idCustomer === '') {
      this.demandType = value;
      this.pageNumber = 0;
      this.goToPageWithRoleCustomer(this.idAccount + '', value, this.pageNumber);
    }
  }

  /**
   * Created by: UyDD
   * Date Created: 03/02/2023
   * @param nameDemandType
   * @param idCustomer
   * @param pageNumber
   * @return call function getAllAndSearch(nameDemandType, idAccount, pageNumber) from service to display list post of customer have paging
   */

  goToPageWithRoleAdmin(idCustomer: string, nameDemandType: string, pageNumber: number): void {
    this.postListCustomerService.getAllAndSearchWithRoleAdmin(idCustomer, nameDemandType, pageNumber).subscribe(data => {
      this.pageTotal = data.totalPages;
      // @ts-ignore
      this.pageNumber = data.pageable?.pageNumber + 1;
      this.postListCustomer = data.content;
      this.resultPage = data;
    });
  }

  /**
   * Created by: UyDD
   * Date Created: 03/02/2023
   * @param nameDemandType
   * @param idAccount
   * @param pageNumber
   * @return call function getAllAndSearch(nameDemandType, idAccount, pageNumber) from service to display list post of customer have paging
   */
  goToPageWithRoleCustomer(idAccount: string, nameDemandType: string, pageNumber: number): void {
    this.postListCustomerService.getAllAndSearchWithRoleCustomer(idAccount, nameDemandType, pageNumber).subscribe(data => {
      this.pageTotal = data.totalPages;
      // @ts-ignore
      this.pageNumber = data.pageable?.pageNumber + 1;
      this.postListCustomer = data.content;
      this.resultPage = data;
    });
  }

}
