import { opine, serveStatic, urlencoded, Router } from "https://deno.land/x/opine/mod.ts";
import { dirname, join } from "https://deno.land/x/opine/deps.ts";
//main endpoint to get lyrics
import { api } from "./routes/api.ts"
import { RateLimit } from "./ratelimit.ts"


const app = opine()
const port = 5000
app.set("view cache", false)
app.set('trust proxy', true)
const __dirname = dirname(import.meta.url)
app.use("/api", api)

app.get("/", (req,res)=> {
  res.sendFile(join(__dirname,'./public/index.html'))
})


//const rr = RateLimit({resetTime: 10 * 1000})

app.get("/", (req,res)=> {
  res.sendFile(join(__dirname,'./public/index.html'))
})

app.get("/lyrics", (req,res)=> {
  res.sendFile(join(__dirname,'./public/lyrics.html'))
})

app.listen(port);
console.log(`Opine started on localhost:${port}`)
