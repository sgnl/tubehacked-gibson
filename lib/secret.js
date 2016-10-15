module.exports = _ => {
  let passnum = 20;
  let multiple = 2;

  return {
    check: (num, cb) => {
      if (passnum === parseInt(num)) {
        // between 1 and 2000
        // passnum = Math.floor(Math.random() * (passnum * 200))
        cb(null);
      } else {
        cb(true);
      }
    }
  };
};