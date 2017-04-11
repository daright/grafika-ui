import { Http } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class BackendService {

  filePathEmitter: EventEmitter<string>;
  private filePath = '';
  private fileName = '';

  private backendUrl = 'http://localhost:8080';
  constructor(private http: Http) {
    this.filePathEmitter = new EventEmitter();
  }

  sendFile(formData: FormData, fileName: string) {
    this.fileName = fileName;
    this.http.post(this.backendUrl + '/photo/upload', formData)
      .subscribe(
      (response) => {
        console.log(response);
        this.filePath = `./../../assets/bmp/${fileName}`;
        this.filePathEmitter.emit(this.filePath);
      },
      (error) => console.log(error)
      );
  }

  filter(filterName: string) {
    const timeStamp = new Date().getTime();
    this.http.get(`${this.backendUrl}/photo/${filterName}`)
      .subscribe((response) => {
        console.log(response);
        this.filePath = `./../../assets/bmp/${this.fileName}?time=${timeStamp}`;
        this.filePathEmitter.emit(this.filePath);
      });
  }
}
