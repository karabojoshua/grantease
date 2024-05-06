import supertest from "supertest";
import { describe } from "vitest";
import app from "../../app.js";

//mock to ignore the authenticator
vi.mock("@clerk/clerk-sdk-node", ()=>({
    ClerkExpressRequireAuth: () => (req, res, next) => {
        req.auth = {id: "123"};
        next();
    }
}))

vi.mock("mysql2", () => ({
  default: {
    createConnection: () => ({
      connect: (cb) => cb(),
      query: (sql, params, callback) => {
        if (params instanceof Function) {
          // if no params
          callback = params;
        }

        if (sql.includes("SELECT * FROM user;")) {
          callback(null, [{ id: 1, role: "admin" }]);
        } else if (
          sql.includes(
            "SELECT * FROM user WHERE role = 'fund_manager_pending';"
          )
        ) {
          callback(null, [{ id: 2, role: "fund_manager_pending" }]);
        } else if (sql.includes("UPDATE user SET is_banned = ? WHERE id = ?")) {
          callback(null, { affectedRows: 1 });
        } else if (sql.includes("UPDATE user SET role = ? WHERE id IN (?)")) {
          callback(null, { affectedRows: 1 });
        } else {
          callback(new Error("Invalid SQL query"));
        }
      },
    }),
  },
}));

describe("GET /admin/users", () => {
  it("should return an array of users", async () => {
    const res = await supertest(app).get("/admin/users");

    expect(res.body).toEqual([{ id: 1, role: "admin" }]);
  });
});

describe("GET /admin/pending-managers", () => {
    it("should return an array of pending managers", async () => {
        const res = await supertest(app).get("/admin/pending-managers");
    
        expect(res.body).toEqual([{ id: 2, role: "fund_manager_pending" }]);
    });
});


describe("PUT /admin/toggle-ban/:id", () => {
    it("should return a success message", async () => {
        const res = await supertest(app)
            .put("/admin/toggle-ban/1")
            .send({ is_banned: true });
    
        expect(res.body).toEqual({ message: "User banned status updated successfully" });
    });
});

describe("POST /admin/update-roles", () => {
    it("should return a success message", async () => {
        const res = await supertest(app)
            .post("/admin/update-roles")
            .send({ ids: [1], newRole: "admin" });
    
        expect(res.body).toEqual({ message: "Roles updated successfully" });
    });
});