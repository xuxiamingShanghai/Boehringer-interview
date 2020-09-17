import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { ServerService } from '../services/server.service';
import { ScannerService } from '../services/scanner.service';

import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  step: Number = 1;
  scannedCode = '';

  serverStatus: Boolean = false;
  statusChecked: Boolean = false;

  photo = null;
  constructor(
      private scannerService: ScannerService,
      private configService: ConfigService,
      private serverService: ServerService,
      public photoService: PhotoService
  ) {}

  async getCode() {
    this.scannedCode = await this.scannerService.scanCode();
    if (this.scannedCode) {
      this.parseCode();
      this.step = 2;
    }

  }

  parseCode() {
    const codeArray: Array<string> = this.scannedCode.split(';');
    this.configService.setServerURL(codeArray[0].split(':')[1] + ':' + codeArray[0].split(':')[2]);
    this.configService.setToken({user: codeArray[1].split(':')[1], password: codeArray[2].split(':')[1]});

  }

  checkServer() {
    this.serverService.checkServerStatus().then(
        msg => {
          this.serverStatus = true;
          this.statusChecked = true;
        },
        error => {
          this.serverStatus = false;
          this.statusChecked = true;
        }
    );

  }

  async takePhoto() {
    this.photo = await this.photoService.takePicture();
    if (this.photo) {
      this.step = 3;
    }
  }

  checkStep(step: number) {
    return this.step === step;
  }
  ngOnInit() {

  }

}
