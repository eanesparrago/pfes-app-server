export default (key, order = false) => {
  return function(a, b) {
    // Check if property exists on either objects
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    let varA;
    let varB;

    if(key === "origin") {
      varA = a.origin.location.toUpperCase();
      varB = b.origin.location.toUpperCase();
    } else if(key === "destination") {
      varA = a.destination.location.toUpperCase();
      varB = b.destination.location.toUpperCase();
    } else {
      varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
    }
    


    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }

    return order === true ? comparison * -1 : comparison;
  };
};
