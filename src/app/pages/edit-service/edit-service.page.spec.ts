import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditServicePage } from './edit-service.page';

describe('EditServicePage', () => {
  let component: EditServicePage;
  let fixture: ComponentFixture<EditServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
