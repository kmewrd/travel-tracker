const helperFunctions = {
  getTodayDate() {
    const today = new Date();
    const mm = (today.getMonth() + 1).toString().padStart(2, '0');
    const dd = today.getDate().toString().padStart(2, '0');
    const yyyy = today.getFullYear().toString();
    return `${yyyy}/${mm}/${dd}`;
  },
  formatDateWithDay(trips) {
    const options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'};
    const formattedTrips = trips.map(trip => {
      trip.date = new Date(trip.date).toLocaleString('en-US', options);
      return trip;
    });
    console.log(formattedTrips);
    return formattedTrips;
  }
};

export default helperFunctions;
