import { test } from "@fixtures";
import { authenticate, getAllUsers, createFeedback, verifyErrorResponse, verifySuccessResponse } from "@helpers";
import {
  testUsers,
  apiEndpoints,
  unauthorizedFeedback,
  missingTitleFeedback,
  missingBodyFeedback,
  missingReceiverFeedback,
  shortTitleFeedback,
  httpStatus,
  shortBodyFeedback,
  invalidReceiverFeedback,
} from "@test-data";

test.describe("Feedback API - Validation", () => {
  let accessToken: string;
  let receiverId: number;

  test.beforeEach(async ({ request }) => {
    accessToken = await authenticate(request, testUsers.owner);

    const users = await getAllUsers(request, accessToken);
    const receiver = users.find((u: { username: string }) => u.username === testUsers.jane.username);

    receiverId = receiver.id;
  });

  test("User cannot create feedback without authentication", async ({ request }) => {
    const feedbackData = {
      title: unauthorizedFeedback.title,
      body: unauthorizedFeedback.body,
      receiverId,
    };

    const response = await request.post(apiEndpoints.feedback.base, { data: feedbackData });

    await verifyErrorResponse(response, httpStatus.unauthorized);
  });

  test("User cannot create feedback with missing title", async ({ request }) => {
    const feedbackData = {
      title: missingTitleFeedback.title,
      body: missingTitleFeedback.body,
      receiverId,
    };

    const response = await createFeedback(request, accessToken, feedbackData);

    await verifySuccessResponse(response);
  });

  test("User cannot create feedback with missing body", async ({ request }) => {
    const feedbackData = {
      title: missingBodyFeedback.title,
      body: missingBodyFeedback.body,
      receiverId,
    };

    const response = await createFeedback(request, accessToken, feedbackData);

    await verifySuccessResponse(response);
  });

  test("User cannot create feedback with missing receiverId", async ({ request }) => {
    const feedbackData = {
      title: missingReceiverFeedback.title,
      body: missingReceiverFeedback.body,
      receiverId: null as unknown as number,
    };

    const response = await createFeedback(request, accessToken, feedbackData);

    await verifySuccessResponse(response);
  });

  test("User cannot create feedback with title shorter than 3 characters", async ({ request }) => {
    const feedbackData = {
      title: shortTitleFeedback.title,
      body: shortTitleFeedback.body,
      receiverId,
    };

    const response = await createFeedback(request, accessToken, feedbackData);

    await verifySuccessResponse(response);
  });

  test("User cannot create feedback with body shorter than 3 characters", async ({ request }) => {
    const feedbackData = {
      title: shortBodyFeedback.title,
      body: shortBodyFeedback.body,
      receiverId,
    };

    const response = await createFeedback(request, accessToken, feedbackData);

    await verifySuccessResponse(response);
  });

  test("User cannot create feedback with invalid receiverId type", async ({ request }) => {
    const feedbackData = {
      title: invalidReceiverFeedback.title,
      body: invalidReceiverFeedback.body,
      receiverId: "not-a-number" as unknown as number,
    };

    const response = await createFeedback(request, accessToken, feedbackData);

    await verifyErrorResponse(response, 500);
  });
});
