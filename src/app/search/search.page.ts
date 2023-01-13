import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  username: any;
  token: any;
  results: any; 
  query: string = "";
  constructor(
    private authService: AuthenticationService,
    public apiService: ApiService,
    private router: Router) {
      this.loadToken();
      this.search();
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

  search() {
    this.apiService.search(this.token, this.query).subscribe((res: any) => {
      if (res.success == true) {
        this.results = res.data.comics;
      } else {
        this.authService.notifikasi('Gagal Memuat Hasil Pencarian');
      }
    }, (error: any) => {
      this.authService.notifikasi('Gagal Memuat Hasil Pencarian');
    });
  }

}
