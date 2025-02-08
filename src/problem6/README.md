# Live Scoreboard Module

## Overview

This module provides a real-time scoreboard system where users' scores update dynamically as they complete actions. The system ensures secure updates and prevents unauthorized score manipulations.

## Features

- **Real-time Score Updates**: Users see leaderboard changes instantly.
- **Secure Score Submission**: Only valid, authenticated requests can update scores.
- **Top 10 Leaderboard**: The system keeps track of the top 10 highest scores.
- **WebSocket Notifications**: Frontend receives live updates without refreshing.

## API Endpoints

### 1. Update Score

- **Endpoint**: `POST /api/score/update`
- **Description**: Updates the user’s score when they complete an action.
- **Authentication**: Required (e.g., JWT, API key).
- **Request Body (JSON)**:
  ```json
  {
    "userId": "12345",
    "action": "complete_task"
  }
  ```
- **Response (JSON)**:
  ```json
  {
    "success": true,
    "newScore": 120
  }
  ```
- **Error Responses**:
  - `401 Unauthorized`: Invalid authentication.
  - `400 Bad Request`: Missing or invalid parameters.
  - `429 Too Many Requests`: Rate limit exceeded.

### 2. Get Leaderboard

- **Endpoint**: `GET /api/score/leaderboard`
- **Description**: Retrieves the top 10 scores.
- **Response (JSON)**:
  ```json
  {
    "leaderboard": [
      { "userId": "12345", "score": 150 },
      { "userId": "67890", "score": 140 }
    ]
  }
  ```

## Execution Flow

1. **User completes an action.**
2. **Frontend sends API request (`POST /api/score/update`).**
3. **Backend validates the request (auth, rate limits).**
4. **Score is updated in the database.**
5. **Backend sends leaderboard update via WebSocket.**
6. **Frontend displays live updates instantly.**

## Security Measures

- **Authentication**: API requests require a valid token.
- **Rate Limiting**: Prevents abuse by limiting requests per minute.
- **Request Validation**: Ensures correct and authorized updates.
- **WebSocket Security**: Only authorized users can receive live updates.

## Improvements & Future Enhancements

- **Persistent WebSocket connections**: Reduce reconnections and improve performance.
- **User Score History**: Store previous scores for analysis.
- **Cheat Detection**: Monitor suspicious score increases.
- **Leaderboard Pagination**: Extend beyond the top 10 users.
