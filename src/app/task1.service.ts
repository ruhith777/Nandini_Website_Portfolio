import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Task1Service {
  url: string = 'https://localhost:44302/api'
  constructor(private http: HttpClient) { }
  CreateOrUpdate(obj: any) {
    debugger
    return this.http.post(this.url + '/CurrencyMaster/Create', obj).pipe(tap(this.extractData), catchError(this.handleError<any>(' getAll Failed')));
  }
  onGet() {
    return this.http.get(this.url + '/CurrencyMaster/List').pipe(map(this.extractData), catchError(this.handleError<any>(' getAll Failed')));
  }
  getById(sNo: number) {
    debugger
    //https://localhost:44302/api/CurrencyMaster/details?id=1
    return this.http.get(this.url + '/CurrencyMaster/details?id=' + sNo).pipe(map(this.extractData), catchError(this.handleError<any>(' getById Failed')));
  }
  AlreadyExist(obj:any){
    //https://localhost:44302/api/CurrencyMaster/AlreadyExist
    return this.http.post(this.url + '/CurrencyMaster/AlreadyExist', obj).pipe(tap(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

  }
  getAll(){
    return this.http.get(this.url + '/MasterCurrency/GetAll').pipe(map(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

  }
  getAllCurrency(){
    return this.http.get(this.url + '/MasterCurrency/GetAllCurrency').pipe(map(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

  }
  CreateUpdate(obj:any){
    debugger
    return this.http.post(this.url + '/MasterCurrency/Create', obj).pipe(tap(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

  }
  getDetailsById(id:number){
    return this.http.get(this.url + '/MasterCurrency/details?id=' + id).pipe(map(this.extractData), catchError(this.handleError<any>(' getById Failed')));

  }
  AlreadyExisted(obj:any)
{
  
  debugger
  return this.http.post(this.url + '/MasterCurrency/AlreadyExisted', obj).pipe(tap(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

}  
//https://localhost:44302/api/CountryCurrency/Create
getAllData(){
  return this.http.get(this.url + '/CountryCurrency/GetAll').pipe(map(this.extractData), catchError(this.handleError<any>(' getAll Failed')));
}
getAllMasterCurrency(){
  return this.http.get(this.url + '/CountryCurrency/GetAllCurrency').pipe(map(this.extractData), catchError(this.handleError<any>(' getAll Failed')));
}
CreateAndUpdate(obj:any){
  debugger
  return this.http.post(this.url + '/CountryCurrency/Create', obj).pipe(tap(this.extractData), catchError(this.handleError<any>(' getAll Failed')));
}
getDetails(id:number){
  return this.http.get(this.url + '/CountryCurrency/details?id=' + id).pipe(map(this.extractData), catchError(this.handleError<any>(' getById Failed')));
}
AlreadyExists(obj:any)
{
debugger
return this.http.post(this.url + '/CountryCurrency/AlreadyExisted', obj).pipe(tap(this.extractData), catchError(this.handleError<any>(' getAll Failed')));
}  
createUpdate(obj:any){
  debugger
  return this.http.post(this.url + '/Company/Create', obj).pipe(tap(this.extractData), catchError(this.handleError<any>(' getAll Failed')));
}
getCompanyList(){
  return this.http.get(this.url + '/Company/List').pipe(map(this.extractData), catchError(this.handleError<any>(' getAll Failed')));
}
getCompanyDetails(id:number){
  return this.http.get(this.url + '/Company/details?id=' + id).pipe(map(this.extractData), catchError(this.handleError<any>(' getById Failed')));
}
AlreadyExistedd(obj:any){
  return this.http.post(this.url + '/Company/AlreadyExistedd', obj).pipe(tap(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

}
CreateANDUpdate(obj:any){
  return this.http.post(this.url + '/CompanyDropDown/Create', obj).pipe(tap(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

}
getList(){
  return this.http.get(this.url + '/CompanyDropDown/GetAll').pipe(map(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

}
getOldList(){
    return this.http.get(this.url + '/CompanyDropDown/GetAllCurrency').pipe(map(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

}
GetCompanyDetails(id:number){
  return this.http.get(this.url + '/CompanyDropDown/details?id=' + id).pipe(map(this.extractData), catchError(this.handleError<any>(' getById Failed')));
}
AlreadyExistss(obj:any){
  debugger
  return this.http.post(this.url + '/CompanyDropDown/AlreadyExisted', obj).pipe(tap(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

}
organizationCreate(obj:any){
  debugger
  return this.http.post(this.url + '/Organization/CreateorUpdate', obj).pipe(tap(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

}
organizationList(){
  debugger
  return this.http.get(this.url + '/Organization/GetAllDetails').pipe(map(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

}
organizationDetails(id:number){
  debugger
  return this.http.get(this.url + '/Organization/GetDetailsById?id=' + id).pipe(map(this.extractData), catchError(this.handleError<any>(' getById Failed')));

}
AlreadyExistOrg(obj:any){
  debugger
  return this.http.post(this.url + '/Organization/isAlreadyExisted', obj).pipe(tap(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

}
vendorCreate(obj:any){
  debugger
  return this.http.post(this.url + '/Vendor/CreateorUpdate', obj).pipe(tap(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

}
vendorList(){
  debugger
  return this.http.get(this.url + '/Vendor/GetAllDetails').pipe(map(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

}
vendorChildList(){
  debugger
  return this.http.get(this.url + '/Vendor/GetAllDetailsChild').pipe(map(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

}
vendorDetails(id:number){
  debugger
  return this.http.get(this.url + '/Vendor/GetDetailsById?id=' + id).pipe(map(this.extractData), catchError(this.handleError<any>(' getById Failed')));

}
AlreadyExistVendor(obj:any){
  debugger
  return this.http.post(this.url + '/Vendor/isAlreadyExisted', obj).pipe(tap(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

}
DashboardCreate(obj:any){
  debugger
  return this.http.post(this.url + '/Dashboard/CreateorUpdate', obj).pipe(tap(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

}
DashboardList(){
  debugger
  return this.http.get(this.url + '/Dashboard/GetAllDetails').pipe(map(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

}
DashboardTabList(){
  debugger
  return this.http.get(this.url + '/Dashboard/GetAllDetails11').pipe(map(this.extractData), catchError(this.handleError<any>(' getAll Failed')));

}
DashboardDetails(id:number){
  debugger
  return this.http.get(this.url + '/Dashboard/GetDetailsById?id=' + id).pipe(map(this.extractData), catchError(this.handleError<any>(' getById Failed')));

}
DashboardAlreadyExist(obj:any){
  debugger
  return this.http.post(this.url + '/Dashboard/AlreadyExist', obj).pipe(tap(this.extractData), catchError(this.handleError<any>(' getAll Failed')));
  //https://localhost:44302/api/Dashboard/AlreadyExist
  
}
path: string = "./assets/audreelogo.jpeg.jpg" 
  extractData(res: Response) {
    let body = res;
    console.log(body);
    return body || {};
  }
  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      console.error(error);

      console.log('${operation}failed:${error.message}');

      return of(result as T);
    };
  }
}
