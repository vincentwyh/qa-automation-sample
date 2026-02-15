import { test } from "@fixtures";
import {
  authenticate,
  getAllUsers,
  createFeedback,
  getAllFeedback,
  generateUniqueTitle,
  verifyFeedbackList,
  verifySuccessResponse,
  verifyFeedbackInList,
  verifyErrorResponse,
} from "@helpers";
import { testUsers, apiEndpoints, retrievalTestFeedback, httpStatus } from "@test-data";

test.describe("Feedback API - Retrieval", () => {
  let accessToken: string;

  test.beforeEach(async ({ request }) => {
    accessToken = await authenticate(request, testUsers.owner);
  });

  test("User can retrieve all feedback items", async ({ request }) => {
    const feedbackItems = await getAllFeedback(request, accessToken);

    verifyFeedbackList(feedbackItems);
  });

  test("User cannot retrieve feedback without authentication", async ({ request }) => {
    const response = await request.get(apiEndpoints.feedback.base);

    await verifyErrorResponse(response, httpStatus.unauthorized);
  });

  test("User can retrieve feedback after creating new item", async ({ request }) => {
    const users = await getAllUsers(request, accessToken);
    const receiver = users.find((u: { username: string }) => u.username === testUsers.jane.username);
    const feedbackTitle = generateUniqueTitle("API Test");
    const response = await createFeedback(request, accessToken, {
      title: feedbackTitle,
      body: retrievalTestFeedback.body,
      receiverId: receiver.id,
    });

    await verifySuccessResponse(response);

    const updatedFeedback = await getAllFeedback(request, accessToken);

    verifyFeedbackInList(updatedFeedback, feedbackTitle);
  });
});
