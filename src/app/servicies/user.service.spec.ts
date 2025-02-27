import { TestBed } from "@angular/core/testing";
import { UserService } from "./user.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { User } from "../interfaces/user";
import { response } from "express";

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('creates service', () => {
    expect(userService).toBeTruthy;
  });

  describe('getUsers',() =>{
    it('Deberia devolver un array de todos los usuarios', () => {
      const result: User = {
        id: 0,
        dni: '12345678',
        firstName: 'John',
        lastName: 'Pacient',
        email: 'john@gmail.com',
        password: '1234',
        age: 30,
        codUser: 1
      }
      let userArray: User[];
      userService.getUsers().subscribe((response) => {
        userArray = response;
        expect(userArray[0]).equal(result);
      });
      const request = httpTestingController.expectOne(
        'http://localhost:3000/api/users'
      );
      request.flush(result);
    });
  });

  describe('login',() => {
    it('deberia encontrar un usuario con su dni, contraseña y un captcha valido y devolver una token', () =>{
      const user: User = {
        dni: '12345678',
        password: '1234',
      }
      const recaptcha: string = 'recaptcha'
      const result: string = 'token'
      let token: string
      userService.login(user, recaptcha).subscribe(response => {
        token = response.token
        expect(token).equal(result);
        
      });
      const request = httpTestingController.expectOne(
        'http://localhost:3000/api/users/login'
      );
      request.flush(result);
      expect(request.request.method).equal('POST');
    });
  });
});
