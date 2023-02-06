import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationUpdateComponent } from './notification-update.component';

describe('NotificationUpdateComponent', () => {
  let component: NotificationUpdateComponent;
  let fixture: ComponentFixture<NotificationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
