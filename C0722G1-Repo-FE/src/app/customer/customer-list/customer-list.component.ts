import {PageCustomerDto} from '../../dto/page-customer-dto';
import {Customer} from '../../entity/customer/customer';
import {CustomerService} from '../../service/customer.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import {IndividualConfig, ToastrService} from "ngx-toastr";



@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

// customerListFormGroup: FormGroup = new FormGroup({allSearch: new FormControl('',Validators.pattern('[^A-Za-z0-9]'))});
  customer!: PageCustomerDto;
  temp: Customer = {};
  allSearch = '';
  pageable: any;
  emptyCase= "Không có";

  constructor(private customerService: CustomerService,
              private router: Router,
              private titleService: Title, private toast: ToastrService) {
    this.titleService.setTitle("Danh sách khách hàng");

  }

  ngOnInit(): void {
    this.getAllCustomerListComponent(0);
  }

  private getAllCustomerListComponent(pageable: any): void {
    this.customerService.getAllCustomerPaging(pageable, this.allSearch.trim()).subscribe(data => {
      this.customer = data;
    }, error => {
    }, () => {
    });
    // if (this.allSearch !== ''){
    //   this.showToastrSuccess();
    // }
    // else {
    //   this.showToastrError();
    // }
  }

  showSuccess(message: string, title: string, override: Partial<IndividualConfig>): void {
    this.toast.success(message, title, override);
  }

  showError(message: string, title: string): void {
    this.toast.error(message, title);
  }

  private showToastrError(): void {
    this.showError('Không có kết quả cần tìm.', 'Thông báo!');
  }

  private showToastrSuccess(): void {
    this.showSuccess('Tìm kiếm thành công.', 'Thông báo!',{
      timeOut: 1000,
      progressBar: true,
      positionClass: 'toast-top-right',
      easing: 'ease-in'
    });
  }


  gotoPage(pageNumber: number): void {
    this.getAllCustomerListComponent(pageNumber);
  }

  resetSearchInput(): void {
    this.allSearch = '';
  }

  searchByMore(): void {
    this.pageable = 0;
    this.getAllCustomerListComponent(this.pageable);
    // this.allSearch != '&';
  }

  reload(): void {
    this.getAllCustomerListComponent(this.pageable);
  }
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

  refresh(): void {
    window.location.reload();
  }

// submit(): void {
//   const listCustomer = this.customerListFormGroup.value;
//
// }
}
