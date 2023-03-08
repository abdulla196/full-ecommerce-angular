import { takeUntil } from 'rxjs/operators';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { User } from '../../models/user';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { Subject, timer } from 'rxjs';

@Component({
  selector: 'users-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegisterFormGroup: UntypedFormGroup;
  isSubmitted = false;
  authError = false;
  countries = [];
  authMessage = 'Email or Password are wrong';
  endUser:Subject<any> = new Subject();
  constructor(
    private formBuilder: UntypedFormBuilder,
    private auth: AuthService,
    private UsersService:UsersService,
    private localstorageService: LocalstorageService,
    private messageService: MessageService,
    private router: Router,
    private location:Location
  ) {}

  ngOnInit(): void {
    this._initRegisterForm();
    this._getCountries()
  }
  private _initRegisterForm() {
    this.RegisterFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
    });
  }
  private _getCountries() {
    this.countries = this.UsersService.getCountries();
  }
  onSubmit() {
    this.isSubmitted = true;

    if (this.RegisterFormGroup.invalid) return;
    
    const user: User = {
      name: this.RegisterForm.name.value,
      password: this.RegisterForm.password.value,
      email: this.RegisterForm.email.value,
      phone: this.RegisterForm.phone.value,
      street: this.RegisterForm.street.value,
      apartment: this.RegisterForm.apartment.value,
      zip: this.RegisterForm.zip.value,
      city: this.RegisterForm.city.value,
      country: this.RegisterForm.country.value
    };
    this.auth.register(user).pipe(takeUntil(this.endUser)).subscribe(
       
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${user.name} is created!`
        });
        timer(2000)
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error)
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not created!'
        });
      }
    );
  }

  get RegisterForm() {
    return this.RegisterFormGroup.controls;
  }
}
