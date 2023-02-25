import { LocalStorageKey } from 'src/constant/local-storage-key.constant';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { toBlob } from 'html-to-image';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-generate-qr-code',
  templateUrl: './generate-qr-code.component.html',
  styleUrls: ['./generate-qr-code.component.scss']
})
export class GenerateQrCodeComponent implements OnInit {
  @ViewChild('qrCodeCard') qrCodeCard: ElementRef;

  qrCode: string;
  restaurantName: string;

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    let restaurantId = this.localStorageService.get<string>(LocalStorageKey.restaurantId);
    this.restaurantName = this.localStorageService.get<string>(LocalStorageKey.restaurantName) ?? '';
    this.qrCode = `http://localhost:4200/reviewer/restaurant;restaurantId=${restaurantId}`
  }

  generateImage(){
    toBlob(this.qrCodeCard.nativeElement)
    .then(function (blob) {
      saveAs(blob ?? '', 'restaurant-qr-code.png');
    });
  }
}
