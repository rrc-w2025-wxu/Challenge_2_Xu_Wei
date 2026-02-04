import request from "supertest";
import express, { Express } from "express";
import eventRoutes from "../routes/eventRoutes"; // replace with your path
import { events } from "../data/eventData"; // your in-memory events array

// Create an Express app for testing
const app: Express = express();
app.use(express.json()); // parse JSON body
app.use("/", eventRoutes);

// Reset the events array before each test
const resetEvents = () => {
  events.length = 0;
  events.push(
    { id: 1, name: "Tech Conference 2025", date: "2025-03-15T09:00:00.000Z", capacity: 200, registrationCount: 185 },
    { id: 2, name: "Startup Pitch Night", date: "2025-02-20T18:00:00.000Z", capacity: 50, registrationCount: 12 },
    { id: 3, name: "Web Dev Workshop", date: "2025-02-10T10:00:00.000Z", capacity: 30, registrationCount: 30 }
  );
};

beforeEach(() => {
  resetEvents();
});

describe("Event Routes Integration Tests", () => {

  test("GET /health should return 200 OK", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  test("GET /events should return all events count", async () => {
    const res = await request(app).get("/events");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("count", 3);
  });

  test("GET /events/:id should return single event", async () => {
    const res = await request(app).get("/events/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body.name).toBe("Tech Conference 2025");
  });

  test("GET /events/:id/popularity should return event with tier", async () => {
    const res = await request(app).get("/events/1/popularity");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("tier", "Hot"); // 185/200 = 92.5%
  });

  test("POST /events should create a new event", async () => {
    const newEvent = { name: "New Event", capacity: 50 };
    const res = await request(app).post("/events").send(newEvent);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Item created");
    expect(res.body.data).toHaveProperty("name", "New Event");
    expect(res.body.data).toHaveProperty("capacity", 50);
    expect(typeof res.body.data.date).toBe("string");
  });

  test("DELETE /events/:id should return deleted event", async () => {
    const res = await request(app).delete("/events/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id", 1);

    // Deleting a non-existing event
    const res2 = await request(app).delete("/events/999");
    expect(res2.status).toBe(404);
  });

});
