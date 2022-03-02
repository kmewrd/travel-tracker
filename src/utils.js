const helperFunctions = {
  getTodayDate() {
    const today = new Date();
    console.log(today);
    const dd = today.getDate().toString().padStart(2, '0');
    console.log(dd);
    return today;
  }
};

export default helperFunctions;
