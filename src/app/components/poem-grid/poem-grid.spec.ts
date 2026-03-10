import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoemGrid } from './poem-grid';

describe('PoemGrid', () => {
  let component: PoemGrid;
  let fixture: ComponentFixture<PoemGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoemGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoemGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
