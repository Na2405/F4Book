import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadingHashComponent } from './preloading-hash.component';

describe('PreloadingHashComponent', () => {
  let component: PreloadingHashComponent;
  let fixture: ComponentFixture<PreloadingHashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreloadingHashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadingHashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
