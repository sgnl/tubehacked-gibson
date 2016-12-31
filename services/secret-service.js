
/**
 * Number generator module
 *
 * stores a random number and exposes an interface
 * to check if a numbering being guessed matches the
 * randomly generated number.
 *
 * @return {Object} exposes interface methods
 */
module.exports = _ => {
  let passnum = Math.floor(Math.random() * 2000);
  let multiple = 2;

  return {
    check: (num, cb) => {
      if (passnum === parseInt(num)) {
        // between 1 and 2000
        passnum = Math.floor(Math.random() * 2000)
        console.log('passnum: ', passnum);
        cb(null);
      } else {
        cb(true);
      }
    },
    get: () => {
      return passnum;
    }
  };
};