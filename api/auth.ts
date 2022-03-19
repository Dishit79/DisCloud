import { hash, verify } from "https://deno.land/x/scrypt/mod.ts";
import { checkExistanceUser, insertUser, getUser } from "../database/user.ts"
import { User } from "../utils/class.ts"


//the create user functions
export async function createUser(username: string, email:string, password: string){

  //potentially vallidate information server side

  //Hash passwords
  const hashedPassword = await hash(password);
  let user = new User(username, email, hashedPassword)

  console.log("hit");


  //send to db
  let existance = await checkExistanceUser(user)
  if (existance.username){
    return {succsess: false, error: "username invalid"}
  }
  if (existance.email){
    return {succsess: false, error: "email invalid"}
  }

  //insert into db
  await insertUser(user)
  return {succsess: true, error: null}
}

export async function loginUser(username: string, password: string){

  let user = new User(username, username, password)
  let existance = await checkExistanceUser(user)

  if (!existance.username){
    return{succsess: false, error: "Account doesnt exist"} 
  }
  //get user data
  const userData = await getUser(user)

  //check hashed passwords
  const verifyResult = await verify(password, userData!.password);

  if (verifyResult !== true){
    return {succsess: false, error: "password incorrect"}
  }
  return {succsess: true, error: null }

}

await loginUser("dishi44t","erewrerw")

//let t = await createUser("dishi44t","rewrew1","erewrerw")
//console.log(t);
