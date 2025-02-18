const form = document.getElementById('appointmentForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const service = document.getElementById('service');
const datetime = document.getElementById('datetime');
const agreeTerms = document.querySelector('input[name="agreeTerms"]');
const appointmentsTable = document.getElementById('appointmentsTable').getElementsByTagName('tbody')[0];
const overlay = document.getElementById('overlay');
const confirmationPopup = document.getElementById('confirmationPopup');
const popupMessage = document.getElementById('popupMessage');
const closePopup = document.getElementById('closePopup');

const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const serviceError = document.getElementById('serviceError');
const datetimeError = document.getElementById('datetimeError');
const termsError = document.getElementById('termsError');

function validateInput() {
    let isValid = true;

    if (fullName.value.trim() === '') {
        fullNameError.textContent = 'Full Name is required.';
        isValid = false;
    } else {
        fullNameError.textContent = '';
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email.value)) {
        emailError.textContent = 'Invalid email format.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone.value)) {
        phoneError.textContent = 'Phone number must be 10 digits.';
        isValid = false;
    } else {
        phoneError.textContent = '';
    }

    if (service.value === '') {
        serviceError.textContent = 'Please select a service.';
        isValid = false;
    } else {
        serviceError.textContent = '';
    }

    const selectedDate = new Date(datetime.value);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
        datetimeError.textContent = 'Date and time must be in the future.';
        isValid = false;
    } else {
        datetimeError.textContent = '';
    }

    if (!agreeTerms.checked) {
        termsError.textContent = 'You must agree to the terms.';
        isValid = false;
    } else {
        termsError.textContent = '';
    }

    return isValid;
}

function addAppointment(appointment) {
    const row = appointmentsTable.insertRow();
    row.insertCell(0).textContent = appointment.fullName;
    row.insertCell(1).textContent = appointment.service;
    row.insertCell(2).textContent = appointment.datetime;
    row.insertCell(3).textContent = "Pending";
}

function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.forEach(addAppointment);
}

function saveAppointments(appointments) {
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateInput()) {
        const appointment = {
            fullName: fullName.value,
            email: email.value,
            phone: phone.value,
            service: service.value,
            datetime: datetime.value,
            status: "Pending"
        };

        addAppointment(appointment);

        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.push(appointment);
        saveAppointments