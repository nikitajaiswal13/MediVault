import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Record } from '../../services/record';

@Component({
  selector: 'app-add-record-dialog',
  standalone: false,
  templateUrl: './add-record-dialog.html',
  styleUrl: './add-record-dialog.css',
})
export class AddRecordDialog {

  recordForm: FormGroup;
  selectedFile!: File;
  isLoading = false;
  maxDate = new Date();

  constructor(
    private fb: FormBuilder,
    private recordService: Record,
    private dialogRef: MatDialogRef<AddRecordDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { patientId: string }
  ) {

    this.recordForm = this.fb.group({
      recordType: ['', Validators.required],
      hospital: ['', Validators.required],
      date: ['', Validators.required],
      file: [null, Validators.required]
    });

  }

  // ===============================
  // FILE SELECT
  // ===============================
  onFileSelect(event: any): void {

    const file = event.target.files[0];

    if (!file) return;

    this.selectedFile = file;

    // update form control
    this.recordForm.patchValue({
      file: file
    });

    this.recordForm.get('file')?.updateValueAndValidity();

  }

  // ===============================
  // SUBMIT
  // ===============================
  submit(): void {

    if (this.recordForm.invalid) {
      this.recordForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('recordType', this.recordForm.value.recordType);
    formData.append('hospital', this.recordForm.value.hospital);
    formData.append('date', this.recordForm.value.date);
    formData.append('file', this.selectedFile);

    this.recordService.createRecord(this.data.patientId, formData)
      .subscribe({
        next: (res: any) => {

          this.isLoading = false;

          // return newly created record
          this.dialogRef.close(res.data);

        },
        error: () => {
          this.isLoading = false;
        }
      });

  }

}