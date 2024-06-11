import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { VideoPageComponent } from './video-page.component';

describe('VideoPageComponent', () => {
  let component: VideoPageComponent;
  let fixture: ComponentFixture<VideoPageComponent>;
  let activatedRouteMock;

  beforeEach(async () => {
    // Mock für ActivatedRoute mit snapshot.paramMap
    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: (key: string) => 'mockId'
        }
      }
    };

    // Konfiguration des TestBed für die Standalone-Komponente
    await TestBed.configureTestingModule({
      imports: [VideoPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sollte erstellt werden', () => {
    expect(component).toBeTruthy();
  });

  it('sollte ID aus ActivatedRoute lesen', () => {
    component.ngOnInit();
    expect(component.id).toBe('mockId');
  });
});