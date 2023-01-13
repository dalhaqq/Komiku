import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient, private alert: AlertController) { }

  apiURL() {
    return 'http://localhost:8080/';
  }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value)
  }

  postMethod(endpoint: any, data: any): Observable<any> {
    return this.http.post(this.apiURL() + endpoint, data);
  }

  public getData(key: string) {
    return localStorage.getItem(key)
  }

  public clearData() {
    localStorage.clear()
  }

  notifikasi(pesan: string) {
    return this.alert.create({
      header: 'Notifikasi',
      message: pesan,
      buttons: ['OK']
    }).then(res => {
      res.present()
    })
  }

  logout() {
    this.clearData()
  }
}
