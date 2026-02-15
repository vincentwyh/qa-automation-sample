import { test } from "@fixtures";
import {
  authenticate,
  getAllUsers,
  createFeedback,
  verifySuccessResponse,
  verifyFeedbackCreated,
  verifyFeedbackBody,
} from "@helpers";
import { testUsers, validFeedback, maxLengthFeedback, multipleFeedbackApiItems } from "@test-data";

test.describe("Feedback API - POST / Create", () => {
  let accessToken: string;
  let receiverId: number;

  test.beforeEach(async ({ request }) => {
    accessToken = await authenticate(request, testUsers.owner);

    const users = await getAllUsers(request, accessToken);
    const receiver = users.find((u: { username: string }) => u.username === testUsers.jane.username);

    receiverId = receiver.id;
  });

  test("User can create feedback with valid data", async ({ request }) => {
    const feedbackData = {
      title: validFeedback.title,
      body: validFeedback.body,
      receiverId,
    };

    const response = await createFeedback(request, accessToken, feedbackData);

    await verifySuccessResponse(response);
    await verifyFeedbackCreated(response, feedbackData);
  });

  test("User can create feedback with maximum body length", async ({ request }) => {
    const feedbackData = {
      title: maxLengthFeedback.title,
      body: maxLengthFeedback.body,
      receiverId,
    };

    const response = await createFeedback(request, accessToken, feedbackData);

    await verifySuccessResponse(response);
    await verifyFeedbackBody(response, maxLengthFeedback.body);
  });

  test("User can create multiple feedback items", async ({ request }) => {
    const feedbackItems = multipleFeedbackApiItems.map((item) => ({
      ...item,
      receiverId,
    }));

    for (const feedbackData of feedbackItems) {
      const response = await createFeedback(request, accessToken, feedbackData);

      await verifySuccessResponse(response);
      await verifyFeedbackCreated(response, feedbackData);
    }
  });
});
