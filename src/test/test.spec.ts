import supertest from "supertest";
import route from "../routes/indexRouting";
import { closeServer } from "../index";

const request = supertest(route)
describe("Testing endpoints", () => {
  
  test("Testing get / request",async () => {
    const res = await request.get("/");
    expect(res.statusCode).toBe(200);
  })
 afterAll(async () => await closeServer());
})