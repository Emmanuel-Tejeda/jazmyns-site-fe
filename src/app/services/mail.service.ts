import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient) { }

  mailApi: string = 'http://localhost:8080/mail/sendMail';

  sendEmail(form: any){
    console.log(form);
    return this.http.post(this.mailApi, form).pipe(
      
    );
  }



}
