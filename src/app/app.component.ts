import { FilterSelection } from './model/filter-selection.model';
import { BackendService } from './service/backend.service';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('image') image: ElementRef;
  filePath = '';
  fileLoaded = false;
  selected;
  selectionSaved;
  selectionTop;
  selectionLeft;
  selectionWidth;
  selectionHeight;
  loading = false;
  filterSelection: FilterSelection;
  private maxSelectionWidth;
  private maxSelectionHeight;

  constructor(private backendService: BackendService) { }

  ngAfterViewInit() {
    this.backendService.filePathEmitter
      .subscribe(response => {
          this.filePath = response;
      });

    this.backendService.loadingEmmiter
      .subscribe(response => {
              this.fileLoaded = !response;
        this.loading = response;
      });
    this.resetSelection();
  }

  loaded() {
      this.fileLoaded = true;
      this.loading = false;
  }

  beginSelection(event: MouseEvent) {
    this.resetSelection();
    this.selected = true;
    this.selectionTop = event.pageY;
    this.selectionLeft = event.pageX;
    this.maxSelectionWidth = this.image.nativeElement.width - (this.selectionLeft - this.image.nativeElement.offsetLeft);
    this.maxSelectionHeight = this.image.nativeElement.height - (this.selectionTop - this.image.nativeElement.offsetTop);
  }

  endSelection(event: MouseEvent) {
    if (this.image) {
      const startX = this.selectionLeft - this.image.nativeElement.offsetLeft;
      const startY = this.selectionTop - this.image.nativeElement.offsetTop;
      this.filterSelection = {
        startX: startX,
        startY: startY,
        width: this.selectionWidth + startX,
        height: this.selectionHeight + startY
      };
      this.selectionSaved = true;
    }
  }

  selection(event: MouseEvent) {
    if (!this.selectionSaved) {
      const widthCandidate = event.pageX - this.selectionLeft;
      const heightCandidate = event.pageY - this.selectionTop;
      this.selectionWidth = widthCandidate > this.maxSelectionWidth ? this.maxSelectionWidth : widthCandidate;
      this.selectionHeight = heightCandidate > this.maxSelectionHeight ? this.maxSelectionHeight : heightCandidate;
    }
  }

  resetSelection() {
    this.selectionTop = 0;
    this.selectionLeft = 0;
    this.selectionWidth = 0;
    this.selectionHeight = 0;
    this.selectionSaved = false;
    this.selected = false;
    this.filterSelection = null;
  }

  reset(event) {
    if (event.target.tagName !== 'FIGURE') {
      this.resetSelection();
    }
  }
}
