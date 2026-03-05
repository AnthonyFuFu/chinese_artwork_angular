import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterRow } from './character-row';

describe('CharacterRow', () => {
  let component: CharacterRow;
  let fixture: ComponentFixture<CharacterRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
