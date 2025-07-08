import { TestBed } from '@angular/core/testing';

import { UsuarioProyectoService } from './usuario-proyecto.service';

describe('UsuarioProyectoService', () => {
  let service: UsuarioProyectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioProyectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
