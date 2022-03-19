import { Router } from "https://deno.land/x/opine/mod.ts";
import { create } from "https://deno.land/x/djwt/mod.ts";
import { createUser, loginUser } from "../api/auth.ts";

export const api = new Router


api.post("/signup", async (req,res) => {
  console.log(req.body);
  let on = await createUser(req.body.username, req.body.email, req.body.password)

  if (on.succsess){
    res.redirect("../main")
  }
})


// TODO: add JWT auth 

api.post("/login", async (req,res) => {
  console.log(req.body);
  let on = await loginUser(req.body.username, req.body.password)

  if (on.succsess){
    res.redirect("../main")
  }
})
