// type 1 - wage employee, type 2 - with fixed salary
let employeeType;

let employeesArr = [
    {id:0,lastName:'Mcfarlane',name:'Brittney',surname:'Hungry',salary:250},
    {id:1,lastName:'Castillo',name:'Dante',surname:'Juicer',salary:331.30},
    {id:2,lastName:'Dunn',name:'Livia',surname:'Earth-roamer',salary:600},
    {id:3,lastName:'Mann',name:'Yasmin',surname:'Grimy',salary:110},
    {id:4,lastName:'Allen',name:'Kirstie',surname:'Ana',salary:1500},
    {id:5,lastName:'Carson',name:'Evie-Rose',surname:'Madeleine',salary:2600.20},
    {id:6,lastName:'Zimmerman',name:'Lynn',surname:'Claire',salary:500},
    {id:7,lastName:'Briggs',name:'Sarah',surname:'Clawer',salary:550}
];

sortEmployees(employeesArr);
buildTables();

let id = 8;

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
    (employeeType == '1') ? employeesArr.push(new wageEmployee(id, employeeLastName, employeeName, employeeSurname, hourRate)) 
                          : employeesArr.push(new fixedRateEmployee(id, employeeLastName, employeeName, employeeSurname, fixedSalary));
    
    employeesArr[id].salaryPerMonth();
    id++; 

    // sort current employess array by salary and build tables
    sortEmployees(employeesArr);
    buildTables();
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

// Sort employees array function 
function sortEmployees(arr) {  
    arr.sort((obj1, obj2) => {
        return obj2.salary - obj1.salary;
    })
}

// Build tables functions
function buildTables() {
    $('.employeesTable tbody').html('');

    employeesArr.forEach(item => {
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

    employeesArr.slice(0, 5).forEach(item => {
        $('#topFiveEmployeesTable tbody').html(
            $('#topFiveEmployeesTable tbody').html() +
            `<tr>
                <td>${item.lastName}</td>
                <td>${item.name}</td>
                <td>${item.surname}</td>
                <td>${item.salary}</td>
            </tr>`
        );
    })

    employeesArr.slice(employeesArr.length - 3, employeesArr.length).forEach(item => {
        $('#lastThreeEmployeesTable tbody').html(
            $('#lastThreeEmployeesTable tbody').html() +
            `<tr>
                <td>${item.id}</td>
            </tr>`
        );
    })
}

