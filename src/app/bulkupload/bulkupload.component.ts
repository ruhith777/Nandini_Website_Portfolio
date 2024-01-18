import { Component } from '@angular/core';
import { Task1Service } from '../task1.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-bulkupload',
  templateUrl: './bulkupload.component.html',
  styleUrls: ['./bulkupload.component.css']
})
export class BulkuploadComponent {
  data: [];
  out: any[] = []
  out1: any[] = []
  uploading = false;
  uploadProgress = 0;
  // uploading = false;
  constructor(private test1: Task1Service) { }
  Bulkuploadofexcel(event: any) {
    debugger;
    const simulatedProgressInterval = setInterval(() => {
      this.uploadProgress += 25;
      if (this.uploadProgress >= 100) {
        clearInterval(simulatedProgressInterval);
        // Reset progress after completing upload
        this.uploadProgress = 0;
        // Set uploading to false when the upload is complete
        this.uploading = false;
      }
    }, 500);
    // Set uploading to true when starting the file upload
    this.uploading = true;
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      alert('Multiple files are not allowed');
      return;
    } else {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        wb.SheetNames.forEach(sheetName => {
          const ws: XLSX.WorkSheet = wb.Sheets[sheetName];
          let data = XLSX.utils.sheet_to_json(ws, { header: 1 });
          // Process data for each sheet
          console.log(`Data for sheet '${sheetName}':`, data);
          this.out.push(data);
        });
        console.log('out array ');
        console.log(this.out);
      };
      reader.readAsBinaryString(target.files[0]);
    }
  }
  submit() {
    debugger;
    // this.uploading = false;
    let iarray = this.out[0]
    for (let k = 0; k < this.out.length; k++) {
      let iarray = this.out[k];
      for (let j = 1; j < iarray.length; j++) {
        let iiarray = iarray[j];
        let obj = {
          id: iiarray[0],
          name: iiarray[1]
        };
        this.out1.push(obj);
      }
    } this.test1.uploadExcelData(this.out1).subscribe(
      data => {
        try {
          console.log('success' + data)
          Swal.fire({
            text: 'created succefully',
            icon: 'success'
          })
        } catch (error) {
          console.log(error);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}