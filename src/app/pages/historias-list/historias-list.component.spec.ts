import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriasListComponent } from './historias-list.component';

describe('HistoriasListComponent', () => {
  let component: HistoriasListComponent;
  let fixture: ComponentFixture<HistoriasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
