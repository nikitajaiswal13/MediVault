import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Patient {
  
  private baseUrl = 'https://medivault-dhav.onrender.com/api/v1/patients';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getPatients() {
    return this.http.get(this.baseUrl, { headers: this.getHeaders() });
  }

  createPatient(data: any) {
    return this.http.post(this.baseUrl, data, { headers: this.getHeaders() });
  }

  deletePatient(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

    getPatientById(id: string) {
  return this.http.get(`https://medivault-dhav.onrender.com/api/v1/patients/${id}`, {
    headers: this.getHeaders()
  });
}
}
