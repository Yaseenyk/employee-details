const LocalStrategy = require('passport-local').Strategy;
const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user object from the session
  passport.deserializeUser((id, done) => {
    Employee.findById(id, (err, user) => {
      done(err, user);
    });
  });
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
