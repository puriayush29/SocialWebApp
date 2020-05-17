import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class TokenProvider {

  constructor(private storage:Storage) {
    
  }
   setToken(token)
  {
    return this.storage.set('auth-token',token);
  }
 async getToken()
  {
    return await this.storage.get('auth-token');
  }
  deleteToken()
  {
    return this.storage.remove('auth-token');
  }
 async getPayload()
  {
    const token = await this.storage.get('auth-token');
    let payload;
    if(token) {
      payload = token.split('.')[1];
      payload = JSON.parse(window.atob(payload));
    }
    return payload.data;
  }
}
