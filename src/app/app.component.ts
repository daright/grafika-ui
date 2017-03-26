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

    private backendUrl = 'http://localhost:8080';
    constructor(private http: Http, private sanitizer: DomSanitizer) {

    }

    testBackend() {
        const file = this.FileInput.nativeElement.files[0];
        this.filePath = `./../../assets/bmp/${file.name}`;
        // this.http.get(this.backendUrl + '/photo/test')
        //     .subscribe((response) => console.log(response));
    }

    sendFile() {
        const file = this.FileInput.nativeElement.files[0];
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        console.log(file);
        console.log(formData);
        this.http.post(this.backendUrl + '/photo/upload', formData)
            .subscribe(
            (response) => this.filePath = `./../../assets/bmp/${file.name}`,
            (error) => console.log(error)
            );
    }

    filter() {
        this.http.get(this.backendUrl + '/photo/filter')
            .subscribe((response) => console.log(response));
    }

}
