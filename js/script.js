let employeeType;
let employeesArray = [];

// Work with employee type
$('form').change(() => {
    employeeType = $('input[name="employeeType"]:checked').val();
    
    if(employeeType == '1') {
        $('#fixed-salary').prop('disabled', true);
        $('#hour-rate').prop('disabled', false).prop("required", true);
    } else {
        $('#fixed-salary').prop('disabled', false).prop("required", true);
        $('#hour-rate').prop('disabled', true);
    };
});

// Get data from form
function getEmployeeData() {
    let employeeLastName = $('#last-name').val();
    let employeeName = $('#name').val();
    let employeeSurname = $('#surname').val();

    createEmployee(employeeLastName, employeeName, employeeSurname);
}

// Choose which type of employee create
function createEmployee(employeeLastName, employeeName, employeeSurname) {
    if(employeeType == '1') {
        let salary = 123;
        employeesArray.push(new wageEmployee(employeeLastName, employeeName, employeeSurname, salary))
    }
    console.log(employeesArray);
}

// TODO Add salary per month method
class Employee {
    constructor(lastName, name, surname) {
        this.lastName = lastName,
        this.name = name,
        this.surname = surname
    }
}

class wageEmployee extends Employee {
    constructor(lastName, name, surname, hourRate) {
        super(lastName, name, surname);
        this.salary = 20.8 * 8 * hourRate;
    }
}

