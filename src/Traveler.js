class Traveler {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.travelerType = data.travelerType;
    this.trips = [];
  }
  findMyTrips(trips) {
    trips.forEach(trip => {
      if (trip.userID === this.id) {
        this.trips.push(trip);
      }
    });
  }
}

export default Traveler;
