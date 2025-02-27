import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ToastrModule, ToastrService} from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../servicies/user.service';
import { UserServiceMock } from '../mocks/user.service.mock';
import { DoctorService } from '../servicies/doctor.service';
import { DoctorServiceMock } from '../mocks/doctor.service.mock';
import { Router } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let serviceMock: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ToastrModule.forRoot(), 
        HttpClientTestingModule, 
        RecaptchaModule,
        FormsModule,
      ],
      declarations: [LoginComponent],
      providers: [
        {provide: UserService, useClass: UserServiceMock},
        {provide: DoctorService, useClass: DoctorServiceMock},
        {provide: Router},
        {provide: ToastrService},
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('captchaResuelto', () => {
    it('guardar la respuesta captcha en una variable', () => {
      const captcha = 'captcha';
      component.captchaResuelto(captcha);
      expect(component.captcha).toEqual(captcha);
    });
  });

  describe('showLoading', () => {
    it('deberia igualar la bandera loadinga true', () =>{
      const flag = true;
      component.showLoading();
      expect(component.loading).toEqual(flag);
    });
  });

  describe('login', () => {
    it('deberia detectar datos vacios, restringir el acceso y avisar al usuario', () => {
      const error = 'error'
      component.dni = '';
      component.password = '';
      component.login();
      jest.spyOn(serviceMock, 'error').mockReturnValue(error);
      expect(serviceMock).toHaveBeenCalled();
    });
  });
});
