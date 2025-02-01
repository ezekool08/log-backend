# Log Backend Service

A TypeScript-based backend service for storing and retrieving JSON logs using PostgreSQL.

## Features

- REST API for storing and retrieving logs
- PostgreSQL database with JSON support
- TypeScript for type safety
- Express.js web framework
- Automated CI/CD with GitHub Actions
- Infrastructure as Code using Terraform
- Database migrations using node-pg-migrate

## Prerequisites

- Node.js 16.x or higher
- PostgreSQL 13.x or higher
- npm or yarn
- Terraform (for deployment)
- AWS account (for deployment)

## Quick Start

1. Clone the repository:
```bash
git clone <repository-url>
cd log-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run database migrations:
```bash
npm run migrate up
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

### GET /logs
Retrieves all logs ordered by insertion date (descending).

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "inserted_at": "2023-11-03T12:00:00Z",
      "json": { ... }
    }
  ]
}
```

### POST /logs
Creates a new log entry.

Request body:
```json
{
  "data": {
    "message": "Example log",
    "level": "info"
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "inserted_at": "2023-11-03T12:00:00Z",
    "json": {
      "message": "Example log",
      "level": "info"
    }
  }
}
```

## Development

- `npm run dev`: Start development server with hot-reload
- `npm run build`: Build the TypeScript project
- `npm start`: Run the built project
- `npm test`: Run tests
- `npm run migrate`: Run database migrations

## Deployment

The project uses GitHub Actions for CI/CD and Terraform for infrastructure provisioning on AWS.

1. Set up AWS credentials in GitHub repository secrets:
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY

2. Push to main branch to trigger automatic deployment

## Infrastructure

The Terraform configuration creates:
- RDS PostgreSQL instance
- Elastic Beanstalk environment
- Security groups and required networking