import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { AlertController, NavController } from '@ionic/angular';

import{
  FormGroup,
  FormControl,
  Validator,
  FormBuilder,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  formularioLogin: FormGroup;
   

  constructor(public fb: FormBuilder, public alertController: AlertController, public navCtr: NavController) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'contraseña': new FormControl("",Validators.required)
    })
   }

  ngOnInit() {
  }
  async ingresar(){
    var f = this.formularioLogin.value;
    var usuario = JSON.parse(localStorage.getItem('usuario')!);
    if(usuario.nombre == f.nombre && usuario.contraseña == f.contraseña){
      console.log('ingresado');
      localStorage.getItem('ingresado');
      this.navCtr.navigateRoot('inicio');
    }else{
      const alert = await this.alertController.create({
        header: 'DATOS INCORRECTOS',
        message: 'El usuario y/o contraseña estan incorrectos',
        buttons: ['ACEPTAR'],
      });
      await alert.present();
      return;
    }
  }
}
