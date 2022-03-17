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
