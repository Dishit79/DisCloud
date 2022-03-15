import { Database } from 'https://deno.land/x/aloedb/mod.ts';

// Structure of stored documents
interface User {
    username: string;
    email: string;
    password: string;
}

// Initialization
const db = new Database<User>('user.json');

// Insert operations
await db.insertOne({  
    username: 'Drive',
    email: '2012',
    password: 'true',
});
