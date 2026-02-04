import { Event, EventCreateInput } from "../../../interface_properties";
import { 
  eventsCount, 
  singleEvent, 
  popularity, 
  createItem, 
  deleteEvent 
} from "../yourServiceFile"; // Replace with your service file path
import { events } from "../../../data/eventData";

// Reset events array before each test to ensure test independence
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

describe("Event Service Tests", () => {
  
  test("eventsCount should return the correct number of events", () => {
    const count = eventsCount();
    expect(count).toBe(3);
  });

  test("singleEvent should return the correct event by ID", () => {
    const event = singleEvent(1);
    expect(event).toBeDefined();
    expect(event?.name).toBe("Tech Conference 2025");

    const notFound = singleEvent(999);
    expect(notFound).toBeUndefined();
  });

  test("popularity should calculate tier correctly based on registration percentage", () => {
    const eventHot = popularity(1); // 185/200 = 92.5%
    expect(eventHot?.tier).toBe("Hot");

    const eventNew = popularity(2); // 12/50 = 24%
    expect(eventNew?.tier).toBe("New");

    const eventPopular = popularity(3); // 30/30 = 100%
    expect(eventPopular?.tier).toBe("Hot");
  });

  test("createItem should return an EventCreateInput object with default date", () => {
    const newEvent: EventCreateInput = createItem("New Event", undefined, 50);
    
    // Check properties
    expect(newEvent).toHaveProperty("name", "New Event");
    expect(newEvent).toHaveProperty("capacity", 50);
    expect(newEvent).toHaveProperty("date"); // Default to current time
    expect(typeof newEvent.date).toBe("string");
  });

  test("deleteEvent should return the correct event or undefined if not found", () => {
    const deleted = deleteEvent(1);
    expect(deleted).toBeDefined();
    expect(deleted?.name).toBe("Tech Conference 2025");

    const notFound = deleteEvent(999);
    expect(notFound).toBeUndefined();
  });

});
