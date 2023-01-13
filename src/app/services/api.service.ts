import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  apiUrl() {
    return 'http://localhost:8080/';
  }

  getCategories(token: string) {
    return this.http.post(this.apiUrl() + 'categories.php', {token})
  }

  getCategory(token: string, slug: string) {
    return this.http.post(this.apiUrl() + `category.php?slug=${slug}`, {token})
  }

  getComic(token: string, slug: string) {
    return this.http.post(this.apiUrl() + `comic.php?slug=${slug}`, {token})
  }

  comment(token: string, slug: string, comment: string) {
    return this.http.post(this.apiUrl() + `comment_comic.php?slug=${slug}`, {token, comment})
  }

  favorite(token: string, slug: string) {
    return this.http.post(this.apiUrl() + `favorite_comic.php?slug=${slug}`, {token})
  }

  getFavorites(token: string) {
    return this.http.post(this.apiUrl() + 'favorites.php', {token})
  }

  rate(token: string, slug: string, rating: number) {
    return this.http.post(this.apiUrl() + `rate_comic.php?slug=${slug}`, {token, rating})
  }

  search(token: string, query: string) {
    return this.http.post(this.apiUrl() + `search.php?query=${query}`, {token})
  }
}
