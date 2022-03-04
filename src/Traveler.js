class Traveler {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.travelerType = data.travelerType;
    this.trips = [];
  }
  returnFirstName() {
    const firstName = this.name.split(' ')[0];
    return firstName;
  }
  findMyTrips(trips) {
    trips.forEach(trip => {
      if (trip.userID === this.id) {
        this.trips.push(trip);
      }
    });
  }
  findMyDestinations(destinations) {
    if (this.trips.length) {
      this.trips.map(trip => trip.destination = destinations.find(destination => destination.id === trip.destinationID));
    }
  }
  calculateAnnualExpenses() {
    const currentYear = (new Date()).getFullYear().toString();
    const tripsThisYear = this.trips.filter(trip => trip.date.includes(currentYear)).filter(trip => trip.status === 'approved');
    if (tripsThisYear.length) {
      const tripsCost = tripsThisYear.reduce((acc, trip) => {
        acc += (trip.duration * trip.destination.estimatedLodgingCostPerDay) + (trip.travelers * trip.destination.estimatedFlightCostPerPerson);
        return acc;
      }, 0);
      const totalCost = tripsCost + (tripsCost * .10);
      return totalCost;
    } else {
      return 0;
    }
  }
}

export default Traveler;
