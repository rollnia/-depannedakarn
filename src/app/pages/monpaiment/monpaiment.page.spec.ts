import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MonpaimentPage } from './monpaiment.page';

describe('MonpaimentPage', () => {
  let component: MonpaimentPage;
  let fixture: ComponentFixture<MonpaimentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonpaimentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MonpaimentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
