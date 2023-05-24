import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdicionDatosPageRoutingModule } from './edicion-datos-routing.module';

import { EdicionDatosPage } from './edicion-datos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdicionDatosPageRoutingModule
  ],
  declarations: [EdicionDatosPage]
})
export class EdicionDatosPageModule {}
