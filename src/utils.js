const helperFunctions = {
  formatDateWithDay(trips) {
    const options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};
    const formattedTrips = trips.map(trip => {
      trip.date = new Date(trip.date).toLocaleString('en-US', options);
      return trip;
    });
    return formattedTrips;
  },
  formatMonthYear(trips) {
    const options = {year: 'numeric', month: 'short'};
    const formattedTrips = trips.map(trip => {
      trip.date = new Date(trip.date).toLocaleString('en-US', options);
      return trip;
    });
    return formattedTrips;
  }
};

export default helperFunctions;
