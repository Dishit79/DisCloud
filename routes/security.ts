import { Router } from "https://deno.land/x/opine/mod.ts";
import { create } from "https://deno.land/x/djwt/mod.ts";
import { createUser, loginUser, createToken } from "./functions/auth.ts";
import { upload } from './functions/upload.ts'

import { multiParser } from 'https://deno.land/x/multiparser/mod.ts'

export const api = new Router


api.post("/signup", async (req,res) => {
  console.log(req.body);
  let on = await createUser(req.body.username, req.body.email, req.body.password)

  if (on.succsess){
    res.redirect("../main")
  }
})


api.post("/login", async (req,res) => {
  let on = await loginUser(req.body.username, req.body.password)

  if (on.succsess){
    let jwt = await createToken(on!.user!.username!, on!.user!.id!)
    res.cookie({name: "token",value: jwt}).redirect("../main")
  }
})


api.post("/upload", await upload, async (req,res) => {
  res.send("ok");

})
