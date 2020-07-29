//test weather the routes are connecting to the user
// Using await bc you would get a promise and have to use .then

const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

const User = require('../../models/User'); // pulling data data from the schema to make sure user is doing the right thing

// @Route Post api/user
// @desc | Register User
// @access Public

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      // See if the user exists

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      //Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'm',
      });
      // Encrypt password
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      // saving the users password and the user
      const salt = await bcrypt.genSalt(10); // hashing the password
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      // Return jsonwebtoken - so users can use their accounts which is protected by the web token
      // Web token is built in 3 parts. The header - algorithm & token type. Payload- data Verify Signature
      const payload = {
        //getting the payload
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'), //take in the token. Passing the payload the secret and callback an error or token
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
