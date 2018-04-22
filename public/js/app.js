
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
  var user = null;
  var usuariosConectados = null;
  var usuarios = null;
  
  var database = firebase.database();
  var conectadoKey = '';
  btnFacebook.on('click', signInFacebook);
  
  btnGoogle.on('click', signInGoogle);
  function initApp() {
    registrationUsers(user.uid, user.displayName, user.email,user.photoURL);
    login(user.uid, user.displayName , user.email);
    window.location.href = 'home.html';  
  }
  function registrationUsers(uid, name, email,photoURL) {
      firebase.database().ref('Usuarios/' + uid).set({
      name: name,
      email: email,
      photoURL:photoURL
    });
  }
  function login(uid, name, email) {
    firebase.database().ref('connected/' + uid).set({
      name: name,
      email: email
    });
  }
  function signOut() {
    firebase.auth().onAuthStateChanged(function(user) {
      database.ref('/connected/' + user.uid).remove();
      window.location.href = '../index.html';  
    });
  };
  function signInFacebook() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      user = result.user;
      console.log(user);
      initApp();
    })
  }
  
  function signInGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      user = result.user;
      console.log(user);
      initApp();
      window.location.href = 'home.html';
    });
  }
  var $logout = $('.logout');
  $logout.on('click', signOut);
