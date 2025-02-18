
document.addEventListener("DOMContentLoaded", () => {
    const bookButtons = document.querySelectorAll(".book-btn");
    const modal = document.getElementById("booking-modal");
    const closeModal = document.querySelector(".close");
    const form = document.getElementById("booking-form");
    const confirmationPopup = document.getElementById("confirmation-popup");
    const confirmationMessage = document.getElementById("confirmation-message");
    const closePopup = document.getElementById("close-popup");
    const appointmentList = document.getElementById("appointment-list");

    let selectedService = "";

    bookButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedService = button.getAttribute("data-service");
            modal.style.display = "block";
            document.getElementById("service").value = selectedService;
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    closePopup.addEventListener("click", () => {
        confirmationPopup.style.display = "none";
    });

    function validateForm() {
        let isValid = true;

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const datetime = document.getElementById("datetime").value;
        const terms = document.getElementById("terms").checked;

        document.getElementById("name-error").textContent = name ? "" : "Name is required";
        document.getElementById("email-error").textContent = /\S+@\S+\.\S+/.test(email) ? "" : "Invalid email";
        document.getElementById("phone-error").textContent = /^\d{10}$/.test(phone) ? "" : "Phone must be 10 digits";
        document.getElementById("datetime-error").textContent = new Date(datetime) > new Date() ? "" : "Date must be in future";
        document.getElementById("terms-error").textContent = terms ? "" : "You must agree to terms";

        isValid = name && /\S+@\S+\.\S+/.test(email) && /^\d{10}$/.test(phone) && new Date(datetime) > new Date() && terms;
        
        return isValid;
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const name = document.getElementById("name").value;
        const datetime = document.getElementById("datetime").value;

        const appointment = { name, service: selectedService, datetime, status: "Pending" };
        saveAppointment(appointment);

        confirmationMessage.textContent = `Thank you, ${name}! Your appointment for ${selectedService} on ${datetime} is confirmed.`;
        confirmationPopup.style.display = "block";
        modal.style.display = "none";

        form.reset();
        loadAppointments();
    });

    function saveAppointment(appointment) {
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));
    }

    function loadAppointments() {
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointmentList.innerHTML = appointments.map(app => `<tr>
            <td>${app.name}</td>
            <td>${app.service}</td>
            <td>${app.datetime}</td>
            <td>${app.status}</td>
        </tr>`).join("");
    }

    loadAppointments();
});
