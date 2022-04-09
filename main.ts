import { opine, serveStatic, urlencoded, Router } from "https://deno.land/x/opine/mod.ts";
import { dirname, join } from "https://deno.land/x/opine/deps.ts";
import { renderFile } from "https://deno.land/x/eta/mod.ts";
import { api } from "./routes/security.ts";
import { auth } from "./routes/functions/auth.ts";

//import { RateLimit } from "./ratelimit.ts"


const app = opine();
const __dirname = dirname(import.meta.url);
const port = 5000
app.engine(".html", renderFile);
app.use("/public", serveStatic(join(__dirname, "public")));
app.set("view engine", "html");
app.set("view cache", false);
app.use(urlencoded());
app.use("/api", api)

app.get("/", (req,res)=> {
  res.render("index")
})

app.get("/signup", (req,res)=> {
  res.render("signup")
})

app.get("/main", await auth, (req,res)=> {

  console.log(res.locals.user);

  res.render("main")
})

app.get("/login", (req,res)=> {
  res.render("login")
})

app.listen(port);
console.log(`Opine started on localhost:${port}`)
