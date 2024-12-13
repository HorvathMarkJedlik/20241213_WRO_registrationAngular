import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationModel } from '../models/registration.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3000/registrations';

  getRegistrations() {
    return this.http.get<RegistrationModel[]>(this.url)
  }

  addRegistration(reg: RegistrationModel): Observable<RegistrationModel> {
    return this.http.post<RegistrationModel>(this.url, reg );

  }

  modifyRegistration(reg: RegistrationModel) {
    return this.http.put<RegistrationModel>(`${this.url}/${reg.id}`, reg);
  }

  deleteRegistration(id: string) {
    return this.http.delete<RegistrationModel>(`${this.url}/${id}`);
  }
}
