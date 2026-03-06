import { Component, OnInit  , ChangeDetectorRef} from '@angular/core';
import { Patient } from '../../services/patient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private cdr: ChangeDetectorRef
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
    this.patients = [...res.data]; // force new reference
    this.isLoading = false;
    this.cdr.detectChanges(); // trigger change detection
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

      // Add new patient to list immediately
      this.patients.unshift(res.data);

      this.patientForm.reset();
      this.showAddForm = false;
    });
}

  deletePatient(id: string): void {
    this.patientService.deletePatient(id)
      .subscribe(() => {
        this.loadPatients();
      });
  }

  filteredPatients(): any[] {
    if (!this.searchText) return this.patients;

    return this.patients.filter(patient =>
      patient.name?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
