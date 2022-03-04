import helperFunctions from './utils';

const domUpdates = {
  renderName(firstName) {
    const travelerName = document.getElementById('travelerName');
    travelerName.innerText = `${firstName}`;
  },
  renderUpcomingTrips(trips) {
    if (trips.length) {
      const upcomingTrips = document.querySelector('.js-upcoming-trips');
      upcomingTrips.innerHTML = '';
      trips.forEach(trip => {
        upcomingTrips.innerHTML += `
        <div>
        <p>Destination: ${trip.destination.location}</p>
        <p>Start date: ${trip.date}</p>
        <p>Duration of stay: ${trip.duration} days</p>
        <p>Number of guests: ${trip.travelers}</p>
        </div>
        `
      })
    }
  },
  renderPendingTrips(trips) {
    if (trips.length) {
      const pendingTrips = document.querySelector('.js-pending-trips');
      pendingTrips.innerHTML = '';
      trips.forEach(trip => {
        pendingTrips.innerHTML += `
        <div>
        <p>Destination: ${trip.destination.location}</p>
        <p>Start date: ${trip.date}</p>
        <p>Duration of stay: ${trip.duration} days</p>
        <p>Number of guests: ${trip.travelers}</p>
        </div>
        `
      })
    }
  },
  renderPastTrips(trips) {
    if (trips.length) {
      const pastTrips = document.querySelector('.js-past-trips');
      pastTrips.innerHTML = '';
      trips.forEach(trip => {
        pastTrips.innerHTML += `
        <article class="trip-card">
          <img class="destination-image" src="${trip.destination.image} alt="${trip.destination.alt}"">
          <div class="trip-details">
            <div class="past-trip-line-1">
              <p class="location-name">${trip.destination.location}</p>
              <p>${trip.date}</p>
            </div>
            <div class="past-trip-line-2">
              <p class="card-text-secondary">${trip.duration} days <span class="dot-divider">•</span> ${trip.travelers} guests</p>
            </div>
          </div>
        </article>
        `
      });
    }
  },
  renderAnnualTravelExpenses(cost) {
    const travelExpenses = document.querySelector('.js-travel-expenses');
    travelExpenses.innerText = `$${cost}.00`;
  }
};

export default domUpdates;
