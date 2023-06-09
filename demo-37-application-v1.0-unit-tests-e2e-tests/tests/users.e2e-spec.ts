import {App} from "../src/app";
import {boot} from "../src/main";
import request from "supertest";

let application: App;

beforeAll(async () => {
    const {app} = await boot;
    application = app;
});

describe("Users e2e tests", () => {
    it("Register - error", async () => {
        const res = await request(application.app)
            .post("/users/register")
            .send({
                email: "pgsp2211dfg@pgg.com",
                password: "sfdgsddfgfgsdfgsdfg",
            });
        expect(res.statusCode).toBe(422);
    });
    it("Login - error", async () => {
        const res = await request(application.app)
            .post("/users/login")
            .send({
                email: "pgsp2211dfg@pgg.com",
                password: "1",
            });
        expect(res.statusCode).toBe(401);
    });
    it("Login - success", async () => {
        const res = await request(application.app)
            .post("/users/login")
            .send({
                email: "pgsp2211dfg@pgg.com",
                password: "sfdgsddfgfgsdfgsdfg",
            });
        expect(res.body.jwt).not.toBeUndefined();
    });
    it("Info - success", async () => {
        const login = await request(application.app)
            .post("/users/login")
            .send({
                email: "pgsp2211dfg@pgg.com",
                password: "sfdgsddfgfgsdfgsdfg",
            });
        const res = await request(application.app)
            .get("/users/info")
            .set("Authorization", `Bearer ${login.body.jwt}`);
        expect(res.body.email).toBe("pgsp2211dfg@pgg.com");
    });
    it("Info - error", async () => {
        const login = await request(application.app)
            .post("/users/login")
            .send({
                email: "pgsp2211dfg@pgg.com",
                password: "sfdgsddfgfgsdfgsdfg",
            });
        const res = await request(application.app)
            .get("/users/info")
            .set("Authorization", `Bearer 1`);
        expect(res.statusCode).toBe(401);
    });
});

afterAll(() => {
    application.close();
})