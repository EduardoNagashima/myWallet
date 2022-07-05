import * as queryConnection from "../repositories/queryConnection.js";

export async function postNewValue(req, res) {
    try {
        const { user } = res.locals;

        const { value, type } = req.body;

        if (!value || !type) {
            return res.sendStatus(422);
        }

        const financialTypes = ["INCOME", "OUTCOME"];
        if (!financialTypes.includes(type)) {
            return res.sendStatus(422);
        }

        if (value < 0) {
            return res.sendStatus(422);
        }

       queryConnection.newValue(user.id, value, type);

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export async function getValue(req, res) {
    try {
        const { user } = res.locals;

        const events = await connection.query(
            `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
            [user.id]
        );

        res.send(events.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export async function getBalance(req, res) {
    try {
        const { user } = res.locals;

        const events = await connection.query(
            `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
            [user.id]
        );

        const sum = events.rows.reduce(
            (total, event) =>
                event.type === "INCOME" ? total + event.value : total - event.value,
            0
        );

        res.send({ sum });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};
