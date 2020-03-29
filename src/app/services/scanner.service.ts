import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertService } from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  constructor(private barcodeScanner: BarcodeScanner,
    private alertService: AlertService) { }

  async scanCode() {
    let scannedCode;
    await this.barcodeScanner.scan().then(barcodeData => {
      scannedCode = barcodeData.text;
    }).catch(err => {
      this.alertService.presentAlert('Scanner err:' + err);
    });
    return scannedCode;
  }
}
