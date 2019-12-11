var firebase = require("firebase-admin");
var prompt = require("prompt");


// Input declaration from user using terminal
var userinput = [ 
    {
        name : 'username',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'Username is not valid, it can only contains letters, spaces, or dashes'
    },
    {
        name : 'password',
        hidden : true
    }
];

var username,password;

var serviceAccount = require("./serviceAccountKey.json");

//Specify Unique key and url
firebase.initializeApp({

    credential: firebase.credential.cert(serviceAccount),
  
    databaseURL: "https://node-68556.firebaseio.com"
  
});

var db = firebase.database();

var ref = db.ref("temp");

var usersRef = ref.child("users");

//Data Insertion
usersRef.set({

    dvrohan: {

        password: "123",
        full_name: "Rohan Dhamale"

    },

    gravitator: {

        password: "456",

        full_name: "dkdkd"

    },

    asdc: {
        password: "789",
        full_name: "csdjas"
    }

});


//Taking input
prompt.start();

prompt.get(userinput,function(err,result){
    if (err) {
        console.log(err);
        return 1;
    }else {
        username = result.username;
        password = result.password;
        usersRef.child(username).once("value",function(snapshot){   //Data retrieval from firebase
        if(snapshot.val()!=null){
            if(snapshot.val().password===password){
                console.log("Valid");
            }
            else{
                console.log("Invalid");
            }
        }
        else{
            console.log("No such user present");
        }
        });
    }
})