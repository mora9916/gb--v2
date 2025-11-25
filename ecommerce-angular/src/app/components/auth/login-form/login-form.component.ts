import { Component,inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { FormErrorService } from '../../../core/services/validation/form-error.service';
import { FormFieldComponent } from '../../shared/form-field/form-field.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink, FormFieldComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  fb = inject(FormBuilder);
  loginForm: FormGroup;

  constructor(private validation: FormErrorService, private authService:AuthService, private router:Router){
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    });
  }
  getErrorMsg(fieldName:string){
    const loginLabels = {
      email: 'email',
      password: 'contraseña'
    }
    return this.validation.getFieldError(this.loginForm, fieldName, loginLabels)
  }

  handleSubmit(){
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('Acceso correcto', res);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('Error en login', err);
      }
    });
  }

}
