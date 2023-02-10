import {Post} from '../../entity/post/post';
import {PagePostDto} from '../../dto/post/page-post-dto';
import {PostListCustomerService} from '../../service/post-list-customer/post-list-customer.service';
// @ts-ignore
import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from "@angular/platform-browser";
import {CustomerService} from "../../service/customer.service";

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
  post: Post | undefined;
  nameCustomer: string = "";

  constructor(private postListCustomerService: PostListCustomerService, private activatedRoute: ActivatedRoute,
              private router: Router, private customerService:CustomerService,
              private title: Title
              ) {
    this.title.setTitle('Danh sách nhu cầu khách hàng')
  }

  /**
   * Created by: UyDD
   * Date Created: 03/02/2023
   * * @return call function gotoPage(nameDemandType: string, idAccount: string, pageNumber: number) to display list post of customer with true role log in
   */
  ngOnInit(): void {
    this.idAccount = this.activatedRoute.snapshot.params["idAccount"];
    if (this.idAccount) {
      this.goToPageWithRoleCustomer(this.idAccount + "", "", 0);
    } else {
      this.idCustomer = this.activatedRoute.snapshot.params["idCustomer"];
      this.goToPageWithRoleAdmin(this.idCustomer + "", "", 0);
    }
  }

  /**
   * Created by: UyDD
   * Date Created: 03/02/2023
   * @param value
   * @return call function gotoPage(nameDemandType: string, idAccount: string, pageNumber: number) to search by nameDemandType
   */
  searchByNameDemandType(value: string): void {
    this.search = 'black';
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
    this.pageNumber = pageNumber;
    this.postListCustomerService.getAllAndSearchWithRoleAdmin(idCustomer, nameDemandType, pageNumber).subscribe(data => {
      // @ts-ignore
      this.customerService.findById(idCustomer).subscribe(value => {
        this.nameCustomer = value.nameCustomer.toUpperCase();
      })
      if(!data){
        this.postListCustomer = undefined;
      }
      this.pageTotal = data.totalPages;
      // @ts-ignore
      this.pageNumber = data.pageable?.pageNumber;
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
    this.pageNumber = pageNumber;
    this.postListCustomerService.getAllAndSearchWithRoleCustomer(idAccount, nameDemandType, pageNumber).subscribe(data => {
      this.pageTotal = data.totalPages;
      // @ts-ignore
      this.pageNumber = data.pageable?.pageNumber;
      this.postListCustomer = data.content;
      this.resultPage = data;
      // @ts-ignore

      this.nameCustomer = this.postListCustomer[0].customer.nameCustomer.toUpperCase();
    }, error => {
    });
  }

  infoPost(item: Post) {
    this.post = item;
  }

  back() {
    if (this.idCustomer) {
      // @ts-ignore
      this.router.navigateByUrl('/customer');
    } else {
      this.router.navigateByUrl('/home');
    }
  }
}
