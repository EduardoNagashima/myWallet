import connection from "./database.js";

export async function newValue(userId, value, type){
    await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
        [userId, value, type]
    );
}


export {
    queryConnection,
}