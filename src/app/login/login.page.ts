import { AuthenticationService } from '../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: any;
  password: any;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }
  ngOnInit() { }
  prosesLogin(): void {
    if (this.username != null && this.password != null) {
      const data = {
        username: this.username,
        password: this.password,
      };
      this.authService.postMethod('login.php', data).subscribe({
        next: (hasil) => {
          console.log(hasil);
          if (hasil.success == true) {
            this.authService.saveData('token', hasil.data.token);
            this.authService.saveData('username', hasil.data.username);
            this.username = null;
            this.password = null;
            this.router.navigateByUrl('/home');
          } else {
            this.authService.notifikasi('Username dan Password Salah');
          }
        },
        error: (e) => {
          console.log(e);
          this.authService.notifikasi("Gagal menghubungkan, silahkan cek koneksi internet Anda");
        }
      });
    } else {
    this.authService.notifikasi('Username dan Password Tidak Boleh Kosong');
  }
 }
}
