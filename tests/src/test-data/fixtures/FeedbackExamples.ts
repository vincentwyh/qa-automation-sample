import { faker } from "@faker-js/faker";
import { feedbackReceivers } from "./UserData";

/**
 * Sample positive feedback data with randomly generated content.
 * @constant
 */
export const positiveFeedback = {
  title: faker.lorem.sentence(5),
  body: faker.lorem.paragraph(3),
};

/**
 * Sample constructive feedback data with randomly generated content.
 * @constant
 */
export const constructiveFeedback = {
  title: faker.lorem.sentence(5),
  body: faker.lorem.paragraph(3),
};

/**
 * Array of multiple feedback items with different receivers.
 * Used for testing bulk feedback creation scenarios.
 * @constant
 */
export const multipleFeedbackItems = [
  {
    title: faker.lorem.sentence(5),
    body: faker.lorem.paragraph(3),
    receiver: feedbackReceivers.john,
  },
  {
    title: faker.lorem.sentence(5),
    body: faker.lorem.paragraph(3),
    receiver: feedbackReceivers.tim,
  },
];

/**
 * Generic valid feedback data for general testing.
 * @constant
 */
export const validFeedback = {
  title: faker.lorem.sentence(5),
  body: faker.lorem.paragraph(3),
};

/**
 * Feedback data with maximum length body content.
 * Used for testing length validation constraints (10,000 characters).
 * @constant
 */
export const maxLengthFeedback = {
  title: faker.lorem.sentence(5),
  body: "A".repeat(10000),
};

export const multipleFeedbackApiItems = [
  {
    title: faker.lorem.sentence(5),
    body: faker.lorem.paragraph(3),
  },
  {
    title: faker.lorem.sentence(5),
    body: faker.lorem.paragraph(3),
  },
];

export const unauthorizedFeedback = {
  title: faker.lorem.sentence(5),
  body: faker.lorem.paragraph(3),
};

export const missingTitleFeedback = {
  title: "",
  body: faker.lorem.paragraph(),
};

export const missingBodyFeedback = {
  title: faker.lorem.sentence(),
  body: "",
};

export const missingReceiverFeedback = {
  title: faker.lorem.sentence(5),
  body: faker.lorem.paragraph(3),
};

export const shortTitleFeedback = {
  title: "Hi",
  body: faker.lorem.paragraph(),
};

export const shortBodyFeedback = {
  title: faker.lorem.sentence(),
  body: "No",
};

export const invalidReceiverFeedback = {
  title: faker.lorem.sentence(5),
  body: faker.lorem.paragraph(3),
};

export const retrievalTestFeedback = {
  body: faker.lorem.paragraph(3),
};
