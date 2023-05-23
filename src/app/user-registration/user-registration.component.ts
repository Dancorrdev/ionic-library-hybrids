import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      state: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.registrationForm.valid) {
      // Realizar solicitud HTTP para registrar al usuario
      const formData = this.registrationForm.value;
      this.http.post('URL_DEL_BACKEND/registro', formData).subscribe(
        (response) => {
          // Procesar la respuesta del backend (por ejemplo, mostrar un mensaje de éxito)
          console.log('Usuario registrado con éxito', response);
        },
        (error) => {
          // Manejar errores de registro (por ejemplo, mostrar un mensaje de error)
          console.error('Error al registrar al usuario', error);
        }
      );
    }
  }
}

