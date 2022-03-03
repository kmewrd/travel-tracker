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
}

export default Traveler;
