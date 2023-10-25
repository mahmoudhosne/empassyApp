'use strict';
//get dom element by id
const getDomEleById = function (domClassName) {
  return document.getElementById(`${domClassName}`);
};
// get dom element by querry selector
const getDomEle = function (domClassName) {
  return document.querySelector(`.${domClassName}`);
};
// remove classes
const removeClass = function (elementName, className) {
  return elementName.classList.remove(`${className}`);
};
// add classes
const addClass = function (elementName, className) {
  return elementName.classList.add(`${className}`);
};

// html elements
const inputField = getDomEle('input-username');
const inputPinCodeField = getDomEle('input-pincode');
const btnLoginSeurity = getDomEle('btn__in--security');
const btnLoginEmp = getDomEle('btn__in');
const btnLogOutEmp = getDomEle('btn__out');
const bottomCol = getDomEle('bottom-col');
const table = getDomEle('table');
const securityName = getDomEle('security-Name');
const dateDay = getDomEle('date-day');

const security1 = {
  name: 'mahmoud hassan',
  pin: 1111,
  department: 'seguridad',
};

const emp1 = {
  name: 'morgan ahmed',
  department: 'security',
  code: 1,
};
const emp2 = {
  name: 'taha ali',
  department: 'passports',
  code: 2,
};

const securityEmp = [security1];

const empassyEmp = [emp1, emp2];

// create user name

const createUserName = function (arr) {
  return arr.forEach(element => {
    element.username = element.name
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserName(securityEmp);

let dateToday;
const movements = [];
btnLoginSeurity.addEventListener('click', function (e) {
  e.preventDefault();
  const currentEmployee = securityEmp.find(
    sec => sec.username === inputField.value
  );
  if (currentEmployee && currentEmployee?.pin === +inputPinCodeField.value) {
    dateToday = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date());

    inputPinCodeField.style.display = 'none';
    inputPinCodeField.value = inputField.value = '';
    inputPinCodeField.blur();
    securityName.textContent = `${currentEmployee.name}`;
    securityName.style.textTransform = 'capitalize';
    dateDay.textContent = `${dateToday}`;
    dateDay.style.textTransform = 'capitalize';
    btnLoginSeurity.style.display = 'none';
    btnLoginEmp.style.display = 'inline';
    inputField.maxLength = 2;
    inputField.placeholder = 'Code';
  }
});

let number = 0;
let currentEmployee;

btnLoginEmp.addEventListener('click', function (e) {
  e.preventDefault();
  currentEmployee = empassyEmp.find(
    employee => employee.code === +inputField.value
  );
  if (currentEmployee) {
    const employeeToday = movements.find(
      emp => emp.empCode === currentEmployee.code
    );

    if (employeeToday) {
      if (employeeToday?.type !== 'in') {
        employeeToday.date = dateToday;
        employeeToday.type = 'in';
        movements.push({
          empCode: currentEmployee.code,
          department: currentEmployee.department,
          date: employeeToday.date,
          type: employeeToday.type,
        });
        bottomCol.style.opacity = '100';

        const html = ` <tr>
                    
                    <td>${currentEmployee.code}</td>
                    <td>${currentEmployee.name}</td>
                    <td>${currentEmployee.department}</td>
                    <td>${currentEmployee.date}</td>
                    <td>${currentEmployee.type}</td>
                </tr>
                `;
        table.insertAdjacentHTML('beforeend', html);
      }
    } else {
      currentEmployee.date = dateToday;
      currentEmployee.type = 'in';
      movements.push({
        empCode: currentEmployee.code,
        department: currentEmployee.department,
        date: currentEmployee.date,
        type: currentEmployee.type,
      });
      bottomCol.style.opacity = '100';

      const html = ` <tr>
                 
                  <td>${currentEmployee.code}</td>
                  <td>${currentEmployee.name}</td>
                  <td>${currentEmployee.department}</td>
                  <td>${currentEmployee.date}</td>
                  <td>${currentEmployee.type}</td>
              </tr>
              `;
      table.insertAdjacentHTML('beforeend', html);
    }
  }
  inputField.value = '';
  inputField.blur();
});

btnLogOutEmp.addEventListener('click', function (e) {
  e.preventDefault();
  currentEmployee = empassyEmp.find(emp => emp.code === +inputField.value);

  const employeeInMovs = movements.find(
    emp => emp.empCode === +inputField.value
  );

  if (employeeInMovs?.type !== 'out') {
    employeeInMovs.date = dateToday;
    employeeInMovs.type = 'out';
    movements.push({
      empCode: currentEmployee.code,
      department: currentEmployee.department,
      date: employeeInMovs.date,
      type: employeeInMovs.type,
    });

    const html = ` <tr>
                <td>${currentEmployee.code}</td>
                <td>${currentEmployee.name}</td>
                <td>${currentEmployee.department}</td>
                <td>${employeeInMovs.date}</td>
                <td>${employeeInMovs.type}</td>
            </tr>
            `;
    table.insertAdjacentHTML('beforeend', html);
  }
  inputField.value = '';
  inputField.blur();
});
