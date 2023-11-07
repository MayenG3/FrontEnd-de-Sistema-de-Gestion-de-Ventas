import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaproveedoresComponent } from './creaproveedores.component';

describe('CreaproveedoresComponent', () => {
  let component: CreaproveedoresComponent;
  let fixture: ComponentFixture<CreaproveedoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaproveedoresComponent]
    });
    fixture = TestBed.createComponent(CreaproveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
