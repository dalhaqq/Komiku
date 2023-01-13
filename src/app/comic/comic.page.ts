import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.page.html',
  styleUrls: ['./comic.page.scss'],
})
export class ComicPage implements OnInit {
  username: any;
  token: any;
  comic: any;
  slug: any;
  rating: any;
  comments: any[] = [];
  comment: any;
  is_favorite: any;
  constructor(
    private authService: AuthenticationService,
    public apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) {
      this.loadToken();
      this.route.params.subscribe((params:any) => {
        this.slug = params.slug;
        this.getComic();
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

  getComic() {
    this.apiService.getComic(this.token, this.slug).subscribe((res: any) => {
      console.log(res);
      if (res.success == true) {
        this.comic = res.data.comic;
        this.rating = this.comic.rating ?? 0;
        this.comments = this.comic.comments;
        this.is_favorite = this.comic.is_favorite;
      } else {
        this.authService.notifikasi('Gagal Memuat Komik');
      }
    }, (error: any) => {
      console.log(error);
      this.authService.notifikasi('Gagal Memuat Komik');
    });
  }

  rate() {
    this.apiService.rate(this.token, this.slug, this.rating).subscribe((res: any) => {
      console.log(res);
      if (res.success == true) {
        this.authService.notifikasi('Berhasil Memberi Rating');
        this.getComic();
      } else {
        this.authService.notifikasi('Gagal Memberi Rating');
      }
    }, (error: any) => {
      console.log(error);
      this.authService.notifikasi('Gagal Memberi Rating');
    });
  }

  favorite() {
    this.apiService.favorite(this.token, this.slug).subscribe((res: any) => {
      console.log(res);
      if (res.success == true) {
        this.authService.notifikasi('Berhasil Menambahkan Ke Favorit');
        this.is_favorite = res.data.is_favorite;
      } else {
        this.authService.notifikasi('Gagal Menambahkan Ke Favorit');
      }
    }, (error: any) => {
      console.log(error);
      this.authService.notifikasi('Gagal Menambahkan Ke Favorit');
    });
  }

  addComment() {
    this.apiService.comment(this.token, this.slug, this.comment).subscribe((res: any) => {
      console.log(res);
      if (res.success == true) {
        this.authService.notifikasi('Berhasil Memberi Komentar');
        this.comments = res.data.comments;
        this.comment = '';
      } else {
        this.authService.notifikasi('Gagal Memberi Komentar');
      }
    }, (error: any) => {
      console.log(error);
      this.authService.notifikasi('Gagal Memberi Komentar');
    });
  }

}
