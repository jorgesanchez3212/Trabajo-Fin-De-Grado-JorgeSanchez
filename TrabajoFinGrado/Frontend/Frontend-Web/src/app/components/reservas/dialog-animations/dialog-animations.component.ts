import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-animations',
  templateUrl: './dialog-animations.component.html',
  styleUrls: ['./dialog-animations.component.css']
})
export class DialogAnimationsComponent {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsComponent>) {}

  onConfirm(result: boolean): void {

    this.dialogRef.close(result);
  }
}
