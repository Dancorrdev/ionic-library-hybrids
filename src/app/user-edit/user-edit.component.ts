import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  editForm: FormGroup;
  userData: any; // Aquí se almacenarán los datos del usuario

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.editForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      state: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userData = this.userService.getUserData(); // Obtener los datos del usuario desde el servicio
    this.fillForm(); // Rellenar el formulario con los datos del usuario
  }

  fillForm() {
    this.editForm.patchValue({
      email: this.userData.email,
      password: this.userData.password,
      state: this.userData.state,
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedUserData = this.editForm.value;
      // Llama a tu servicio o lógica de backend para actualizar los datos del usuario
      this.userService.updateUser(updatedUserData).subscribe(
        (response) => {
          console.log('Datos de usuario actualizados con éxito', response);
          // Realiza cualquier acción adicional después de la actualización exitosa, como mostrar un mensaje de éxito, etc.
        },
        (error) => {
          console.error('Error al actualizar los datos del usuario', error);
          // Maneja el error de actualización, como mostrar un mensaje de error, etc.
        }
      );
    }
  }
}
