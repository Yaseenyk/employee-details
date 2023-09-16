const LocalStrategy = require('passport-local').Strategy;
const Employee = require('../modules/Employee');
const bcrypt = require('bcrypt');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await Employee.findOne({ username });

        if (!user) {
          return done(null, false, { message: 'Incorrect Username' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect Password' });
        }
      } catch (err) {
        return done(err);
      }
    })
  );
};
