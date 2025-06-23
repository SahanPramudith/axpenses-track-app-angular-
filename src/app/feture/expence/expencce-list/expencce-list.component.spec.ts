import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpencceListComponent } from './expencce-list.component';

describe('ExpencceListComponent', () => {
  let component: ExpencceListComponent;
  let fixture: ComponentFixture<ExpencceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpencceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpencceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
