import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(public http: HttpClient) { }


  
//   subscribe( res => {
//     sessionStorage.setItem('token', res.token);
//     sessionStorage.setItem('userId', res.userId);
//  })

}
