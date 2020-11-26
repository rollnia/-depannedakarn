import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingdetailPage } from './bookingdetail.page';

describe('BookingdetailPage', () => {
  let component: BookingdetailPage;
  let fixture: ComponentFixture<BookingdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
