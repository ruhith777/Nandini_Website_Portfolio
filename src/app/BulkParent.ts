export class BulkParent {
    id:number
    name:string
    bulkChild?:BulkChild []
}
export class BulkChild {
    id:number
    bulkParent_Id
    branch:string
}

