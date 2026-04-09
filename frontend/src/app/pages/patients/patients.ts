import { Component, OnInit  , ChangeDetectorRef} from '@angular/core';
import { Patient } from '../../services/patient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-patients',
  standalone: false,
  templateUrl: './patients.html',
  styleUrl: './patients.css',
})
export class Patients implements OnInit {

  maxDate = new Date();
  patients: any[] = [];
  searchText: string = '';
  isLoading: boolean = false;
  relations: string[] = [
  'Self',
  'Father',
  'Mother',
  'Friend',
  'Brother',
  'Sister',
  'Spouse',
  'Son',
  'Daughter',
  'Other'
];

  showAddForm: boolean = false;
  patientForm: FormGroup;

  constructor(
    private patientService: Patient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      relation: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPatients();
  }


  loadPatients(): void {
  this.patientService.getPatients().subscribe((res: any) => {
    this.patients = [...res.data];
    this.isLoading = false;
    this.cdr.detectChanges(); 
  });
}

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

 addPatient(): void {
  if (this.patientForm.invalid) {
    this.patientForm.markAllAsTouched();
    return;
  }

  this.patientService.createPatient(this.patientForm.value)
    .subscribe((res: any) => {

      this.patients.unshift(res.data);

      this.patientForm.reset();
      this.showAddForm = false;
    });
}


  deletePatient(id: string): void {

  const dialogRef = this.dialog.open(ConfirmDialog, {
    width: '380px',
    data: {
      message: 'Are you sure you want to delete this patient?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.patientService.deletePatient(id).subscribe(() => {
        this.patients = this.patients.filter(p => p._id !== id);
      });
    }
  });
}

  filteredPatients(): any[] {
    if (!this.searchText) return this.patients;

    return this.patients.filter(patient =>
      patient.name?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
