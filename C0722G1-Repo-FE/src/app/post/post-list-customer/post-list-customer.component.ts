import {Component, OnInit} from '@angular/core';
import {Post} from "../../entity/post/post";
import {PostListCustomerService} from "../../service/post-list-customer/post-list-customer.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-post-list-customer',
  templateUrl: './post-list-customer.component.html',
  styleUrls: ['./post-list-customer.component.css']
})
export class PostListCustomerComponent implements OnInit {
  pageTotal: number | undefined = 0;
  pageNumber: number | undefined = 0;
  postListCustomer: Post[] | undefined;
  idAccount: string | null | undefined = "";
  idCustomer: string | null | undefined;
  role: any;
  demandType: string | undefined | null = "";

  constructor(private _postListCustomerService: PostListCustomerService, private activatedRoute: ActivatedRoute) {
  }

  /**
   * Created by: UyDD
   * Date Created: 03/02/2023
   * @param
   * @return call function gotoPage(nameDemandType: string, idAccount: string, pageNumber: number) to display list post of customer with true role log in
   */
  ngOnInit(): void {
    this.role = localStorage.getItem("roles");
    if (this.role) {
      // @ts-ignore
      this.role = (JSON.parse(this.role)).forEach(data => {
        if (data.authority == "CUSTOMER") {
          this.idAccount = localStorage.getItem("idAccount");
          this.goToPage("", this.idAccount + "", 0);
        } else {
          this.idCustomer = this.activatedRoute.snapshot.params["idCustomer"];
          this.goToPage("", this.idCustomer + "", 0);
        }
      })
    }
  }

  /**
   * Created by: UyDD
   * Date Created: 03/02/2023
   * @param value
   * @return call function gotoPage(nameDemandType: string, idAccount: string, pageNumber: number) to search by nameDemandType
   */
  searchByNameDemandType(value: string) {
    if (!this.pageNumber) {
      this.pageNumber = 0;
    }
    this.goToPage(value, this.idAccount + "", this.pageNumber)
  }

  /**
   * Created by: UyDD
   * Date Created: 03/02/2023
   * @param nameDemandType
   * @param idAccount
   * @param pageNumber
   * @return call function getAllAndSearch(nameDemandType, idAccount, pageNumber) from service to display list post of customer have paging
   */
  goToPage(nameDemandType: string, idAccount: string, pageNumber: number) {
    this._postListCustomerService.getAllAndSearch(nameDemandType, idAccount, pageNumber).subscribe(data => {
      this.pageTotal = data.totalPages;
      this.pageNumber = data.pageable?.pageNumber;
      this.postListCustomer = data.content;
    })
  }
}
