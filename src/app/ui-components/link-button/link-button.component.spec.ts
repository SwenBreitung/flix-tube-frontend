import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { LinkButtonComponent } from './link-button.component'; // Beispielkomponente

describe('LinkButtonComponent', () => {
  let component: LinkButtonComponent;
  let fixture: ComponentFixture<LinkButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkButtonComponent], // Importieren Sie die Standalone-Komponente hier
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
