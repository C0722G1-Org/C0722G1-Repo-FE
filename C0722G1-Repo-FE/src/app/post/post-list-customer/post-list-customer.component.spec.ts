import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListCustomerComponent } from './post-list-customer.component';

describe('PostListCustomerComponent', () => {
  let component: PostListCustomerComponent;
  let fixture: ComponentFixture<PostListCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostListCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
