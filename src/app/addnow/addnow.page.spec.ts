import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnowPage } from './addnow.page';

describe('AddnowPage', () => {
  let component: AddnowPage;
  let fixture: ComponentFixture<AddnowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnowPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
