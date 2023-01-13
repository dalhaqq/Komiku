import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private authService: AuthenticationService, private router: Router) { }
  canLoad(): boolean {
    if (this.authService.getData('token')) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
