import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import{
  FormGroup,
  FormControl,
  Validator,
  FormBuilder,
  Validators
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  
  nombre: string = "";
  password: string = "";
  confirmarPassword: string = "";
  
  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, public navCtr: NavController, private http: HttpClient, private toastController: ToastController) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'contraseña': new FormControl("", Validators.required),
      'confirmeContraseña': new FormControl("", Validators.required)
    });
  }

  register() {
    if (this.password !== this.confirmarPassword) {
      this.presentToast('Las contraseñas no coinciden');
      return;
    }

    const userData = {
      nombre: this.nombre,
      password: this.password
    };

    this.http.post('URL_DE_TU_API', userData)
      .subscribe(response => {
        console.log('Usuario registrado exitosamente', response);
        this.presentToast('Usuario registrado exitosamente');
        // Aquí puedes realizar cualquier acción adicional después del registro exitoso
      }, error => {
        console.error('Error al registrar el usuario', error);
        this.presentToast('Error al registrar el usuario');
        // Aquí puedes manejar el error o mostrar un mensaje al usuario
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }



  ngOnInit() {
  }
  async guardar(){
    var f = this.formularioRegistro.value;
    if(this.formularioRegistro.invalid){

      const alert = await this.alertController.create({
        header: 'DATOS INCOMPLETOS',
        message: '¡No rellenaste todos los campos!',
        buttons: ['ACEPTAR'],
      });
  
      await alert.present();
      return;
    }
    var usuario = {
      nombre: f.nombre,
      contraseña: f.contraseña
    }
    localStorage.setItem('usuario',JSON.stringify(usuario));
  }
}
