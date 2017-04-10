import { Component, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, Response } from '@angular/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('file') FileInput: ElementRef;
  filePath = '';
  photoVisible = false;
  private filename = '';

  private backendUrl = 'http://localhost:8080';
  constructor(private http: Http, private sanitizer: DomSanitizer) {

  }

  testBackend() {
    const file = this.FileInput.nativeElement.files[0];
    this.filename = file.name;
    this.filePath = `./../../assets/bmp/${file.name}`;
    this.http.get(this.backendUrl + '/photo/test')
      .subscribe((response) => console.log(response));
  }

  sendFile() {
    const file = this.FileInput.nativeElement.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.filename = file.name;
    this.http.post(this.backendUrl + '/photo/upload', formData)
      .subscribe(
      (response) => {
        console.log(response);
        this.filePath = `./../../assets/bmp/${file.name}`;
        // this.photoLoaded();
      },
      (error) => console.log(error),
      () => this.photoLoaded()
      );
  }

  photoLoaded() {
    this.photoVisible = true;
  }

  filter() {
    this.photoVisible = false;
    const timeStamp = new Date().getTime();
    this.http.get(this.backendUrl + '/photo/filter')
      .subscribe((response) => {
        console.log(response);
        this.filePath = `./../../assets/bmp/${this.filename}?time=${timeStamp}`;
        this.photoLoaded();
      });
  }

}
