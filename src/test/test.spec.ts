import supertest from "supertest";
import app from "../index";
import { closeServer } from "../index";

const request = supertest(app);
describe("Testing endpoints", ():void => {
  
  test("Testing get / request",async ():Promise<void> => {
    const res:supertest.Response = await request.get("/");
    expect(res.statusCode).toBe(200);
  });
  test("Testing to request a image",async ():Promise<void> => {
    const res:supertest.Response = await request.get("/images?filename=fjord");
    expect(res.statusCode).toEqual(200);
  });
  test("Testing wrong image request",async ():Promise<void> => {
    const res:supertest.Response = await request.get("/images?filename=fjord.jpg")
    expect(res.statusCode).toBe(404);
  });
  test("Testing wrong Endpoint",async ():Promise<void> => {
    const res:supertest.Response = await request.get("/wrong");
    expect(res.status).toBe(404);
  })
})
afterAll(async () => await closeServer());