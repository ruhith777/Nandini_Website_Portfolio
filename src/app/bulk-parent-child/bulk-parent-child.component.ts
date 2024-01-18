import { Component, OnInit } from '@angular/core';
import { Task1Service } from '../task1.service';
import * as XLSX from 'xlsx';
import { BulkChild } from '../BulkParent';
@Component({
  selector: 'app-bulk-parent-child',
  templateUrl: './bulk-parent-child.component.html',
  styleUrls: ['./bulk-parent-child.component.css']
})
export class BulkParentChildComponent implements OnInit {
  out: any[] = [];
  ch: BulkChild
  total:any[]=[];
  constructor(private _service:Task1Service) { }
  ngOnInit(): void {
  }
  BulkParentChild(event: any) {
    debugger;
    const target: DataTransfer = <DataTransfer>(event.target);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellDates: true });
      let i = 0;
      while (i < wb.SheetNames.length) {
        const wsname: string = wb.SheetNames[i]
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        let data = XLSX.utils.sheet_to_json(ws, { raw: true, defval: null });
        // Process data for each sheet
        console.log(`Data for sheet '${wsname}':`, data);
        this.out.push(data);
        i++
      }
      console.log('out array ');
      console.log(this.out)
    };
    reader.readAsBinaryString(target.files[0]);
  }
  Submit() {
    debugger
    for (let k = 0; k < this.out[0].length; k++) {
      let iarray = this.out[0][k];
      let parent = {
        id: iarray.id,
        name: iarray.name,
        bulkChild: []
      };
      for (let i = 0; i < this.out[1].length; i++) {
        if (parent.id == this.out[1][i].bulkParent_Id) {
          this.ch = {
            id: this.out[1][i].id,
            bulkParent_Id:this.out[1][i].bulkParent_Id,
            branch:this.out[1][i].branch
          };
          parent.bulkChild.push(this.ch);
        }
      }
      this.total.push(parent);
      console.log(this.total);
    }
      if(this.total.length>0){
        this._service.BulkuploadCreate(this.total).subscribe((data)=>{
          try{
            console.log('success' +data);
          }
          catch(e){
throw e;
          }
        })
      }
    }
  }