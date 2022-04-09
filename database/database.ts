import { Database, SQLite3Connector, Model, DataTypes, Relationships } from 'https://deno.land/x/denodb/mod.ts';


const connector = new SQLite3Connector({
  filepath: './db.sqlite',
});

const db = new Database(connector);


export class AccountInfo extends Model {
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

export class UploadInfo extends Model {
  static table = "uploads"
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
db.link([AccountInfo, UploadInfo])
await db.sync()
