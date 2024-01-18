export class Organization {
    id: number
company_Id: number
  companyName:string
  plant_Id: number
  plantName: string
  status:number
  comments:string
  organizationChild?:OrganizationChild []
}

export class 
OrganizationChild{
    id:number
      organizationId:number
      ownerName:string
      email: string
      pinCode:number
}
