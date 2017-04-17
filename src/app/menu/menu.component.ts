import { FilterSelection } from './../model/filter-selection.model';
import { DefineCustomFilterDialogComponent } from './define-custom-filter/define-custom-filter-dialog.component';
import { AboutDialogComponent } from './about/about-dialog.component';
import { BackendService } from './../service/backend.service';
import { Http } from '@angular/http';
import { Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {


  @ViewChild('fileInput') fileInput: ElementRef;
  @Input('selectionSaved') selectionSaved: boolean;
  @Input('fileLoaded') fileLoaded = false;
  @Input('filterSelection') filterSelection: FilterSelection;
  @Output() selectionReset = new EventEmitter<boolean>();
  customMatrixSize;
  percent = 0;
  private filename = '';
  private customMatrix: number[];

  constructor(private backendService: BackendService, public dialog: MdDialog) { }

  sendFile(event) {
    const file = this.fileInput.nativeElement.files[0];
    if (file) {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      this.filename = file.name;
      this.backendService.sendFile(formData, file.name);
    }
  }

  selectFile() {
    this.fileInput.nativeElement.click();
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
    this.filter('findHorizontalLines');
  }
  findVerticalEdges() {
    this.filter('findVerticalLines');
  }
  highPass() {
    this.filter('highPass');
  }

  restoreOriginal() {
    this.backendService.restoreOriginal();
  }

  blend() {
    this.backendService.blend(this.percent);
  }

  filter(filterName: string) {
    if (!this.filterSelection) {
      this.filterSelection = {
        startX: 0,
        startY: 0,
        width: 0,
        height: 0,
      }
    }
    this.backendService.filter(filterName, this.filterSelection);
  }

  customFilter() {
    this.backendService.custom(this.customMatrix, this.filterSelection);
  }

  defineCustomFilter() {
    const dialog = this.dialog.open(DefineCustomFilterDialogComponent, {
      data: {
        customMatrix: this.customMatrix,
        customMatrixSize: this.customMatrixSize
      }
    });
    dialog.afterClosed()
      .subscribe(response => {
        if (response) {
          this.customMatrix = response.matrix;
          this.customMatrixSize = response.matrixSize;
        }
      });
  }

  showAboutDialog() {
    this.dialog.open(AboutDialogComponent);
  }

  resetSelection() {
    this.selectionReset.emit(true);
  }
}
