import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Token {
  user: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private serverURL: string;
  private token: Token;
  constructor(private storage: Storage) { }

  setServerURL(url: string) {
    this.serverURL = url;
    // this.storage.set('serverURL', url);
  }
  getServerURL() {
    return this.serverURL;
    // return this.storage.get('serverURL');
  }

  setToken(token: Token) {
    this.token = token;
    // this.storage.set('token',token);
  }

  getToken() {
    return this.token;
    // return this.storage.get('token');
  }
}
