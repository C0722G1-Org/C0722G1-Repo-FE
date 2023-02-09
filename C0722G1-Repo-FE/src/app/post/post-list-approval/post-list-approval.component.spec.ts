import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListApprovalComponent } from './post-list-approval.component';

describe('PostListApprovalComponent', () => {
  let component: PostListApprovalComponent;
  let fixture: ComponentFixture<PostListApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostListApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
