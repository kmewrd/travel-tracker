import helperFunctions from './utils';

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
  },
  renderPendingTrips(trips) {
    const pendingTrips = document.querySelector('.js-pending-trips');
    pendingTrips.innerHTML = '';
    trips.forEach(trip => {
      if (trip.status === 'pending') {
        pendingTrips.innerHTML += `
        <div>
          <p>Destination: ${trip.destination.location}</p>
          <p>Start date: ${trip.date}</p>
          <p>Duration of stay: ${trip.duration} days</p>
          <p>Number of guests: ${trip.travelers}</p>
        </div>
        `
      }
    })
  },
  renderPastTrips(trips) {
    // need to get today's date before I can complete this function
    const today = helperFunctions.getTodayDate();
    console.log(today);
    const pastTrips = document.querySelector('.js-past-trips');
    pastTrips.innerHTML = '';
    trips.forEach(trip => {
      if (trip.status === 'approved') {
        pastTrips.innerHTML += `
        <div>
          <p>Destination: ${trip.destination.location}</p>
          <p>Start date: ${trip.date}</p>
          <p>Duration of stay: ${trip.duration} days</p>
          <p>Number of guests: ${trip.travelers}</p>
        </div>
        `
      }
    })
  },
  renderAnnualTravelExpenses() {
    const year = (new Date()).getFullYear().toString();
    console.log(year);
  }
};

export default domUpdates;
