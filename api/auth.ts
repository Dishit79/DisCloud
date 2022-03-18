import { hash, verify } from "https://deno.land/x/scrypt/mod.ts";
import { checkExistanceUser, insertUser, getUser } from "../database/user.ts"
import { User } from "../utils/class.ts"


//the create user functions
async function createUser(username: string, email:string, password: string){

  //potentially vallidate information server side

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

async function loginUser(username: string, password: string){

  let user = new User(username, username, password)
  let existance = await checkExistanceUser(user)

  if (!existance.username){
    return("Account doesnt exist")
  }
  //get user data
  const userData = await getUser(user)

  //check hashed passwords
  const verifyResult = await verify(password, userData!.password);
  console.log("ok?");

  console.log(verifyResult);

}

await loginUser("dishi44t","erewrerw")

//let t = await createUser("dishi44t","rewrew1","erewrerw")
//console.log(t);
