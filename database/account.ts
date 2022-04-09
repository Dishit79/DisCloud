import { AccountInfo } from "./database.ts";

export class Account {
  id: string
  username:string
  accountLevel:number
  directory:string
  storageTotal:number
  storageLeft: number

  constructor(id: string, username: string, accountLevel: number, directory: string, storageTotal: number, storageLeft: number) {
    this.id = id
    this.username = username
    this.accountLevel = accountLevel
    this.directory = directory
    this.storageTotal = storageTotal
    this.storageLeft = storageLeft
  }
}

export async function insertAccount(account: Account) {
  let test = { id: account.id,
  username: account.username,
  accountLevel: account.accountLevel,
  directory: account.directory,
  storageTotal: account.storageTotal,
  storageLeft: account.storageLeft,
  }

  await AccountInfo.create(test);
}

export async function generateDir(id:string) {
  let dirLocation = `/home/nawaf/Documents/section1/${id}`
  await Deno.mkdir(dirLocation, { recursive: true });
  return dirLocation
}

export async function getDir(id:string) {
  const data = await AccountInfo.where('id', id).first();
  return(data.directory);

}
