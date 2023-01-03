const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');



//connexion à la BDD
mongoose.connect(config.database, { useNewUrlParser: true});

mongoose.connection.on('connected', () => {
  console.log('Connecté à la base de données '+config.database);
});
// BDD error
mongoose.connection.on('error', (err) => {
  console.log('Erreur de connection'+err);
});


const app = express();
const users = require('./routes/user.route');
const friends = require('./routes/friend.route');
const port = process.env.PORT || 8080;
//  permet au serveur d'envoyer des réponses qui peuvent être utilisées par un client provenant d'un autre origine. 
app.use(cors());

//serves static files from the specified directory
app.use(express.static(path.join(__dirname, 'public')));

// analyse le corps de la requête et le rend plus facile à récupérer des informations spécifiques de la requête.
app.use(bodyParser.json());


app.use(passport.initialize());
app.use(passport.session());

//auth nodeJs. configuration pour utiliser la Session
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/friends', friends);



app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
  console.log('Server running on port '+port);
});