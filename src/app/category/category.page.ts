import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
  username: any;
  token: any;
  category: any; 
  slug: any;
  constructor(
    private authService: AuthenticationService,
    public apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) {
      this.loadToken();
      this.route.params.subscribe((params:any) => {
        this.slug = params.slug;
        this.getCategory();
      })
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

  getCategory() {
    this.apiService.getCategory(this.token, this.slug).subscribe((res: any) => {
      if (res.success == true) {
        this.category = res.data.category;
        console.log(this.category);
      } else {
        this.authService.notifikasi('Gagal Memuat Komik');
      }
    }, (error: any) => {
      this.authService.notifikasi('Gagal Memuat Komik');
    });
  }

}
