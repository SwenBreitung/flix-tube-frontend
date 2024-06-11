import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AuthService } from './../../service/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        RegisterComponent 
      ],
      providers: [AuthService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register a user', () => {
    const spy = spyOn(authService, 'register').and.returnValue(of({}));
    const mockUser = { username: 'test', email: 'test@example.com', password: '123456', password2: '123456' };
    component.checkbox = true;
    component.register({ value: mockUser });

    expect(spy).toHaveBeenCalledWith(mockUser);
  });

  it('should handle registration error', () => {
    const spy = spyOn(authService, 'register').and.returnValue(throwError('error'));
    const mockUser = { username: 'test', email: 'test@example.com', password: '123456', password2: '123456' };
    component.checkbox = true;
    component.register({ value: mockUser });

    expect(spy).toHaveBeenCalledWith(mockUser);
  });

  it('should navigate to login on backToLogin', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.backToLogin();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});