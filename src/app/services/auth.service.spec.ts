import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Auth } from '../models/auth.model';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let tokenService: TokenService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        TokenService
      ]
    });
    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('Tests for login', () => {
    it('should return a token', (doneFn) => {
      const mockData: Auth = {
        access_token: 'tkn123'
      };
      const email = 'test@email.com';
      const password = 'test123';

      authService.login(email, password).subscribe((response) => {
        expect(response).toEqual(mockData);
        doneFn();
      });

      const url = `${environment.API_URL}/api/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockData);

      expect(req.request.method).toBe('POST');
    });

    it('should save the received token', (doneFn) => {
      const mockData: Auth = {
        access_token: 'tkn123'
      };
      const email = 'test@email.com';
      const password = 'test123';
      spyOn(tokenService, 'saveToken').and.callThrough();

      authService.login(email, password).subscribe((response) => {
        expect(response).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledOnceWith(mockData.access_token);
        doneFn();
      });

      const url = `${environment.API_URL}/api/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockData);

      expect(req.request.method).toBe('POST');
    });
  });
});
