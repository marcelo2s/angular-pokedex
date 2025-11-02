import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCatalogComponent } from './pokemon-catalog.component';

describe('PokemonCatalogComponent', () => {
  let component: PokemonCatalogComponent;
  let fixture: ComponentFixture<PokemonCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCatalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
