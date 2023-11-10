import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocenteclasesPage } from './docenteclases.page';

describe('DocenteclasesPage', () => {
  let component: DocenteclasesPage;
  let fixture: ComponentFixture<DocenteclasesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DocenteclasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
