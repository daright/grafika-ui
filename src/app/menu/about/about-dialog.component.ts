import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-about-dialog.component',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.scss']
})
export class AboutDialogComponent {

  constructor(public dialogRef: MdDialogRef<AboutDialogComponent>) {
  }
}
