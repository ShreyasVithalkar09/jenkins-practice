import request from "supertest";
import app from "../app.js";

describe("Todo API", () => {
  it("should return all todos", async () => {
    const res = await request(app).get("/todos");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return a single todo by id", async () => {
    const res = await request(app).get("/todos/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });

  it("should return 404 for invalid todo id", async () => {
    const res = await request(app).get("/todos/999");
    expect(res.status).toBe(404);
  });

  it("should create a new todo", async () => {
    const res = await request(app)
      .post("/todos")
      .send({ title: "New Test Todo" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("New Test Todo");
  });

  it("should update an existing todo", async () => {
    const res = await request(app)
      .put("/todos/1")
      .send({ completed: true });

    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it("should delete a todo", async () => {
    const res = await request(app).delete("/todos/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
  });
});
