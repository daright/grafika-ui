import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-define-custom-filter-dialog',
  templateUrl: './define-custom-filter-dialog.component.html',
  styleUrls: ['./define-custom-filter-dialog.component.scss']
})
export class DefineCustomFilterDialogComponent {

  matrixSize;
  matrix;

  constructor(public dialogRef: MdDialogRef<DefineCustomFilterDialogComponent>) {
    this.matrixSize = 0;
  }

  matrixSizeChange() {
    console.log('changes');
    this.matrix = new Array(this.matrixSize * this.matrixSize);
  }
}
