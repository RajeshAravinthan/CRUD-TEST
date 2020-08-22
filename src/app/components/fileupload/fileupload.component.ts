import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { apiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css'],
})
export class FileuploadComponent implements OnInit {
  uploadSuccess: boolean;
  data: any = [];
  fileToUpload: File = null;

  constructor(
    private sanitizer: DomSanitizer,
    private api: apiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('login') == 'true') {
      this.api.loggedIn = true;
    } else {
      this.api.loggedIn = false;
      this.router.navigate(['login']);
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  upload(files: File[]) {
    this.uploadAndProgress(files);
  }

  uploadAndProgress(files: File[]) {
    var formData = new FormData();
    Array.from(files).forEach((f) => formData.append('file', f));

    const file = files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      sessionStorage.setItem('file', reader.result.toString());
    };

    var temp = {
      name: files[0].name,
      email: 'abc@gmail.com',
      file: this.getSantizeUrl(sessionStorage.getItem('file')),
    };
    sessionStorage.setItem('data', temp.toString());

    this.data.push(temp);
  }

  public getSantizeUrl(url: string) {
    return url;
  }
}
