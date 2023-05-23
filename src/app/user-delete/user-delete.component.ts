import { Component } from '@angular/core';
import { UserService } from '../user.service'; // Reemplaza con tu servicio de usuario

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss'],
})
export class UserDeleteComponent {
  constructor(private userService: UserService) {}

  deleteUserAccount() {
    // Llama a tu servicio o lógica de backend para eliminar la cuenta del usuario
    this.userService.deleteUser().subscribe(
      (response) => {
        console.log('Cuenta de usuario eliminada con éxito', response);
        // Realiza cualquier acción adicional después de la eliminación exitosa, como redirigir a una página de inicio de sesión, mostrar un mensaje de éxito, etc.
      },
      (error) => {
        console.error('Error al eliminar la cuenta de usuario', error);
        // Maneja el error de eliminación, como mostrar un mensaje de error, etc.
      }
    );
  }
}
