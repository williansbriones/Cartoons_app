import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestContrasenaPage } from './rest-contrasena.page';

describe('RestContrasenaPage', () => {
  let component: RestContrasenaPage;
  let fixture: ComponentFixture<RestContrasenaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RestContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
