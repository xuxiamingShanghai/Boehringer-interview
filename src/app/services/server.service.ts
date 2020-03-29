import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { endpoints } from '../endpoints/endpoints';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HTTP, private configService: ConfigService) { }

  checkServerStatus() {
    const path = `${this.configService.getServerURL()}${endpoints.BACKEND_STATUS}`;
    const options: any = {
      method: 'get'
    };
    return new Promise<any>((resolve, reject) => {
      this.http.sendRequest(path, options)
      .then(response => {
        if (response.data.status && response.data.status === 'ok') {
          resolve('OK');
        } else {
          reject('FAILED');
        }
      })
      .catch(response => {
        reject('FAILED');
      });

    });
  }
}
