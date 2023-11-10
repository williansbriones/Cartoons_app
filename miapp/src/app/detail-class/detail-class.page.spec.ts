import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailClassPage } from './detail-class.page';

describe('DetailClassPage', () => {
  let component: DetailClassPage;
  let fixture: ComponentFixture<DetailClassPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
