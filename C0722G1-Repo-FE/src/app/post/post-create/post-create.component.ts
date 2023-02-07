import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LandType} from '../../entity/post/land-type';
import {City} from '../../entity/post/city';
import {Direction} from '../../entity/post/direction';
import {DemandType} from '../../entity/post/demand-type';
import {PostCreateServiceService} from '../../service/post/post-create/post-create-service.service';
import {Wards} from '../../entity/post/wards';
import {District} from '../../entity/post/district';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {CreatePostDto} from '../../dto/post/post-create/create-post-dto';
import {ToastrService} from 'ngx-toastr';
import {BaseResponseCreatePost} from '../../dto/post/post-create/base-response-create-post';
import {ResponseStatusEnum} from '../../dto/post/post-create/response-status-enum.enum';
import {TokenService} from '../../service/token.service';
import {CreatePostDtoCustomer} from '../../dto/post/post-create/create-post-dto-customer';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  REGEX_VIETNAMESE = '[a-zA-Z0-9àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ/ ]+';

  createPostDtoUnit = this.fb.group({
    idCustomer: [1, [Validators.required, Validators.min(0)]],
    namePost: ['', [Validators.required, Validators.pattern(this.REGEX_VIETNAMESE)
      , Validators.maxLength(50), Validators.minLength(10)]],
    idDemand: [-1, [Validators.required, Validators.min(0)]],
    idLandType: [-1, [Validators.required, Validators.min(0)]],
    idWards: [-1, [Validators.required, Validators.min(0)]],
    idDirection: [-1, [Validators.required, Validators.min(0)]],
    numberAddress: ['', [Validators.required, Validators.pattern(this.REGEX_VIETNAMESE)
      , Validators.maxLength(50), Validators.minLength(5)]],
    price: ['', [Validators.required, Validators.min(1000000), Validators.max(100000000000), Validators.pattern('[0-9]+')]],
    area: ['', [Validators.required, Validators.min(10), Validators.max(10000), Validators.pattern('[0-9]+')]],
    note: ['', [Validators.maxLength(255), Validators.pattern(this.REGEX_VIETNAMESE)]]
  });
  landTypeList: LandType[] = [];
  cityList: City[] = [];
  directionList: Direction[] = [];
  demandTypeList: DemandType[] = [];
  districtsList: District[] = [];
  districtsListOnCity: District[] = [];
  wardsList: Wards[] = [];
  wardsDefault: Wards = {
    idWards: -1,
    nameWards: '--- Hãy chọn quận/huyện ---',
  };
  wardsListOnDistrict: Wards[] = [this.wardsDefault];
  priceType = 0;
  nameImageList: string[] = ['Chưa có ảnh'];
  imageList: any[] = [];
  imagePathFireBase = '/post/image';
  imageDownloadUrl: string[] = [];
  createPostDto: CreatePostDto = {
    area: 0,
    idCustomer: 0,
    idDemand: 0,
    idDirection: 0,
    idLandType: 0,
    idWards: 0,
    imageListURL: [],
    namePost: '',
    note: '',
    numberAddress: '',
    price: 0
  };

  idAccount: number | string | null = '';
  baseResponse: BaseResponseCreatePost = {
    code: 0,
    status: ResponseStatusEnum.SUCCESS,
    message: '',
    createPostDto: this.createPostDto
  };
  submitTimes = 0;

  messageFormServer = '';

  createPostDtoCustomer: CreatePostDtoCustomer = {
    idCustomer: 0,
    codeCustomer: '',
  };

  codeCustomer = 'Lỗi chưa xác định';

  constructor(
    private fb: FormBuilder,
    private createPostService: PostCreateServiceService,
    @Inject(AngularFireStorage) private fireStorage: AngularFireStorage,
    private toastrService: ToastrService,
    private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.idAccount = this.tokenService.getIdAccount();
    if (this.idAccount != null) {
      this.idAccount = +this.idAccount;
      this.createPostService.getIdAndCodeCustomer(this.idAccount).subscribe(data => {
        this.createPostDtoCustomer = data;
        this.createPostDtoUnit.controls.idCustomer.setValue(this.createPostDtoCustomer.idCustomer);
        this.codeCustomer = this.createPostDtoCustomer.codeCustomer;
      });
    }
    this.getLandType();
    this.getDemandType();
    this.getDirectionList();
    this.getCityList();
    this.getDistrictsList();
    this.getWardsList();
  }

  getLandType(): void {
    this.createPostService.getLandTypeList().subscribe(data => {
        this.landTypeList = data;
      }, error => {
      },
      () => {
      });
  }

  getDemandType(): void {
    this.createPostService.getDemandTypeList().subscribe(data => {
        this.demandTypeList = data;
      }, error => {
      },
      () => {
      });
  }

  getDirectionList(): void {
    this.createPostService.getDirectionList().subscribe(data => {
        this.directionList = data;
      }, error => {
      },
      () => {
      });
  }

  getCityList(): void {
    this.createPostService.getCityList().subscribe(data => {
        this.cityList = data;
      }, error => {
      },
      () => {
      });
  }

  getDistrictsList(): void {
    this.createPostService.getDistrictsList().subscribe(data => {
        this.districtsList = data;
      }, error => {
      },
      () => {
      });
  }

  getWardsList(): void {
    this.createPostService.getWardsList().subscribe(data => {
        this.wardsList = data;
      }, error => {
      },
      () => {
      });
  }

  savePost(): void {
    this.submitTimes++;
    if (this.createPostDtoUnit.invalid) {
      this.toastrService.error('Gửi bài đăng thất bại. Vui lòng kiểm tra lại thông tin đã điền');
      this.createPostDtoUnit.markAllAsTouched();
      this.createPostDtoUnit.markAsDirty();
      return;
    }
    if (this.createPostDtoUnit.valid) {
      this.getDownloadImageURLList();
      this.createPostDto = this.createPostDtoUnit.value;
      this.createPostDto.imageListURL = this.imageDownloadUrl;
      console.log(this.imageDownloadUrl);
      this.createPostService.savePost(this.createPostDto).subscribe((payload) => {
        this.baseResponse = payload;
        console.log(this.baseResponse);
        if (this.baseResponse.code === 200) {
          this.resetCreatePostDtoUnit();
          this.submitTimes = 0;
          this.messageFormServer = '';
          this.toastrService.success('Thêm mới thành công');
          return;
        }
        if (this.baseResponse.code === 422) {
          this.messageFormServer = this.baseResponse.message;
        }
      });
    }
  }

  private getDownloadImageURLList(): void {
    const amountOfFile = this.imageList.length;
    if (amountOfFile !== 0) {
      for (let i = 0; i < amountOfFile; i++) {
        const filePath = this.imagePathFireBase + this.nameImageList[i];
        const storageRef = this.fireStorage.ref(filePath);
        const uploadTask = this.fireStorage.upload(filePath, this.imageList[i]);

        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe(downloadURL => {
              this.imageDownloadUrl = [];
              this.imageDownloadUrl.push(downloadURL);
            });
          })
        ).subscribe();
      }
    }
  }

  getDistrictsListOnCity(value: string): void {
    this.districtsListOnCity = [];
    for (const district of this.districtsList) {
      if (district.city?.idCity !== undefined && district.city?.idCity.toString() === value) {
        this.districtsListOnCity.push(district);
      }
    }
  }

  getWardsListOnDistricts(value: string): void {
    this.wardsListOnDistrict = [this.wardsDefault];
    this.createPostDtoUnit.controls.idWards.setValue(-1);
    for (const wards of this.wardsList) {
      if (wards.district?.idDistrict !== undefined && wards.district?.idDistrict.toString() === value) {
        this.wardsListOnDistrict.push(wards);
      }
    }
  }

  setPriceDescription(target: number): void {
    this.priceType = target;
  }

  showFilesName(event: any): void {
    const amountOfFile = event.target.files.length;
    if (amountOfFile !== 0) {
      this.nameImageList = [];
      for (let i = 0; i < amountOfFile; i++) {
        this.imageList.push(event.target.files[i]);
        this.nameImageList.push(event.target.files[i].name);
      }
    } else {
      this.nameImageList = ['Chưa có ảnh'];
    }
  }

  resetCreatePostDtoUnit(): void {
    this.createPostDtoUnit.controls.namePost.setValue('');
    this.createPostDtoUnit.controls.idDemand.setValue(-1);
    this.createPostDtoUnit.controls.idLandType.setValue(-1);
    this.createPostDtoUnit.controls.idWards.setValue(-1);
    this.createPostDtoUnit.controls.idDirection.setValue(-1);
    this.createPostDtoUnit.controls.numberAddress.setValue('');
    this.createPostDtoUnit.controls.price.setValue('');
    this.createPostDtoUnit.controls.area.setValue('');
    this.createPostDtoUnit.controls.note.setValue('');
    this.createPostDtoUnit.markAsPristine();
    this.createPostDtoUnit.markAsUntouched();
    this.nameImageList = [];
    this.imageList = [];
  }
}
