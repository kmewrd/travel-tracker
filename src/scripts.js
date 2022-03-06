import './css/styles.css';
import {fetchData, postData} from './apiCalls';
import domUpdates from './domUpdates';
import helperFunctions from './utils';
import Traveler from './Traveler';
import Destination from './Destination';
import Trip from './Trip';

// query selectors
const bookingForm = document.querySelector('.js-booking-form');
const startDate = document.getElementById('start-date');
const tripDuration = document.getElementById('trip-duration');
const numOfGuests = document.getElementById('num-guests');
const tripDestination = document.getElementById('trip-destination');
const submitBookingButton = document.querySelector('.js-submit-booking-button');
const invalidDateErrorMessage = document.querySelector('.invalid-date-msg');
const invalidTripDurationMessage = document.querySelector('.invalid-duration-msg');
const invalidNumGuestsMessage = document.querySelector('.invalid-guests-msg');
const emptyFieldsErrorMessage = document.querySelector('.empty-fields-msg');
const estimatedTripCost = document.querySelector('.trip-estimated-cost');
const successMessage = document.querySelector('.success-message');
const userLogin = document.getElementById('username');
const userPassword = document.getElementById('password');
const invalidLoginErrorMessage = document.querySelector('.invalid-username-password-message');
const loginButton = document.querySelector('.js-login-button');

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
    generateBackgroundImage();
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
    // console.log('There are no upcoming trips.')
  } else {
    // console.log('You have trips coming up!')
    const todayIndex = myTrips.indexOf(today);
    upcomingTrips = myTrips.slice(todayIndex).filter(trip => trip.status === 'approved');
    upcomingTrips = helperFunctions.formatDateWithDay(upcomingTrips);
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
    pastTrips = helperFunctions.formatMonthYear(pastTrips);
    domUpdates.renderPastTrips(pastTrips);
  } else if (myTrips[myTrips.length - 1] != today) {
    const todayIndex = myTrips.indexOf(today);
    pastTrips = myTrips.slice(todayIndex).filter(trip => trip.status === 'approved');
    pastTrips = helperFunctions.formatMonthYear(pastTrips);
    domUpdates.renderPastTrips(pastTrips);
  } else {
    console.log('There are no past trips.')
  }
}

function getPendingTrips() {
  const myTrips = [...traveler.trips];
  let pendingTrips = myTrips.filter(trip => trip.status === 'pending');
  pendingTrips = helperFunctions.formatDateWithDay(pendingTrips);
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
  const costBeforeAgencyFee = (tripDuration.value * myDestination.estimatedLodgingCostPerDay) + (numOfGuests.value * myDestination.estimatedFlightCostPerPerson * 2);
  const estimatedTotal = costBeforeAgencyFee + (costBeforeAgencyFee * .10);
  return estimatedTotal;
}

function validateBookingForm() {
  const dateIsCorrect = validateTripDate();
  if (!startDate.value || !tripDuration.value || !numOfGuests.value || tripDestination.value === '0') {
    show([emptyFieldsErrorMessage]);
    return false;
  } else if (!dateIsCorrect) {
    show([invalidDateErrorMessage]);
    hide([estimatedTripCost, emptyFieldsErrorMessage]);
  } else {
    console.log('No errors here!');
    hide([emptyFieldsErrorMessage]);
    return true;
  }
}

function validateTripDate(e) {
  const today = helperFunctions.getTodayDate();
  const tripStartDate = startDate.value;
  let dateCompare = [today, tripStartDate];
  dateCompare = dateCompare.sort((a, b) => new Date(a) - new Date(b));
  if (dateCompare[0] != today) {
    show([invalidDateErrorMessage]);
    return false;
  } else {
    hide([invalidDateErrorMessage]);
    return true;
  }
}

function validateTripDuration() {
  if (tripDuration.value === '0') {
    show([invalidTripDurationMessage]);
    return false;
  } else {
    hide([invalidTripDurationMessage]);
    return true;
  }
}

function validateTripGuests() {
  if (numOfGuests.value === '0') {
    show([invalidNumGuestsMessage]);
    return false;
  } else {
    hide([invalidNumGuestsMessage]);
    return true;
  }
}

function checkFieldsToShowTripCost() {
  const dateIsCorrect = validateTripDate();
  if (startDate.value && tripDuration.value && numOfGuests.value && tripDestination.value != '0' && dateIsCorrect) {
    hide([emptyFieldsErrorMessage]);
    show([estimatedTripCost]);
    const newTripCost = estimateTripCost();
    domUpdates.renderEstimatedTripCost(newTripCost.toFixed(2));
  } else {
    hide([estimatedTripCost]);
  }
}

function makeTripObject() {
  return {
    id: trips.length + 1,
    userID: traveler.id,
    destinationID: parseInt(tripDestination.value),
    travelers: parseInt(numOfGuests.value),
    date: startDate.value.split('-').join('/'),
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

function submitBookingRequest() {
  const dateIsCorrect = validateTripDate();
  const durationIsValid = validateTripDuration();
  const numGuestsIsValid = validateTripGuests();
  if (startDate.value && tripDuration.value && numOfGuests.value && tripDestination.value != '0' && dateIsCorrect && durationIsValid && numGuestsIsValid) {
    const newTrip = makeTripObject();
    postData('trips', newTrip);
    hide([estimatedTripCost]);
    showSuccessMessage();
    clearBookingForm();
  }
}

function showSuccessMessage() {
  show([successMessage]);
  setTimeout(() => hide([successMessage]), 2000);
}

function show(elements) {
  return elements.forEach(element => element.classList.remove('hidden'));
}

function hide(elements) {
  elements.forEach(element => element.classList.add('hidden'));
}

function generateBackgroundImage() {
  const destinationID = getRandomDestinationID(destinations);
  const destination = destinations.find(destination => destination.id === destinationID);
  domUpdates.renderBackgroundImage(destination.image, destination.alt);
}

function getRandomDestinationID(destinations) {
  let destinationID = Math.floor(Math.random() * destinations.length);
  if (destinationID === 0) {
    destinationID += 1;
  }
  return destinationID;
}

// function authenticateUser() {
//
// }

function validateUsername() {
  let username = userLogin.value;
  if (username.length < 9) {
    show([invalidLoginErrorMessage]);
  } else {
    const letters = username.split('').slice(0, 8).join('');
    const number = parseInt(username.split('').slice(8).join(''));
    username = [letters, number];
    return username;
  }
}

// event listeners
window.addEventListener('load', fetchAllData);
loginButton.addEventListener('click', function(e) {
  validateUsername();
  // authenticateUser();
});

bookingForm.addEventListener('input', function() {
  validateTripDate();
  validateTripDuration();
  validateTripGuests();
  checkFieldsToShowTripCost();
});

submitBookingButton.addEventListener('click', function(e) {
  e.preventDefault();
  validateBookingForm();
  submitBookingRequest();
  fetchAllData();
});
