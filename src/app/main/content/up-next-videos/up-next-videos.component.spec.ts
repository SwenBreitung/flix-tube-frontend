import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpNextVideosComponent } from './up-next-videos.component';

describe('UpNextVideosComponent', () => {
  let component: UpNextVideosComponent;
  let fixture: ComponentFixture<UpNextVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpNextVideosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpNextVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
