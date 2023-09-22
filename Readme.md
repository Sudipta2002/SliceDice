# Micro-Service for Summary Statistics

This micro-service provides functionality to derive simplified summary statistics (mean, min, max) on a dataset. It includes various API endpoints for adding records, fetching summary statistics, authentication, and authorization.

## Getting Started

These instructions will help you set up and run the service on your local machine for testing and development purposes.

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine.
- Git for cloning the repository.

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/Sudipta2002/SliceDice.git
   cd SliceDice

2. Install dependencies:
    ```npm install```

3. Start the service:
    ```npm start```

The service should now be running on http://localhost:5000.

## API Endpoints
1. Add a New Record
    Endpoint: `POST /api/v1/add`

2. Delete a New Record
    Endpoint: `POST /api/v1/delete`

3. Fetch Summary Statistics for Salary (Entire Dataset)
    Endpoint: `GET /api/v1/allStat`

4.  Fetch Summary Statistics for Salary (On Contract)
    Endpoint: `GET /api/v1/allStatOnContract`

5. Fetch Summary Statistics for Salary (By Department)
    Endpoint: `GET /api/v1/allStatOnDept`

6.  Fetch Summary Statistics for Salary (By Department and Sub-Department)
    Endpoint: `GET /api/v1/allStatOnDeptSubdept`
