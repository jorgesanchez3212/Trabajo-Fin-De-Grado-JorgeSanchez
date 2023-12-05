import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisvaloracionesComponent } from './misvaloraciones.component';

describe('MisvaloracionesComponent', () => {
  let component: MisvaloracionesComponent;
  let fixture: ComponentFixture<MisvaloracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisvaloracionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisvaloracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
