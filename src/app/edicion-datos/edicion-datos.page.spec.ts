import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdicionDatosPage } from './edicion-datos.page';

describe('EdicionDatosPage', () => {
  let component: EdicionDatosPage;
  let fixture: ComponentFixture<EdicionDatosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EdicionDatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
