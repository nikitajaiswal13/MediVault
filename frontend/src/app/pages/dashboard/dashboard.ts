import { Component, OnInit } from '@angular/core';
import { Patient } from '../../services/patient';
import { Record } from '../../services/record';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  patients: any[] = [];
  records: any[] = [];

  totalPatients = 0;
  totalRecords = 0;
  recentUploads = 0;

  constructor(
    private patientService: Patient,
    private recordService: Record,
    private cdr: ChangeDetectorRef 
  ) {}


  ngOnInit(): void {
  this.refreshDashboard();

  window.addEventListener('focus', () => {
    this.refreshDashboard();
  });
}


  refreshDashboard() {
    this.loadPatients();
    this.loadRecords();
  }


  loadPatients() {
    this.patientService.getPatients().subscribe((res: any) => {

      const data = res.data?.data || res.data || [];

      this.patients = [...data];

      this.totalPatients = this.patients.length;
      this.cdr.detectChanges();

      console.log("Patients:", this.patients);

    });
  }

 
  loadRecords() {
    this.recordService.getAllRecords().subscribe((res: any) => {

      const data = res.data?.data || res.data || [];

      this.records = [...data];

      this.totalRecords = this.records.length;

      const now = new Date();

      this.recentUploads = this.records.filter((r: any) => {
        const recordDate = new Date(r.date);
        return (now.getTime() - recordDate.getTime()) < 7 * 24 * 60 * 60 * 1000;
      }).length;

      this.cdr.detectChanges();

      console.log("Records:", this.records);

    });
  }

}