import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { RegistrationData } from '../interfaces/registration-data.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const mockUser: RegistrationData = { username: 'test', email: 'test@example.com', password: '123456', password2: '123456' };
    
    service.register(mockUser).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://127.0.0.1:8000/register/');
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'User registered successfully' });
  });
});