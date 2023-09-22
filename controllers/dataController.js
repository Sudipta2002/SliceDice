// const db = require('../Store/dataStore.js');
let db = [{
        "name": "Abhishek",
        "salary": "145000",
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform"
    },
    {
        "name": "Anurag",
        "salary": "90000",
        "currency": "USD",
        "department": "Banking",
        "on_contract": "true",
        "sub_department": "Loan"
    },
    {
        "name": "Himani",
        "salary": "240000",
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform"
    },
    {

        "name": "Yatendra",
        "salary": "30",
        "currency": "USD",
        "department": "Operations",
        "sub_department": "CustomerOnboarding"
    },
    {
        "name": "Ragini",
        "salary": "30",
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform"
    },
    {
        "name": "Nikhil",
        "salary": "110000",
        "currency": "USD",
        "on_contract": "true",
        "department": "Engineering",
        "sub_department": "Platform"
    },
    {
        "name": "Guljit",
        "salary": "30",
        "currency": "USD",
        "department": "Administration",
        "sub_department": "Agriculture"
    },
    {
        "name": "Sudipta",
        "salary": "70",
        "currency": "USD",
        "department": "Administration",
        "sub_department": "Ooo"
    },
    {
        "name": "Agita",
        "salary": "30",
        "currency": "USD",
        "department": "Administration",
        "sub_department": "Ooo"
    },
    {
        "name": "Himanshu",
        "salary": "70000",
        "currency": "EUR",
        "department": "Operations",
        "sub_department": "CustomerOnboarding"
    },
    {
        "name": "Anupam",
        "salary": "200000000",
        "currency": "INR",
        "department": "Engineering",
        "sub_department": "Platform"
    }
];
const asyncHandler = require('express-async-handler');

function calculateSS(salaries) {
    if (salaries.length === 0) {
        return { Mean: 0, Min: 0, Max: 0 };
    }

    const mean = salaries.reduce((acc, salary) => acc + salary, 0) / salaries.length;
    const min = Math.min(...salaries);
    const max = Math.max(...salaries);

    return { Mean: mean, Min: min, Max: max };
}

const addRecord = asyncHandler(async(req, res) => {
    try {
        const newRecord = req.body;
        db.push(newRecord);
        res.status(201).json({
            message: 'Record added successfully',
            success: true,
            err: {},
            data: db
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
    }
});
const getAllSS = asyncHandler(async(req, res) => {
    try {
        const salaries = db.map((record) => record.salary);

        const mean = salaries.reduce((acc, salary) => acc + salary, 0) / salaries.length;
        const min = Math.min(...salaries);
        const max = Math.max(...salaries);
        const response = {
            Mean: mean,
            Min: min,
            Max: max
        }
        return res.status(201).json({
            message: "Successfully fetched Salary Stats",
            success: true,
            err: {},
            data: response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
    }
});
const deleteRecord = asyncHandler(async(req, res) => {
    try {
        // console.log(req);
        const recordName = req.params.name;
        const recordDepartment = req.params.dpt;
        const criteria = {
            name: recordName,
            department: recordDepartment
        }
        console.log(recordName);
        const index = db.findIndex((record) => {
            return Object.keys(criteria).every((key) => record[key] === criteria[key]);
        });

        if (index !== -1) {
            db.splice(index, 1);
            res.json({
                message: 'Record deleted successfully',
                success: true,
                err: {},
                data: db
            });
        } else {
            res.status(404).json({
                message: 'Record not found',
                success: false,
                data: {}
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
    }
});
const getAllSSonContract = asyncHandler(async(req, res) => {
    try {

        const onContractRecords = db.filter((record) => record.on_contract === "true");

        if (onContractRecords.length === 0) {
            return res.status(404).json({ message: 'No records with "on_contract" true found' });
        }

        const salaries = onContractRecords.map((record) => record.salary);


        const mean = salaries.reduce((acc, salary) => acc + salary, 0) / salaries.length;
        const min = Math.min(...salaries);
        const max = Math.max(...salaries);
        const response = {
            Mean: mean,
            Min: min,
            Max: max
        }
        return res.status(201).json({
            message: "Successfully fetched Salary Stats onContract",
            success: true,
            err: {},
            data: response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
    }
});
const getAllStatonDept = asyncHandler(async(req, res) => {

    try {

        const departmentList = {};
        db.forEach((record) => {
            const department = record.department;
            const salary = Number(record.salary);

            if (!departmentList[department]) {
                departmentList[department] = [];
            }
            departmentList[department].push(salary);
        })
        const response = {};
        for (const dpt in departmentList) {
            if (departmentList.hasOwnProperty(dpt)) {
                const salaries = departmentList[dpt];
                response[dpt] = calculateSS(salaries);
            }
        }
        return res.status(201).json({
            message: "Successfully fetched Salary Stats onDept",
            success: true,
            err: {},
            data: response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
    }
});
const getAllStatonDeptSubDept = asyncHandler(async(req, res) => {

    try {

        const departmentList = {};
        db.forEach((record) => {
            const department = record.department;
            const subDepartment = record.sub_department;
            const salary = Number(record.salary);

            const key = `${department}+${subDepartment}`;

            if (!departmentList[key]) {
                departmentList[key] = [];
            }
            departmentList[key].push(salary);
        });

        const response = {};
        for (const dpt in departmentList) {
            if (departmentList.hasOwnProperty(dpt)) {
                const [dept, subDept] = dpt.split('+');
                const salaries = departmentList[dpt];
                // response[dpt] = calculateSS(salaries);
                if (!response[dept]) {
                    response[dept] = [];
                }

                response[dept].push({
                    subDepartment: subDept,
                    salary: calculateSS(salaries)
                })
            }
        }
        return res.status(201).json({
            message: "Successfully fetched Salary Stats onDeptSubDept",
            success: true,
            err: {},
            data: response
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        });
    }
});
module.exports = { addRecord, getAllSS, deleteRecord, getAllSSonContract, getAllStatonDept, getAllStatonDeptSubDept };