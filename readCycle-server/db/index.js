// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const uri =
  process.env.MONGODB_URI || "mongodb+srv://test_user:n0PgwB3ipaZWCYJh@cluster0.dmxynb3.mongodb.net/readCycle-server?retryWrites=true&w=majority"
  
  // "mongodb://127.0.0.1:27017/readcycle-server";

  // mongodb+srv://test_user:n0PgwB3ipaZWCYJh@cluster0.dmxynb3.mongodb.net/readCycle-server?retryWrites=true&w=majority

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
