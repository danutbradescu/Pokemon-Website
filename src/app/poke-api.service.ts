import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  //constructorul de http
  constructor(private http: HttpClient) { }

  
  getPokemon(id: number): Observable<any> {
    const url = `${this.apiUrl}/pokemon/${id}`;
    return this.http.get(url);
  }

  getPokemonList(observables: Observable<any>[]): Observable<any[]> {
    return forkJoin(observables);
  }

  getPokemonByName(name: string): Observable<any> {
    const url = `${this.apiUrl}/pokemon/${name}`;
    return this.http.get(url);
  }
}