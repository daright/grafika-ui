import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-define-custom-filter-dialog',
  templateUrl: './define-custom-filter-dialog.component.html',
  styleUrls: ['./define-custom-filter-dialog.component.scss']
})
export class DefineCustomFilterDialogComponent {

  matrixSize;
  matrix: Array<number>;

  constructor(public dialogRef: MdDialogRef<DefineCustomFilterDialogComponent>) {
    if (this.dialogRef.config.data.customMatrixSize) {
      this.matrixSize = this.dialogRef.config.data.customMatrixSize;
      this.matrix = this.dialogRef.config.data.customMatrix;
    } else {
      this.reset();
    }
  }

  matrixSizeChange() {
    this.matrix = new Array(this.matrixSize * this.matrixSize);
    this.matrix.fill(0);
  }

  submit() {
    const matrixProperties = {
      matrixSize: this.matrixSize,
      matrix: this.matrix
    }
    this.dialogRef.close(matrixProperties);
  }

  reset() {
    this.matrixSize = 3;
    this.matrixSizeChange();
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
