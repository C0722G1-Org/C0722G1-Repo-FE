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
  pageTotal : number | undefined=0;
  pageNumber : number | undefined=0;
  postListCustomer: Post[] | undefined;
  idAccount: string | null | undefined="";
  role: any;
  demandType: string|undefined|null ="";
  constructor(private _postListCustomerService: PostListCustomerService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.role = localStorage.getItem("roles");
    if(this.role) {
      // @ts-ignore
      this.role = (JSON.parse(this.role)).forEach(data => {
        if (data.authority == "CUSTOMER") {
          this.idAccount = localStorage.getItem("idAccount");
        } else {
          this.idAccount = this.activatedRoute.snapshot.params["idAccount"];
        }
      })
    }

    this.goToPage("", this.idAccount + "", 0)
  }

  searchByNameDemandType(value: string) {
    if(!this.pageNumber) {
      this.pageNumber = 0;
    }
    this.goToPage(value, this.idAccount + "", this.pageNumber)
  }

  goToPage(nameDemandType: string, idAccount: string, pageNumber: number) {
    this._postListCustomerService.getAllAndSearch(nameDemandType, idAccount, pageNumber).subscribe(data => {
      this.pageTotal = data.totalPages;
      this.pageNumber = data.pageable?.pageNumber;
      this.postListCustomer = data.content;
    })
  }

}
