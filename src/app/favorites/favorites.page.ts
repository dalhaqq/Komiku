import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  username: any;
  token: any;
  favorites: any; 
  constructor(
    private authService: AuthenticationService,
    public apiService: ApiService,
    private router: Router) {
      this.loadToken();
      this.getFavorites();
    }

  ngOnInit() {
  }

  loadToken() {
    this.token = this.authService.getData('token');
    if (this.token != null) {
      this.username = this.authService.getData('username');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  getFavorites() {
    this.apiService.getFavorites(this.token).subscribe((res: any) => {
      if (res.success == true) {
        this.favorites = res.data.favorites;
      } else {
        this.authService.notifikasi('Gagal Memuat Komik Favorit');
      }
    }, (error: any) => {
      this.authService.notifikasi('Gagal Memuat Komik Favorit');
    });
  }

}
