import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadingRoundedSquareComponent } from './preloading-rounded-square.component';

describe('PreloadingRoundedSquareComponent', () => {
  let component: PreloadingRoundedSquareComponent;
  let fixture: ComponentFixture<PreloadingRoundedSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloadingRoundedSquareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadingRoundedSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
