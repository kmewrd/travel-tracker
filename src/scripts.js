import './css/styles.css';
import {fetchData, postData} from './apiCalls';
import domUpdates from './domUpdates';
import helperFunctions from './utils';
import Traveler from './Traveler';
import Destination from './Destination';
import Trip from './Trip';

// query selectors
const bookingForm = document.querySelector('.booking-form');
const startDate = document.getElementById('start-date');
const tripDuration = document.getElementById('trip-duration');
const numOfGuests = document.getElementById('num-guests');
const tripDestination = document.getElementById('trip-destination');
const submitBookingButton = document.querySelector('.js-submit-booking-button');
const invalidDateErrorMessage = document.querySelector('.invalid-date-msg');
const emptyFieldsErrorMessage = document.querySelector('.empty-fields-msg');
const estimatedTripCost = document.querySelector('.trip-estimated-cost');

// global variables
let traveler;
let travelers;
let trips;
let destinations;

// functions
function fetchAllData() {
  Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
  .then(data => {
    initializeData(42, data[0], data[1], data[2]);
    updateDashboard();
  })
}

function initializeData(travelerID, travelerData, tripsData, destinationsData) {
  travelers = travelerData.map(traveler => new Traveler(traveler));
  trips = tripsData.map(trip => new Trip(trip));
  destinations = destinationsData.map(destination => new Destination(destination));
  traveler = travelers.find(traveler => traveler.id === travelerID)
  traveler.findMyTrips(trips);
  traveler.findMyDestinations(destinations);
}

function updateDashboard() {
  domUpdates.renderName(traveler.returnFirstName());
  getUpcomingTrips();
  getPastTrips();
  getPendingTrips();
  getAnnualTravelExpenses();
}

function getUpcomingTrips() {
  const today = {date: helperFunctions.getTodayDate()};
  const myTrips = [...traveler.trips];
  let upcomingTrips = [];
  myTrips.push(today);
  sortDateLeastRecent(myTrips);
  if (myTrips[myTrips.length - 1] === today) {
    console.log('There are no upcoming trips.')
  } else {
    console.log('You have trips coming up!')
    const todayIndex = myTrips.indexOf(today);
    upcomingTrips = myTrips.slice(todayIndex).filter(trip => trip.status === 'approved');
    domUpdates.renderUpcomingTrips(upcomingTrips);
  }
}

function getPastTrips() {
  const today = {date: helperFunctions.getTodayDate()};
  const myTrips = [...traveler.trips];
  let pastTrips = [];
  myTrips.push(today);
  sortDateMostRecent(myTrips);
  if (myTrips[0] === today) {
    myTrips.shift();
    pastTrips = [...myTrips];
    domUpdates.renderPastTrips(pastTrips);
  } else {
    const todayIndex = myTrips.indexOf(today);
    pastTrips = myTrips.slice(todayIndex).filter(trip => trip.status === 'approved');
    domUpdates.renderPastTrips(pastTrips);
  }
}

function getPendingTrips() {
  const myTrips = [...traveler.trips];
  const pendingTrips = myTrips.filter(trip => trip.status === 'pending');
  domUpdates.renderPendingTrips(pendingTrips);
}

function sortDateMostRecent(trips) {
  const tripsSorted = trips.sort((a, b) => new Date(b.date) - new Date(a.date));
  return tripsSorted;
}

function sortDateLeastRecent(trips) {
  const tripsSorted = trips.sort((a, b) => new Date(a.date) - new Date(b.date));
  return tripsSorted;
}

function getAnnualTravelExpenses() {
  const totalCost = traveler.calculateAnnualExpenses();
  domUpdates.renderAnnualTravelExpenses(totalCost);
}

function estimateTripCost() {
  const destinationID = parseInt(tripDestination.value);
  const myDestination = destinations.find(destination => destination.id === destinationID);
  const costBeforeAgencyFee = (tripDuration.value * myDestination.estimatedLodgingCostPerDay) + (numOfGuests.value * myDestination.estimatedFlightCostPerPerson);
  const estimatedTotal = costBeforeAgencyFee + (costBeforeAgencyFee * .10);
  return estimatedTotal;
}

function validateBookingForm(e) {
  if (!startDate.value || !tripDuration.value || !numOfGuests.value || tripDestination.value === '0') {
    show([emptyFieldsErrorMessage]);
  } else {
    console.log('No errors here!');
    const newTrip = makeTripObject();
    console.log(newTrip);
    hide([emptyFieldsErrorMessage]);
    show([estimatedTripCost]);
    const newTripCost = estimateTripCost();
    domUpdates.renderEstimatedTripCost(newTripCost);
  }
}

function validateTripDate(e) {
  const today = helperFunctions.getTodayDate();
  const tripStartDate = startDate.value;
  let dateCompare = [today, tripStartDate];
  dateCompare = dateCompare.sort((a, b) => new Date(a) - new Date(b));
  if (dateCompare[0] != today) {
    show([invalidDateErrorMessage]);
  } else {
    hide([invalidDateErrorMessage])
  }
}

function makeTripObject() {
  return {
    id: trips.length + 1,
    userID: traveler.id,
    destinationID: parseInt(tripDestination.value),
    travelers: parseInt(numOfGuests.value),
    date: startDate.value,
    duration: parseInt(tripDuration.value),
    status: 'pending',
    suggestedActivities: []
  }
}

function clearBookingForm() {
  startDate.value = '';
  tripDuration.value = '';
  numOfGuests.value = '';
  tripDestination.value = '0';
}

function show(elements) {
  return elements.forEach(element => element.classList.remove('hidden'));
}

function hide(elements) {
  elements.forEach(element => element.classList.add('hidden'));
}

// event listeners
window.addEventListener('load', fetchAllData);
bookingForm.addEventListener('input', function(e) {
  validateTripDate(e);
  // validateBookingForm(e);
});
submitBookingButton.addEventListener('click', function(e) {
  e.preventDefault();
  clearBookingForm();
});
