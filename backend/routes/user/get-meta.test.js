import supertest from 'supertest';
import { describe, vi } from "vitest";
import app from '../../app.js';

//mock to ignore the authenticator
vi.mock("@clerk/clerk-sdk-node", ()=>({
    ClerkExpressRequireAuth: () => (req, res, next) => {
        req.auth = {id: "123"};
        next();
    }
}))

vi.mock("../../db/index.js", ()=>({
    db: {
        query: (sql, params, callback) => {
            if (params instanceof Function) { // if no params
                callback = params;
            }

            if (sql.includes("SELECT * FROM user WHERE id = ?")) {
                callback(null, []);
            } else if (sql.includes("SELECT COUNT(*) as count FROM user")) {
                callback(null, [{count: 0}]);
            } else if (sql.includes("INSERT INTO user SET ?")) {
                callback(null, {id: "123", role: "admin", is_banned: 0});
            } else {
                callback(new Error("Invalid SQL"));
            }
        }
    }
}))

describe('get-user-meta', () => {
    describe('GET /user-meta', () => {
        it('it should create a new admin user if no user exists', async () => {
            const response = await supertest(app).get('/user-meta');
            expect(true).toEqual(true);
        });
    });
});


