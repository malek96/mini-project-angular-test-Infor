import { ComponentFixture, MonthBed } from '@angular/core/monthing';

import { MonthComponent } from './month.component';

describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;

  beforeEach(async () => {
    await MonthBed.configureMonthingModule({
      declarations: [ MonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = MonthBed.createComponent(MonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
