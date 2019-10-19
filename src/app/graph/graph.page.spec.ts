import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPage } from './graph.page';

describe('GraphPage', () => {
  let component: GraphPage;
  let fixture: ComponentFixture<GraphPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
