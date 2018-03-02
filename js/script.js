// type 1 - wage employee, type 2 - with fixed salary
let employeeType;
let employeesArray = [];
let id = 0;

// Work with employee type
$('input[name="employeeType"]').change(() => {
    employeeType = $('input[name="employeeType"]:checked').val();
    
    if(employeeType == '1') {
        $('#fixed-salary').prop('disabled', true);
        $('#fixed-salary').val('');
        $('#hour-rate').prop('disabled', false).prop("required", true);
    } else {
        $('#fixed-salary').prop('disabled', false).prop("required", true);
        $('#hour-rate').prop('disabled', true);
        $('#hour-rate').val('');
    };
});

// Get data from form
function getEmployeeData() {
    let employeeLastName = $('#last-name').val();
    let employeeName = $('#name').val();
    let employeeSurname = $('#surname').val();
    let hourRate = +$('#hour-rate').val();
    let fixedSalary = +$('#fixed-salary').val();

    createEmployee(employeeLastName, employeeName, employeeSurname, hourRate, fixedSalary);
}

// Choose which type of employee create
function createEmployee(employeeLastName, employeeName, employeeSurname, hourRate, fixedSalary) {
    (employeeType == '1') ? employeesArray.push(new wageEmployee(id, employeeLastName, employeeName, employeeSurname, hourRate)) 
                          : employeesArray.push(new fixedRateEmployee(id, employeeLastName, employeeName, employeeSurname, fixedSalary));
    
    employeesArray[id].salaryPerMonth();
    id++; 

    buildTable();
}

// Base employee constructor
class Employee {
    constructor(id, lastName, name, surname, salary) {
        this.id = id;
        this.lastName = lastName,
        this.name = name,
        this.surname = surname,
        this.salary = salary
    }

    salaryPerMonth() {
        return this.salary;
    }
}

// Create wage employee
class wageEmployee extends Employee {
    salaryPerMonth() {
        this.salary =  (20.8 * 8 * this.salary).toFixed(2);
    }
}

// Create employee with fixed rate
class fixedRateEmployee extends Employee {
    salaryPerMonth() {
        return this.salary;
    }
}

// Build tables functions
function buildTable() {
    $('#allEmployeesTable tbody').html('');

    employeesArray.forEach(item => {
        $('#allEmployeesTable tbody').html(
            $('#allEmployeesTable tbody').html() +
            `<tr>
                <th>${item.id}</th>
                <td>${item.lastName}</td>
                <td>${item.name}</td>
                <td>${item.surname}</td>
                <td>${item.salary}</td>
            </tr>`
        );
    })
}

