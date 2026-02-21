import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Record } from '../../services/record';

@Component({
  selector: 'app-records',
  standalone: false,
  templateUrl: './records.html',
  styleUrl: './records.css',
})
export class Records implements OnInit {
    records: any[] = [];
  patientId!: string;

  recordType = '';
  hospital = '';
  date = '';
  selectedFile!: File;

  constructor(
    private route: ActivatedRoute,
    private recordService: Record
  ) {}

  ngOnInit() {
    this.patientId = this.route.snapshot.paramMap.get('patientId')!;
    this.loadRecords();
  }

  loadRecords() {
    this.recordService.getRecords(this.patientId)
      .subscribe((res: any) => {
        this.records = res.data;
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadRecord() {
    const formData = new FormData();
    formData.append('recordType', this.recordType);
    formData.append('hospital', this.hospital);
    formData.append('date', this.date);
    formData.append('file', this.selectedFile);

    this.recordService.createRecord(this.patientId, formData)
      .subscribe(() => {
        this.recordType = '';
        this.hospital = '';
        this.date = '';
        this.loadRecords();
      });
  }

  deleteRecord(id: string) {
    this.recordService.deleteRecord(id)
      .subscribe(() => {
        this.loadRecords();
      });
  }
}
