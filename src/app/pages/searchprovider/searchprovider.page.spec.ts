import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchproviderPage } from './searchprovider.page';

describe('SearchproviderPage', () => {
  let component: SearchproviderPage;
  let fixture: ComponentFixture<SearchproviderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchproviderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchproviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
