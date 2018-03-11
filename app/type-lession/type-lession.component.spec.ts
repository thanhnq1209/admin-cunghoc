import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeLessionComponent } from './type-lession.component';

describe('TypeLessionComponent', () => {
  let component: TypeLessionComponent;
  let fixture: ComponentFixture<TypeLessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeLessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeLessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
