import { DefineCustomFilterDialogComponent } from './define-custom-filter-dialog.component';

import { BackendService } from './../service/backend.service';
import { Http } from '@angular/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {


  @ViewChild('file') FileInput: ElementRef;
  photoVisible = false;
  private filename = '';

  private backendUrl = 'http://localhost:8080';
  constructor(private backendService: BackendService, public dialog: MdDialog) { }

  sendFile() {
    const file = this.FileInput.nativeElement.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.filename = file.name;
    this.backendService.sendFile(formData, file.name);
  }

  box() {
    this.filter('box');
  }
  guassianBlur() {
    this.filter('gaussianBlur');
  }
  sharpen() {
    this.filter('sharpen');
  }
  laplacian() {
    this.filter('laplacian');
  }
  emboss() {
    this.filter('emboss');
  }
  sobelHorizontal() {
    this.filter('sobelHorizontal');
  }
  sobelVertical() {
    this.filter('sobelVertical');
  }
  motionBlur() {
    this.filter('motionBlur');
  }
  findHorizontalEdges() {
    this.filter('findHorizontalEdges');
  }
  findVerticalEdges() {
    this.filter('findVerticalEdges');
  }
  highPass() {
    this.filter('highPass');
  }

  filter(filterName: string) {
    this.backendService.filter(filterName);
  }

  defineCustomFilter() {
    let dialogRef = this.dialog.open(DefineCustomFilterDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // this.selectedOption = result;
    });
  }

}
