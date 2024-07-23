/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// Function to create an employee record from an array
// Function to create an employee record from an array
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
        allWagesFor: allWagesFor
    };
}

// Function to create multiple employee records from an array of arrays
function createEmployeeRecords(arrOfArrs) {
    return arrOfArrs.map(arr => createEmployeeRecord(arr));
}

// Function to create a time-in event for an employee
function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });

    return this;
}

// Function to create a time-out event for an employee
function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });

    return this;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(event => event.date === date);
    let timeOut = this.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(date) {
    let hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
}

// Method to calculate all wages for an employee
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    });

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0); // <== We need to add bind() here to ensure `this` refers to the employee object

    return payable;
}

// Function to find an employee by their first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// Function to calculate the payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor.call(employee);
    }, 0);
}

// Example usage
let employees = createEmployeeRecords([
    ["Gray", "Worm", "Security", 1],
    ["Missandei", "N/A", "Advisor", 10]
]);

createTimeInEvent.call(employees[0], "2023-07-22 0800");
createTimeOutEvent.call(employees[0], "2023-07-22 1600");

console.log(hoursWorkedOnDate.call(employees[0], "2023-07-22")); // Should print 8
console.log(wagesEarnedOnDate.call(employees[0], "2023-07-22")); // Should print 8 (assuming payPerHour is 1)
console.log(employees[0].allWagesFor()); // Should print 8

console.log(findEmployeeByFirstName(employees, "Gray")); // Should return the employee object for Gray

console.log(calculatePayroll(employees)); // Should print the total payroll for all employees
