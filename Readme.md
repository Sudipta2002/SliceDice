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
    ### Example:
     URL: `http://localhost:5000/api/v1/add`
     Input body should contain : name , salary , currency(optional) , department , on_contract(optional) , sub_department
     ```
        {
            "name": "Abhishek",
            "salary": "145000",
            "currency": "USD",
            "department": "Engineering",
            "sub_department": "Platform"
        }
     ```
2. Delete a New Record:
    Endpoint: `DELETE /api/v1/delete`
     ### Example:
     URL: `http://localhost:5000/api/v1/delete/Abhishek/Engineering`

     In the params I am taking the name and department as the criteria for deletion


3. Fetch Summary Statistics for Salary (Entire Dataset):

    Endpoint: `GET /api/v1/allStat`
     ### Example:
    URL: `http://localhost:5000/api/v1/allStat`
    As a response we will get 
    ```
    {
        "message": "Successfully fetched Salary Stats",
        "success": true,
        "err": {},
        "data": {
            "Mean": 1.2083408333533333e+49,
            "Min": 30,
            "Max": 200000000
        }
    }
    ```
4.  Fetch Summary Statistics for Salary (On Contract):

    Endpoint: `GET /api/v1/allStatOnContract`
     ### Example:
    URL: `http://localhost:5000/api/v1/allStatOnContract`
    As a response we will get 
    ```
    {
        "message": "Successfully fetched Salary Stats onContract",
        "success": true,
        "err": {},
        "data": {
            "Mean": 45000055000,
            "Min": 90000,
            "Max": 110000
        }
    }
    ```
5. Fetch Summary Statistics for Salary (By Department):

    Endpoint: `GET /api/v1/allStatOnDept`
    ### Example:
    URL: `http://localhost:5000/api/v1/allStatOnDept`
    ```
    {
        "message": "Successfully fetched Salary Stats onDept",
        "success": true,
        "err": {},
        "data": {
            "Engineering": {
                "Mean": 40099006,
                "Min": 30,
                "Max": 200000000
            },
            "Banking": {
                "Mean": 90000,
                "Min": 90000,
                "Max": 90000
            },
            "Operations": {
                "Mean": 35015,
                "Min": 30,
                "Max": 70000
            },
            "Administration": {
                "Mean": 30,
                "Min": 30,
                "Max": 30
            }
        }
    }
    ```
6.  Fetch Summary Statistics for Salary (By Department and Sub-Department):

    Endpoint: `GET /api/v1/allStatOnDeptSubdept`
    ### Example:
    URL: `http://localhost:5000/api/v1/allStatOnDeptSubdept`
    ```
    {
        "message": "Successfully fetched Salary Stats onDeptSubDept",
        "success": true,
        "err": {},
        "data": {
            "Engineering": [
                {
                    "subDepartment": "Platform",
                    "salary": {
                        "Mean": 40099006,
                        "Min": 30,
                        "Max": 200000000
                    }
                }
            ],
            "Banking": [
                {
                    "subDepartment": "Loan",
                    "salary": {
                        "Mean": 90000,
                        "Min": 90000,
                        "Max": 90000
                    }
                }
            ],
            "Operations": [
                {
                    "subDepartment": "CustomerOnboarding",
                    "salary": {
                        "Mean": 35015,
                        "Min": 30,
                        "Max": 70000
                    }
                }
            ],
            "Administration": [
                {
                    "subDepartment": "Agriculture",
                    "salary": {
                        "Mean": 30,
                        "Min": 30,
                        "Max": 30
                    }
                },
                {
                    "subDepartment": "Ooo",
                    "salary": {
                        "Mean": 50,
                        "Min": 30,
                        "Max": 70
                    }
                }
            ]
        }
    }
    ```
7.  Create user:

    Endpoint: `POST /api/v1/createUser`
    ### Example:
    URL: `http://localhost:5000/api/v1/createUser`
    Input body should contain : email , password 
    ```
    {
        "email": "abcd@gmail.com",
        "password": "123456",
    }
    ```
    In Response it will give :
    ```
    {
        "message": "User added successfully",
        "success": true,
        "err": {},
        "data": [
            {
                "email": "abcd@gmail.com",
                "password": "$2b$10$/l5b.NG/IYkUT2kHCYFxpOAyvY3tth2TXP0L0niKSWVeSYRwKa04O"
            }
        ]
    }
    
    ```
8. Sign in User:

     Endpoint: `POST /api/v1/signin`
    ### Example:
     URL: `http://localhost:5000/api/v1/signin`
     Input body should contain : email , password
    ```
    {
        "email": "abcd@gmail.com",
        "password": "123456",
    }
    ```
    In Response it will give :
    ```
    {
        "message": "User logged in successfully",
        "success": true,
        "err": {},
        "data": [
            {
                "email": "abcd@gmail.com",
                "password": "$2b$10$/l5b.NG/IYkUT2kHCYFxpOAyvY3tth2TXP0L0niKSWVeSYRwKa04O"
            }
        ],
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY2RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkL2w1Yi5ORy9JWWtVVDJrSENZRnhwT0F5dlkzdHRoMlRYUDBMMG5pS1NXVmVTWVJ3S2EwNE8iLCJpYXQiOjE2OTU0MDQ2OTUsImV4cCI6MTY5NTQxMTg5NX0.2rCoNfeGLO_Ul0lC6IbTF8xeu_v-uUTfHem8Kh_InXg"
    }
    ```

## Note: The API's from 1 to 6 should have Bearer token (after sign in)
## Please add .env file and initialize JWT_SECRET environment