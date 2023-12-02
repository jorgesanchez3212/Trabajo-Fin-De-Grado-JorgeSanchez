import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAutomovilComponent } from './detail-automovil.component';

describe('DetailAutomovilComponent', () => {
  let component: DetailAutomovilComponent;
  let fixture: ComponentFixture<DetailAutomovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAutomovilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAutomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
