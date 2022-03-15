import { Router } from "https://deno.land/x/opine/mod.ts";
import { dirname, join } from "https://deno.land/x/opine/deps.ts";
import { Database, SQLite3Connector, Model, DataTypes, Relationships } from 'https://deno.land/x/denodb/mod.ts';
import { hash, verify } from "https://deno.land/x/scrypt/mod.ts";
import { create, verify as verify1, getNumericDate} from "https://deno.land/x/djwt/mod.ts"
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { usr_validate, pass_validate } from "../validator.ts";
import { AES } from "https://deno.land/x/god_crypto/aes.ts";
import { decodeString, encodeToString } from "https://deno.land/std/encoding/hex.ts"

export const api = new Router
const connector = new SQLite3Connector({
  filepath: './db.sqlite',
});
const db = new Database(connector);
const aes = new AES("Hello W123dyAES!", {
  mode: "cbc",
  iv: "random 16byte iv",
});

class UserInfo extends Model {
  static table = "userinfo"
  static timestamps = true;

  static fields = {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    username: {type: DataTypes.STRING, allowNull: false},
    password: DataTypes.STRING,
    key: {type: DataTypes.STRING, allowNull: false}
  }
  static passwords() {
    return this.hasMany(PassInfo);
  }
}
class PassInfo extends Model {
  static table = "passinfo"
  static timestamps = true;

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    sitename: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.BINARY,
  }
  static owners() {
    return this.hasOne(UserInfo);
  }
}
class User {
  username: string
  password: string
  key: string
  constructor(gusername: string, gpassword: string) {
    this.username = gusername
    this.password = gpassword
    this.key = v4.generate()
  }
}

Relationships.belongsTo(PassInfo, UserInfo);
db.link([UserInfo,PassInfo])

await db.sync()

api.post("/user/login", async (req,res) => {

  const val = usr_validate(req.body)
  if (val !== true) {
    res.setStatus(405).send(val)
  }
  console.log(req.body.username)

  const vaildData = await UserInfo.where('username', req.body.username).first()
  console.log(vaildData)
  if (vaildData){
    console.log("passed");
    const verifyResult = await verify(req.body.password, (vaildData.password!).toString() )
    console.log(verifyResult)
    if (!verifyResult){
      res.setStatus(405).send('Login failed')
    }
  }else{
    console.log('tt');
    await res.setStatus(405).send('User failed')
  }

  const jwt = await create({ alg: "HS512", typ: "JWT" }, { exp: getNumericDate(60 * 60) , key: vaildData.key }, "gBzjnOZB")
  res.cookie({name: "token",value: jwt}).redirect("/")
})

api.post("/user/new", async (req,res) => {
  const val = usr_validate(req.body)
  if (val !== true) {
    res.send(val)
  }
  const newUser = new User(req.body.username, await hash(req.body.password))
  await UserInfo.create({username:newUser.username, password:newUser.password, key:newUser.key})
  res.send(newUser)
})



export async function auth(req:any, res:any, next:any){
  const rawToken:string = req.get("cookie");
  try{
    const payload = await verify1(rawToken.substr(6) , "gBzjnOZB", "HS512")
    const token:any = payload.key
    const validData = await UserInfo.where('key', token).first()
    res.locals.b = validData
    next()

  } catch (e) {
    res.setStatus(405).redirect("/login")
  }
}







import { Database, SQLite3Connector, Model, DataTypes } from 'https://deno.land/x/denodb/mod.ts';

const connector = new SQLite3Connector({
  filepath: './database.sqlite',
});

const db = new Database(connector);


class User extends Model {
  static table = 'user';
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.FLOAT,
  };
}

db.link([User])

await db.sync()
