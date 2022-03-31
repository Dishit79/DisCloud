import { v4 } from "https://deno.land/std/uuid/mod.ts";

export class User {
  username: string
  email: string
  password: string
  id = "null"

  constructor(username: string, email:string, password: string) {
    this.username = username
    this.email = email
    this.password = password
  }

  generateId(){
      this.id = v4.generate()
  }
}

export class Account {
  id: string
  username:string
  accountLevel:number
  directory:string
  storageTotal:number
  storageLeft: number

  constructor(id: string, username: string, accountLevel: number, directory: string, storageTotal: number, storageLeft: number) {
    this.id: = id
    this.username: = username
    this.accountLevel: = accountLevel
    this.directory: = directory
    this.storageTotal: = storageTotal
    this.storageLeft: = storageLeft
  }
}
