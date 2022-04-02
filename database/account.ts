import { Database, SQLite3Connector, Model, DataTypes, Relationships } from 'https://deno.land/x/denodb/mod.ts';
import { Account } from "../utils/class.ts"


const connector = new SQLite3Connector({
  filepath: './db.sqlite',
});

const db = new Database(connector);


class AccountInfo extends Model {
  static table = "account"
  static timestamps = true;

  static fields = { Id: {type: DataTypes.STRING, primaryKey: true},
    username: {type: DataTypes.STRING, allowNull: false},
    accountLevel: {type: DataTypes.INTEGER, allowNull: false},
    directory: {type: DataTypes.STRING, allowNull: false},
    storageTotal: {type: DataTypes.INTEGER, allowNull: false},
    storageLeft: {type: DataTypes.INTEGER, allowNull: false}
  }
}

//Relationships.belongsTo(PassInfo, UserInfo);
db.link([AccountInfo])
await db.sync()

export async function insertAccount(account: Account) {
  let test = { id: account.id,
  username: account.username,
  accountLevel: account.accountLevel,
  directory: account.directory,
  storageTotal: account.storageTotal,
  storageLeft: account.storageLeft,
  }
  
  await AccountInfo.create(test);
}
await generateDir("2239f357-00ed-421f-a8a8-6def8feed81e")

export async function generateDir(id:string) {
  let dirLocation = `/home/nawaf/Documents/section1/${id}`
  await Deno.mkdir(dirLocation, { recursive: true });
  return dirLocation
}
