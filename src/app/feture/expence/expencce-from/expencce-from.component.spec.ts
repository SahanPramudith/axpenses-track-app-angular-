import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpencceFromComponent } from './expencce-from.component';

describe('ExpencceFromComponent', () => {
  let component: ExpencceFromComponent;
  let fixture: ComponentFixture<ExpencceFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpencceFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpencceFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
