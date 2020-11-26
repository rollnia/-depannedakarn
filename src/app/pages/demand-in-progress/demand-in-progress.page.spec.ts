import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemandInProgressPage } from './demand-in-progress.page';

describe('DemandInProgressPage', () => {
  let component: DemandInProgressPage;
  let fixture: ComponentFixture<DemandInProgressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandInProgressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemandInProgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
