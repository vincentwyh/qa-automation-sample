# Feedback Wall QA Sample

This repository contains a simplified feedback wall application with Playwright E2E and API test coverage.

## Prerequisites

To continue you need to have the following installed:
- NodeJS >= 18.17.1
- Docker

## Project Scope

The project is focused on testing and automation examples using Playwright with TypeScript:

1. `E2E tests` for core user journeys
2. `API tests` for the `"[POST] /feedback"` endpoint and related validation/retrieval flows

## Local Setup

```
cp .env.example .env
npm install
```

Database:
```
docker-compose up
```

First time setup:
```
npm run db:migrate
npm run db:seed // for setting up test data and users
```

Service + Client:
```
npm run dev
```

## Notes

Customize this project as needed for your own portfolio or public examples.
