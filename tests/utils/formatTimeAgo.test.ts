import { formatTimeAgo } from "../../src/utils/formatTimeAgo";

describe("formatTimeAgo", () => {
  it("should return minutes ago if less than 1 hour", () => {
    const currentDateTime = new Date();
    const pastDateTime = new Date(currentDateTime);
    pastDateTime.setMinutes(currentDateTime.getMinutes() - 30);
    expect(formatTimeAgo(pastDateTime.toISOString())).toEqual("30 minutes ago");
  });

  it("should return hours ago if less than 1 day", () => {
    const currentDateTime = new Date();
    const pastDateTime = new Date(currentDateTime);
    pastDateTime.setHours(currentDateTime.getHours() - 6);
    expect(formatTimeAgo(pastDateTime.toISOString())).toEqual("6 hours ago");
  });

  it("should return days ago if more than 1 day", () => {
    const currentDateTime = new Date();
    const pastDateTime = new Date(currentDateTime);
    pastDateTime.setDate(currentDateTime.getDate() - 2);
    expect(formatTimeAgo(pastDateTime.toISOString())).toEqual("2 days ago");
  });
});
