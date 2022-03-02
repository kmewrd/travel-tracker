const pendingTrips = document.querySelector('.js-pending-trips');
const pastTrips = document.querySelector('.js-past-trips');
const travelExpenses = document.querySelector('.js-travel-expenses');

const domUpdates = {
  renderName(name) {
    const travelerName = document.getElementById('travelerName');
    const firstName = name.split(" ")[0];
    travelerName.innerText = `${firstName}`;
  },
  renderUpcomingTrips(trips) {
    const upcomingTrips = document.querySelector('.js-upcoming-trips');
    upcomingTrips.innerHTML = '';
    trips.forEach(trip => {
      if (trip.status === 'approved') {
        upcomingTrips.innerHTML += `
        <div>
          <p>Destination: ${trip.destination.location}</p>
          <p>Start date: ${trip.date}</p>
          <p>Duration of stay: ${trip.duration} days</p>
          <p>Number of guests: ${trip.travelers}</p>
        </div>
        `
      }
    })
  }
};

export default domUpdates;
