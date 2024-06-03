document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const employee = document.getElementById('employee').value;
    const time = document.getElementById('time').value;
    const bookingInfo = document.getElementById('bookingInfo');

    // Fetch existing bookings from local storage
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    // Check if employee already has two bookings
    const employeeBookings = bookings.filter(booking => booking.employee === employee);
    if (employeeBookings.length >= 2) {
        alert('You have already booked two breaks for today.');
        return;
    }

    // Check if there are already two bookings at the same time
    const timeBookings = bookings.filter(booking => booking.time === time);
    if (timeBookings.length >= 2) {
        alert('There are already two breaks booked for this time.');
        return;
    }

    // Add the new booking
    bookings.push({ employee, time });
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Display the booking
    const bookingElement = document.createElement('div');
    bookingElement.className = 'booking';
    bookingElement.innerHTML = `<p>${employee} has booked a break at ${time}.</p>
                                <button onclick="removeBooking('${employee}', '${time}')">Cancel</button>
                                <button onclick="startTimer('${time}')">Start Break</button>`;
    bookingInfo.appendChild(bookingElement);
});

function removeBooking(employee, time) {
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings = bookings.filter(booking => !(booking.employee === employee && booking.time === time));
    localStorage.setItem('bookings', JSON.stringify(bookings));
    location.reload();
}

function startTimer(time) {
    const timerDisplay = document.getElementById('timer');
    let countdown = 600; // 10 minutes in seconds

    const interval = setInterval(() => {
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;
        timerDisplay.innerHTML = `<div class="timer">${minutes}:${seconds < 10 ? '0' + seconds : seconds}</div>`;
        
        if (countdown <= 0) {
            clearInterval(interval);
            alert('Break time is over!');
            timerDisplay.innerHTML = '';
        }
        countdown--;
    }, 1000);
}
