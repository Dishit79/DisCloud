import { hash, verify } from "https://deno.land/x/scrypt/mod.ts";
import { checkExistanceUser, insertUser } from "./db.ts"
import { User } from "../utils/class.ts"


//the create user functions
async function createUser(username: string, email:string, password: string){

  //potentially vallidat information server side

  //Hash passwords
  const hashedPassword = await hash(password);
  let user = new User(username, email, hashedPassword)

  //send to db
  let existance = await checkExistanceUser(user)
  if (existance.username){
    return("Username invalid")
  }
  if (existance.email){
    return("Email invalid")
  }

  //insert into db
  await insertUser(user)
}




let t = await createUser("dis432hi4t","201e2","rewrew")

console.log(t);
