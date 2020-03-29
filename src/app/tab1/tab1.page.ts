import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { ServerService } from '../services/server.service';
import { ScannerService } from '../services/scanner.service';

import { PhotoService } from '../services/photo.service';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  step: Number = 1;
  scannedCode = '';

  serverStatus: Boolean = false;
  statusChecked: Boolean = false;

  photo = null;
  constructor(
    // private barcodeScanner: BarcodeScanner,
    private scannerService: ScannerService,
    private configService: ConfigService,
    private serverService: ServerService,
    public photoService: PhotoService) {}

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
  ngOnInit() {

  }

}
