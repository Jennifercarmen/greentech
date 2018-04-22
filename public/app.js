
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDbtcYow7tB17n8li7dHG8XlnwRFG6M_bE",
    authDomain: "muninet-7f6ea.firebaseapp.com",
    databaseURL: "https://muninet-7f6ea.firebaseio.com",
    projectId: "muninet-7f6ea",
    storageBucket: "muninet-7f6ea.appspot.com",
    messagingSenderId: "1072734014511"
  };
  firebase.initializeApp(config);

  var btnGoogle = $('#btnGoogle');
  var btnFacebook = $('#btnFacebook'); 

  btnGoogle.on('click',function google() {
      alert('aahshsh');
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        user = result.user;
        console.log(user);  
        window.location.href = 'home.html';
      });
   });

   btnFacebook.on('click',function facebook() {
     alert('s');
     var provider = new firebase.auth.FacebookAuthProvider();
     firebase.auth().signInWithPopup(provider).then(function(result) {
     user = result.user;
     console.log(user);
    
       window.location.href = 'home.html';
  });
     
   })
  