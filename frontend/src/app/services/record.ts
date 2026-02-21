import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Record {
private baseUrl = 'http://localhost:3000/api/v1/records';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getRecords(patientId: string) {
    return this.http.get(`${this.baseUrl}/patients/${patientId}`, {
      headers: this.getHeaders()
    });
  }

  createRecord(patientId: string, formData: FormData) {
    return this.http.post(`${this.baseUrl}/patients/${patientId}`, formData, {
      headers: this.getHeaders()
    });
  }

  deleteRecord(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
