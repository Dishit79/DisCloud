import { hash, verify } from "https://deno.land/x/scrypt/mod.ts";

class User {
  username: string
  email:string
  password: string

  constructor(username: string, email:string, password: string) {
    this.username = username
    this.email = email
    this.password = password

  }
}


//the create user functions
async function createUser(username: string, email:string, password: string){

  //potentially vallidat information server side

  //Hash passwords
  const hashedPassword = await hash(password);

  let user = new User(username, email, hashedPassword)

  console.log(user);

  //send to db
  checkExistance(user)
  //   db returns wheather the data exists or not. Minimize database calls

  // return complete
}

function checkExistance(user: User) {

  console.log(user);


}




await createUser("dishit","dishit#dew","rewrew")
