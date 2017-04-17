import { FilterSelection } from './../model/filter-selection.model';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class BackendService {

  filePathEmitter = new EventEmitter<string>();
  loadingEmmiter = new EventEmitter<boolean>();
  private filePath = '';
  private fileName = '';

  private backendUrl = 'http://localhost:8080';
  constructor(private http: Http) { }

  sendFile(formData: FormData, fileName: string) {
    this.loadingEmmiter.emit(true);
    this.fileName = fileName;
    this.http.post(this.backendUrl + '/photo/upload', formData)
      .subscribe(response => {
        this.filePath = `./../../assets/bmp/${fileName}`;
        this.filePathEmitter.emit(this.filePath);
      },
      (error) => console.log(error)
      );
  }

  filter(filterName: string, filterSelection: FilterSelection) {
    this.loadingEmmiter.emit(true);
    const timeStamp = new Date().getTime();
    this.http.post(`${this.backendUrl}/photo/${filterName}`, filterSelection)
      .subscribe(response => {
        this.filePath = `./../../assets/bmp/${this.fileName}?time=${timeStamp}`;
        this.filePathEmitter.emit(this.filePath);
      });
  }

  custom(customFilter: number[], filterSelection: FilterSelection) {
    const customFilterOptions = {
      customFilter: customFilter,
      filterSelection: filterSelection
    }
    this.loadingEmmiter.emit(true);
    const timeStamp = new Date().getTime();
    this.http.post(`${this.backendUrl}/photo/custom`, customFilterOptions)
      .subscribe(response => {
        this.filePath = `./../../assets/bmp/${this.fileName}?time=${timeStamp}`;
        this.filePathEmitter.emit(this.filePath);
      });
  }

  restoreOriginal() {
    this.loadingEmmiter.emit(true);
    const timeStamp = new Date().getTime();
    this.http.get(`${this.backendUrl}/photo/reset`)
      .subscribe(response => {
        this.filePath = `./../../assets/bmp/${this.fileName}?time=${timeStamp}`;
        this.filePathEmitter.emit(this.filePath);
      });
  }

  blend(percent: number) {
    this.loadingEmmiter.emit(true);
    const timeStamp = new Date().getTime();
    this.http.get(`${this.backendUrl}/photo/blend/${percent}`)
      .subscribe(response => {
        this.filePath = `./../../assets/bmp/${this.fileName}?time=${timeStamp}`;
        this.filePathEmitter.emit(this.filePath);
      });
  }
}
