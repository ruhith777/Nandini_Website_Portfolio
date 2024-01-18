import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QRCodeComponent implements OnInit{ 
  constructor(){}
  ngOnInit(): void {
  }
  @ViewChild('qrElement') qrElement: ElementRef;
  name = 'Afroze';
  elementType = 'canvas'; // Or 'url', 'svg', 'img'
  size = 256;
 
 
  downloadQRCode(qrElement){
    const link = document.createElement('a');
    link.href = qrElement.nativeElement.querySelector('img')?.src || qrElement.nativeElement.toDataURL();
    link.download = 'qrcode.png'; // Or desired filename
    link.click();
  }
}
