import { Database } from 'https://deno.land/x/aloedb/mod.ts';
import { User } from "../utils/class.ts"

// Structure of stored documents
interface Test {
  username: string
  email: string
  password: string
  id: string
}

// Initialization
const db = new Database<Test>('user.json');


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
