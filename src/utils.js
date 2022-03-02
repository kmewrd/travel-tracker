const helperFunctions = {
  getTodayDate() {
    const today = new Date();
    console.log(today);
    const mm = (today.getMonth() + 1).toString().padStart(2, '0');
    console.log(mm);
    const dd = today.getDate().toString().padStart(2, '0');
    console.log(dd);
    const yyyy = today.getFullYear().toString();
    console.log(yyyy);
    return today;
  }
};

export default helperFunctions;
