import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-amimations',
  templateUrl: './dialog-amimations.component.html',
  styleUrls: ['./dialog-amimations.component.css']
})
export class DialogAmimationsComponent {
  constructor(public dialogRef: MatDialogRef<DialogAmimationsComponent>) {}

  onConfirm(result: boolean): void {

    this.dialogRef.close(result);
  }
  

}
