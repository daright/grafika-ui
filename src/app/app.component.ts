import { BackendService } from './service/backend.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  filePath = '';

  constructor(private backendService: BackendService) {
    this.backendService.filePathEmitter
      .subscribe((response) => this.filePath = response);
  }
}
