import { Database } from 'https://deno.land/x/aloedb/mod.ts';
import { v4 } from "https://deno.land/std/uuid/mod.ts";

// Structure of stored documents
interface Test {
  username: string
  email: string
  password: string
  id: string
}
// Initialization
const db = new Database<Test>('user.json');


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

export async function checkExistanceUser(user: User) {
  const usernameFound = await db.findOne({ username: user.username });

  if (usernameFound) {
    return { username: true, email: true }
  }
  const emailFound = await db.findOne({ email: user.email });
  if (emailFound) {
    return { username: false, email: true }
  }
  return { username: false, email: false }
}

export async function insertUser(user: User) {
  user.generateId()
  await db.insertOne(user)
}

export async function getUser(user: User) {
  const userData = await db.findOne({ username: user.username });
  return userData
}
