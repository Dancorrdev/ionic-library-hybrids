import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

interface Usuario {
  nombre: string;
  // Otras propiedades del usuario
}

@Component({
  selector: 'app-edicion-datos',
  templateUrl: './edicion-datos.page.html',
  styleUrls: ['./edicion-datos.page.scss'],
})

export class EdicionDatosPage implements OnInit {

  nombre: string = "";
  password: string = "";
  confirmarPassword: string = "";
  userId: string = "";

  constructor(private http: HttpClient, private toastController: ToastController) {}

    // Se llama al ingresar a la página para cargar los datos actuales del usuario
  ionViewDidEnter() {
    // Obtener los datos del usuario desde la API y asignarlos a las variables correspondientes (nombre, password, etc.)
    this.obtenerDatosUsuario();
  }

  obtenerDatosUsuario() {
    this.http.get<Usuario>('URL_DE_TU_API/' + this.userId)
      .subscribe(
        (response: Usuario) => {
          this.nombre = response.nombre;
          this.password = ''; // No se muestra la contraseña actual
          this.confirmarPassword = ''; // No se muestra la confirmación de contraseña actual
        },
        error => {
          console.error('Error al obtener los datos del usuario', error);
          this.presentToast('Error al obtener los datos del usuario');
        }
      );
  }

  editarDatos() {
    if (this.password !== this.confirmarPassword) {
      this.presentToast('Las contraseñas no coinciden');
      return;
    }

    const userData = {
      nombre: this.nombre,
      password: this.password
    };

    this.http.put('URL_DE_TU_API/' + this.userId, userData)
      .subscribe(response => {
        console.log('Datos del usuario actualizados exitosamente', response);
        this.presentToast('Datos actualizados exitosamente');
        // Aquí puedes realizar cualquier acción adicional después de la actualización exitosa
      }, error => {
        console.error('Error al actualizar los datos del usuario', error);
        this.presentToast('Error al actualizar los datos del usuario');
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  eliminarCuenta() {
    // Mostrar un diálogo de confirmación antes de eliminar la cuenta
    // Para este ejemplo, utilizaremos el método `confirm` del navegador
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
  
    if (confirmacion) {
      this.http.delete('URL_DE_TU_API/' + this.userId)
        .subscribe(response => {
          console.log('Cuenta eliminada exitosamente', response);
          this.presentToast('Cuenta eliminada exitosamente');
          // Aquí puedes realizar cualquier acción adicional después de la eliminación exitosa, como redirigir a la página de inicio de sesión
        }, error => {
          console.error('Error al eliminar la cuenta', error);
          this.presentToast('Error al eliminar la cuenta');
        });
    }
  }

  ngOnInit() {
  }

}
