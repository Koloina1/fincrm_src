import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, public authService: AuthService, private spinner: NgxSpinnerService) { 
  		this.cretadForm();
  }

  ngOnInit() {
    this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
    }, 5000);
  }

  cretadForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      
    });
  }
 
  loginSubmit(value){
	 if(this.loginForm.valid){
	 	this.authService.doLogin(value)
		    .then(res => {
          this.spinner.show();
          setTimeout(() => {
              this.spinner.hide();
              this.router.navigate(['/dashboard']);
          }, 5000);
		    }, err => {
          this.spinner.show();
            setTimeout(() => {
              this.spinner.hide();
              switch (err.code) {
                case "auth/user-not-found":
                this.errorMessage = 'Il n\'y a pas d\'enregistrement d\'utilisateur correspondant à cet identifiant. L\'utilisateur peut avoir été supprimé.';
                break;
                case "auth/wrong-password":
                this.errorMessage = 'Le mot de passe n\'est pas valide ou l\'utilisateur ne possède pas de mot de passe.';
                break;
              }
          }, 5000);
		})
	 }else{
	 	this.validateAllFormFields(this.loginForm);
	 }
  }

  isFieldValid(field: string) {
    return !this.loginForm.get(field).valid && this.loginForm.get(field).touched;
  }
 
  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
