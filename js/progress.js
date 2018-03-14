// Configure Firebase.
var config =
{
  apiKey: "AIzaSyCogF5kaBbbs-2ME020FoTMd17_2ylydq4",
  authDomain: "customfit-5281b.firebaseapp.com",
  databaseURL: "https://customfit-5281b.firebaseio.com",
  projectId: "customfit-5281b",
  storageBucket: "customfit-5281b.appspot.com",
  messagingSenderId: "789910251533"
};
// Initialize Firebase.
firebase.initializeApp(config);
// Reference strength data.
var dbRefA = firebase.database().ref().child("strength");
// Sync with Firebase in real time.
dbRefA.on("value", snap =>
{
  var a = snap.val();
  var strength = JSON.stringify(a);
});
// Reference cardio data.
var dbRefB = firebase.database().ref().child("cardio");
// Sync with Firebase in real time.
dbRefB.on("value", snap =>
{
  var b = snap.val();
  var cardio = JSON.stringify(b);
  console.log(cardio);
});
