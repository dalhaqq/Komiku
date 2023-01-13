import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Kategori', url: '/home', icon: 'options' },
    { title: 'Favoritku', url: '/favorites', icon: 'heart' },
    { title: 'Cari Komik', url: '/search', icon: 'search' },
  ];
  constructor(public router: Router, private authService: AuthenticationService) {
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  
}
