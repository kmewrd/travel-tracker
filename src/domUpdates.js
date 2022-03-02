const upcomingTrips = document.querySelector('.js-upcoming-trips');
const pendingTrips = document.querySelector('.js-pending-trips');
const pastTrips = document.querySelector('.js-past-trips');
const travelExpenses = document.querySelector('.js-travel-expenses');

const domUpdates = {
  renderName(name) {
    const travelerName = document.getElementById('travelerName');
    const firstName = name.split(" ")[0];
    travelerName.innerText = `${firstName}`;
  }
};

export default domUpdates;
