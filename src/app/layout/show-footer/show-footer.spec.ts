import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFooter } from './show-footer';

describe('ShowFooter', () => {
  let component: ShowFooter;
  let fixture: ComponentFixture<ShowFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
