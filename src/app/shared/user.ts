import { UserPermissionView } from "./UserPermissionView"

export class User {

        id!:number
        firstName!:string
        lastName!:string
        phone!:string
        image!:string
        imageString!:string
        email!:string
        isSuperAdmin!:boolean
        permissions!:Array<UserPermissionView>
  }
