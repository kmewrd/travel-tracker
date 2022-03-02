class Trip {
  constructor(data) {
    this.id = data.id;
    this.userID = data.userID;
    this.destinationID = data.destinationID;
    this.travelers = data.travelers;
    this.date = data.date;
    this.duration = data.duration;
    this.status = data.status;
    this.suggestedActivities = data.suggestedActivities;
  }
  getDestinationDetails(destinations) {
    this.destination = destinations.find(destination => destination.id === this.destinationID);
  }
}

export default Trip;
