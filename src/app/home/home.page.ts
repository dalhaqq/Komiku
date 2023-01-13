import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: any;
  token: any;
  categories: any[] = [];

  constructor(
    private authService: AuthenticationService,
    private apiService: ApiService,
    private router: Router) {
      this.loadToken();
      this.getCategories();
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

  getCategories() {
    this.apiService.getCategories(this.token).subscribe((res: any) => {
      if (res.success == true) {
        this.categories = res.data.categories;
      } else {
        this.authService.notifikasi('Gagal Memuat Data Kategori');
      }
    }, (error: any) => {
      this.authService.notifikasi('Gagal Memuat Data Kategori');
    });
  }
}
