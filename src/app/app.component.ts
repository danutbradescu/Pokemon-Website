import { Component } from '@angular/core';
import { PokeApiService } from './poke-api.service';
import { faArrowsAltV, faWeightHanging, faRunning, faCrosshairs, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faArrowsAltV = faArrowsAltV;
  faWeightHanging = faWeightHanging;
  faRunning = faRunning;
  faCrosshairs = faCrosshairs;
  faShieldAlt = faShieldAlt;
  pokemon: any;
  randomPokemons: any[] = [];
  searchTerm: string = '';
  currentIndex: number = 0;

  constructor(private pokeApi: PokeApiService) { }

  ngOnInit() {
    this.getRandomPokemons();
  }

  getPokemonDetails(index: number) {
    this.pokemon = this.randomPokemons[index];
    this.currentIndex = index;
  }
// Obtinerea de pokemoni in lista 
  getRandomPokemons() {
    const randomIds = Array.from({ length: 10 }, () => Math.floor(Math.random() * 150) + 1);
    const observables = randomIds.map(id => this.pokeApi.getPokemon(id));
    // Apelarea metodei getPokemonList pentru a obtine detalii despre toti Pokemonii
    this.pokeApi.getPokemonList(observables).subscribe((data: any[]) => {
      this.randomPokemons = data;
    });
  }

  searchPokemon() {
    if (this.searchTerm.trim() !== '') {
      this.pokeApi.getPokemonByName(this.searchTerm.toLowerCase()).subscribe(
        (data: any) => {
          this.pokemon = data;
          this.currentIndex = -1; 
        },
        (error) => {
          console.log('Pokemonul nu a fost gasit');
          this.pokemon = null;
          alert('Pokemonul nu a fost găsit.');
        }
      );
    } else {
      this.pokemon = null;
    }
  }
//Butoanele de inainte si inapoi 
  navigateRandomPokemon(direction: string) {
    if (direction === 'previous') {
      this.currentIndex = (this.currentIndex - 1 + this.randomPokemons.length) % this.randomPokemons.length;
    } else if (direction === 'next') {
      this.currentIndex = (this.currentIndex + 1) % this.randomPokemons.length;
    }

    this.pokemon = this.randomPokemons[this.currentIndex];
  }

}