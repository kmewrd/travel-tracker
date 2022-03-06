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
        <article class="trip-card">
          <img class="destination-image" src="${trip.destination.image}" alt="${trip.destination.alt}">
          <div class="trip-details">
            <h3 class="location-name">${trip.destination.location}</h3>
            <p>Departure: ${trip.date}</p>
            <p>Status: <span class="status-approved">${trip.status}</span></p>
            <p class="card-text-secondary">${trip.duration} days <span class="dot-divider">•</span> ${trip.travelers} guests</p>
          </div>
        </article>
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
        <article class="trip-card">
          <img class="destination-image" src="${trip.destination.image}" alt="${trip.destination.alt}">
          <div class="trip-details">
            <h3 class="location-name">${trip.destination.location}</h3>
            <p>Departure: ${trip.date}</p>
            <p>Status: <span class="status-pending">${trip.status}</span></p>
            <p class="card-text-secondary">${trip.duration} days <span class="dot-divider">•</span> ${trip.travelers} guests</p>
          </div>
        </article>
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
        <article class="past-trip-card">
          <img class="past-destination-image" src="${trip.destination.image}" alt="${trip.destination.alt}">
          <div class="past-trip-details">
              <h3 class="past-location-name">${trip.destination.location}</h3>
              <p>${trip.date}</p>
              <p class="card-text-secondary">${trip.duration} days <span class="dot-divider">•</span> ${trip.travelers} guests</p>
          </div>
        </article>
        `
      });
    }
  },
  renderAnnualTravelExpenses(cost) {
    const travelExpenses = document.querySelector('.js-travel-expenses');
    travelExpenses.innerText = `$${cost}.00`;
  },
  renderEstimatedTripCost(cost) {
    const estimatedCost = document.querySelector('.trip-estimated-cost');
    estimatedCost.innerText = `Estimated cost: $${cost}`;
  },
  renderBackgroundImage(src, alt) {
    const backgroundImage = document.querySelector('.js-background-image');
    backgroundImage.src = `${src}`;
    backgroundImage.alt = `${alt}`;
  }
};

export default domUpdates;
