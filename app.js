
const express = require('express');
// console.log(express, "this is express")
// console.log(typeof express, "this is the type of thing express is")
const app = express();

const DATABASE = [
  { name: "Sam Smith",
    interest1: "hiking",
    interest2: "singing",
    interest3: "traveling",
    // interests: ["hiking", "singing"],
  },
  {
    name: "Jacob Collier",
    interest1: "fashion",
    interest2: "piano",
    interest3: "true temperament"
  }
]

// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'db_user',
//   host: 'localhost',
//   database: 'db_name',
//   password: 'password',
//   port: 5432,
// });

app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.static('public'));

const usersRouter = express.Router();

// Home route for users
app.get('/', (req, res) => {
  res.render('layout');
});

app.use(express.urlencoded({ extended: true }));

usersRouter.post('/add-interest/:username', (req, res) => {
  console.log(req)
  const username = req.params.username;
  const user = DATABASE.find(u => u.name.toLowerCase().split(' ').join('') === username);
  if (!user) {
      res.status(404).send('User not found');
  } else {
      const newInterest = req.body.newInterest;
      // Add the new interest to the user
      if(!user.interest4) user.interest4 = newInterest;
      else if(!user.interest5) user.interest5 = newInterest;
      // ... Add more as necessary
      
      res.redirect('/' + username); // Redirect back to the user's profile
      
  }
});


// Specific user profile route
usersRouter.get('/:doggy', (req, res) => {
  const requestedUsername = req.params.doggy.toLowerCase();
  
  const user = DATABASE.find(u => u.name.toLowerCase().split(' ').join('') === requestedUsername);
  if (!user) {
    res.status(404).send('User not found'); // Or you can render a 404 page
  } else {
    res.render('userprofile', user); // Render the 'userprofile' template
  }
});

// Mount the user routes
app.use('/', usersRouter); // Use root path '/'

// Start the server
app.listen(3000, () => {
  console.log('server is listening on port 3000');
});

