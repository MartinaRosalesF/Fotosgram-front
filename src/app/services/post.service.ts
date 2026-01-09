import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaPosts } from '../interfaces/interfaces';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PostService {

  paginaPosts = 0;

  constructor(private http: HttpClient) { }


  private ejecutarQuery<T>(query: string) {
    let queryUrl = apiUrl + query;
    return this.http.get<T>(queryUrl);
  }


  getPosts(pull: boolean = false) {
    if (pull) this.paginaPosts = 0;
    this.paginaPosts++;
    return this.ejecutarQuery<RespuestaPosts>(`/posts?pagina=${this.paginaPosts}`);
  }

}
