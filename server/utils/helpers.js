const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    if (txt.substring(0, 2).match(/(ui|ux)/i)) {
      return txt.charAt(0).toUpperCase() + txt.charAt(1).toUpperCase() + txt.substr(2).toLowerCase();
    } else {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  });
};

module.exports = toTitleCase;
