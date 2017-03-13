import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    private backendUrl = 'http://localhost:8080';
    constructor(private http: Http) {

    }

    testBackend() {
        this.http.get(this.backendUrl + '/photo/test').subscribe((response) => console.log(response));
    }

}
