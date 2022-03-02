import './css/styles.css';
import {fetchData, fetchTravelers, postData} from './apiCalls';
import Traveler from './Traveler';
import Destination from './Destination';
import Trip from './Trip';

// global variables
let traveler;
let travelers;
let trips;
let destinations;

// functions
function fetchAllData() {
  Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
  .then(data => {
    console.log(data);

  })
}

function initializeData(travelerID, travelerData, tripsData, destinationsData) {
  travelers = travelerData.map(traveler => new Traveler(traveler));
  trips = tripsData.map(trip => new Trip(trip));
  destinations = destinationsData.map(destination => new Destination(destination));
  traveler = travelers.find(traveler => traveler.id === travelerID)
  traveler.findMyTrips(trips);
  console.log(travelers);
  console.log(trips);
  console.log(destinations);
  console.log(traveler);
}

// event listeners
window.addEventListener('load', function() {
  fetchAllData();
});
