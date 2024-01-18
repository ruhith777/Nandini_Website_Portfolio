export class Vendor {
    id: number
company_Id: number
  companyName:string
  vendorName: string
  date:Date
  status:number
  comments:string
  vendorChild?:VendorChild []=[]
}

export class 
VendorChild{
    id:number
      vendor_Id?:number
      date?:Date
      companyName?:string
      vendorName?:string
      instrumentName:string
      instrumentId: string
}
