import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
import { endpoints } from '../endpoints/endpoints';
import { ConfigService, Token } from './config.service';
import { AlertService } from './alert.service';

interface Photo {
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photo: Photo = null;

  constructor(private camera: Camera, private storage: Storage, private configService: ConfigService,
    private http: HTTP, private alertService: AlertService) { }

  async takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 512,
      targetHeight: 512
    };
    let uploadedFileName, downloadFile;
    await this.camera.getPicture(options).then((imageData) => {
      this.photo = {
        data: 'data:image/png;base64,' + imageData
      };
    }, (err) => {
     this.alertService.presentAlert('Camera issue: ' + err);
     console.log('Camera issue: ' + err);
    });

    uploadedFileName = await this.uploadPicture(this.photo.data);
    if (uploadedFileName) {
      downloadFile = await this.downloadPicture(uploadedFileName);
      this.photo = {
        data: downloadFile
      };
      return downloadFile;
    }

  }


  async uploadPicture(data: string) {
    let fileName;
    const token: Token = this.configService.getToken();
    this.http.useBasicAuth(token.user, token.password);
    const path = `${this.configService.getServerURL()}${endpoints.UPLOAD_PICTURE}`;
    const options: any = {
      method: 'post',
      data: { picture: data },
    };
    await this.http.sendRequest(path, options)
      .then(response => {
        console.log(response.data);
        fileName = response.data.file;
      })
      .catch(response => {
        this.alertService.presentAlert('Failed to upload picture');
        // alert(response.status);
        // alert(response.error);
        console.log(response);
      });
    return fileName;
  }

  async downloadPicture(fileName: string) {
    let downloadFile;
    const path = `${this.configService.getServerURL()}${endpoints.GET_PICTURE.replace('<image>', fileName)}`;

    const options: any = {
      method: 'get'
    };
    await this.http.sendRequest(path, options)
      .then(response => {
        console.log(response.data);
        downloadFile = response.data;
      })
      .catch(response => {
        this.alertService.presentAlert('Failed to download picture');
        console.log(response);
      });
    return downloadFile;
  }

}


