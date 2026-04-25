import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddRecordDialog } from '../../components/add-record-dialog/add-record-dialog';
import { Record } from '../../services/record';
  import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';


@Component({
  selector: 'app-records',
  standalone: false,
  templateUrl: './records.html',
  styleUrl: './records.css',
})
export class Records implements OnInit {

  patientId!: string;
  records: any[] = [];
  isLoading = false;

  isPatientView = false;

  constructor(
    private route: ActivatedRoute,
    private recordService: Record,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {


    this.route.paramMap.subscribe(params => {

      const id = params.get('patientId');
      // console.log("Patient ID:", id);

      if (id) {
        this.patientId = id;
        this.isPatientView = true;
        this.loadRecordsByPatient();
      } else {
        this.isPatientView = false;
        this.loadAllRecords();
      }

    });

  }


  loadRecordsByPatient(): void {

    this.isLoading = true;

    this.recordService.getRecordsByPatient(this.patientId)
      .subscribe({
        next: (res: any) => {
          this.records = [...res.data];
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.isLoading = false;
        }
      });

  }


  loadAllRecords(): void {

    console.log("Loading ALL records...");

    this.isLoading = true;

    this.recordService.getAllRecords()
      .subscribe({
        next: (res: any) => {
          console.log("ALL RECORDS RESPONSE:", res);

          this.records = [...res.data];
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log("ALL RECORDS ERROR:", err);
          this.isLoading = false;
        }
      });
  }


  openUploadDialog(): void {

    if (!this.isPatientView) return; //block upload in all-records view

    const dialogRef = this.dialog.open(AddRecordDialog, {
      width: '500px',
      data: { patientId: this.patientId }
    });

    dialogRef.afterClosed().subscribe(success => {

      if (!success) return;

      if (this.isPatientView) {
        this.loadRecordsByPatient();
      } else {
        this.loadAllRecords();
      }

    });
  }


deleteRecord(id: string): void {

  const dialogRef = this.dialog.open(ConfirmDialog, {
    width: '350px',
    data: {
      message: 'Are you sure you want to delete this record?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.recordService.deleteRecord(id).subscribe(() => {
        this.records = this.records.filter(r => r._id !== id);
      });
    }
  });
}
}