import * as R from 'https://cdn.skypack.dev/ramda@^0.27.1'
import { exists } from 'https://deno.land/std@0.102.0/fs/exists.ts'
import { MultipartReader } from "https://deno.land/std@0.102.0/mime/mod.ts";
//import { default as crocks } from "https://cdn.skypack.dev/crocks@^0.12.4";
import { getDir } from "../../database/account.ts"


const { compose, nth, split } = R

const getBoundary = compose(
  nth(1),
  split('='),
  nth(1),
  split(';')
)

const fieldName = "file"

export async function upload(req: any, res: any, next: any) {
  let boundary;

  const dir = await getDir(res.locals.user.user.id)

  const contentType = req.get('content-type')
  //console.log('contentType: ', contentType)
  if (contentType.startsWith('multipart/form-data')) {
    boundary = getBoundary(contentType);
  }
  //console.log('boundary: ', boundary)
  console.log(dir);


  const form = await new MultipartReader(req.body, boundary).readForm({
    maxMemory: 10 << 20,
    dir: dir!
  })
  let test = form!.files!(fieldName)![0]!

  console.log(test)

  if (("content" in test)==true){
    console.log("real");
    let name = test.filename
    let extension = name.split('.').pop();
    await Deno.writeFile(`${dir}/hello1.${extension}`, test.content!);
  }

  res.locals.file = test

  next()

}
