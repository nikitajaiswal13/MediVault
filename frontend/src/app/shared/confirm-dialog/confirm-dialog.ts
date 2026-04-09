import { Component  , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: false,
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
    // message = 'Are you sure?';

    constructor(public dialogRef: MatDialogRef<ConfirmDialog> , 
        @Inject(MAT_DIALOG_DATA) public data: any 
    ) { }


    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
