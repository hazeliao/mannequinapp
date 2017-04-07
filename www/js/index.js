/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    }
};

/**********************************************

        designs showing with swipe
        
**************************************************/

var designerIndex = 0;

$(function(){
  $( "#menu" ).on( "swipeleft", swipedLeft );
  $( "#menu" ).on( "swiperight", swipedRight );
 
  function swipedLeft( event ){
      swipeDesign(1);
  }
    
  function swipedRight( event ){
      swipeDesign(-1);
  }
});

function swipeDesign( direction )
{
    console.log("Should change text, user swiped to: " + direction);
    
    var userList = getUserList();
    
    if ( designerIndex <= 0 && direction == -1 )
        return;
    if ( designerIndex >= userList.length-1 && direction == 1 )
        return;

    designerIndex += direction; 
    
    showDesigner(designerIndex);
}

function showDesigner( designerIndexNow )
{
    
    /*
    var textarr = [];
    var userList = getUserList();
    for (var i = 0 ; i < userList.length; i++){
        var rawUser = window.localStorage.getItem(userList[i]);
        var userData = JSON.parse(rawUser);
        console.log("rawUser:" + rawUser);
        console.log("UserData:" + userData);
        textarr.push(userData.nickname);
    }
    */
    
    var userList = getUserList();
    var rawUser = window.localStorage.getItem(userList[designerIndexNow]);
    var userData = JSON.parse(rawUser);
    $('#designersName').text(""+userData.nickname);
    $('#designName').text("xx");
    
}

function getUserList()
{
    var rawUserList = window.localStorage.getItem("userList");
    return JSON.parse(rawUserList);
}

function log( stepName )
{
	console.log("------------------------------");
	console.log(stepName);
    console.log("------------------------------");
}

function logout()
{
    log("Logged out user: "+window.localStorage.getItem("loggedInUser"));
    window.localStorage.removeItem("loggedInUser");
    location.hash = "#main";
}

function localStorageLogin()
{
    var loginEmail = $('#loginEmail').val();
    var loginPassword = $('#loginPassword').val();

    console.log("loginEmail:" + loginEmail + " loginPassword:" + loginPassword );

    var userNameData = window.localStorage.getItem(loginEmail);
    if ( userNameData )
	{
		//Convert the string data into a JSON object from localStorage
		var userDataObject = JSON.parse(userNameData);
        console.log("userNameData: ", userNameData, " JSON.parse(userNameData): ", userDataObject);

        //The data model:
        //userDataObject.nickname = nickname;
        //userDataObject.password = password;
        //userDataObject.designs = [];

        console.log("loginPassword: " + loginPassword + " dataObject.password: " + userDataObject.password);
		if ( loginPassword == userDataObject.password )
		{
            console.log("Yay ! Passwords match!");
            $('#userNameLoggedIn').text(""+userDataObject.nickname);
            
            window.localStorage.setItem("loggedInUser", loginEmail);

            //This won't add the user twice if it already is found on the list.
            addUserToUsersList( loginEmail );

            location.hash = "#menu";
            
            showDesigner(0);
            
        } else
		{
			alert("Wrong password!");
		}
	} else {
        alert("User name is invalid!");
	}

}

function addUserToUsersList( loginEmail )
{
    //If user list does not exist yet, create one.
    var rawUserList = window.localStorage.getItem("userList");
    var existingUserList = JSON.parse(rawUserList);
    if ( !existingUserList )
    {
        var userList = [];
        userList[0] = loginEmail;
        window.localStorage.setItem("userList", JSON.stringify(userList));
        return;
    }

    //If the login email does not exist in the list, add the user to the list, otherwise dont.
    for ( var i = 0; i < existingUserList.length; i++ )
        if ( existingUserList[i] == loginEmail )
            return;


    existingUserList.push(loginEmail);
    window.localStorage.setItem("userList", JSON.stringify(existingUserList));

}

function isUserInList( validListOfUsers, emailToSearchFor )
{
    for ( var i = 0; i < validListOfUsers.length; i++ )
    {
        //Found the user already in the userlist! :)
        if ( validListOfUsers[i] == emailToSearchFor )
            return true;
    }
    
    //Could not find user in the list, return false, this user will probably have to be added to the userlist.
    return false;
}

function deleteUser()
{
	var userToDelete = $('#userEmailToDelete').val();
    window.localStorage.removeItem(userToDelete);
}

/*****************************************

        sign up new user
        
*****************************************/

function registerNewUser() {

	var nickNameUserWants = $('#createNickname').val();
    var passwordUserEntered = $('#createPassword').val();
    var emailUserWants = $('#createEmail').val();

    console.log("user_nickname: ", nickNameUserWants);
    console.log("user_password: ", passwordUserEntered);
    console.log("user_email: ", emailUserWants);

    if ( !emailUserWants )
	{
		alert("Your email cannot be empty!");
		return;
	}

	//
	//Check if email is available for registering as a new account?
	//
	var emailKeyExists = doesEmailExistInLocalStorage(emailUserWants);
    if ( emailKeyExists )
	{
		alert("Sorry, this email has already been used by another user!");
		return;
	}

    log("Creating a new user...");

	//
	//	Register a new user with the now valid user email (it has passed all the checks!)
	//
	createNewUser(nickNameUserWants, emailUserWants, passwordUserEntered);
}

function createNewUser(nickname, email, password)
{

	var userDataObject = {}

	userDataObject.nickname = nickname;
	userDataObject.password = password;
	userDataObject.designs = [];

	console.log(userDataObject);
    addUserToUsersList( email );
    window.localStorage.setItem(email, JSON.stringify(userDataObject));
    window.localStorage.setItem("loggedInUser", email);
    location.hash = "#menu";
}

function doesEmailExistInLocalStorage(userEmailToCheck)
{
	var userEmail = window.localStorage.getItem(userEmailToCheck);

    console.log("doesEmailExistInLocalStorage: ", userEmail);

    //Returns that the email is available if anything the key exists in localStorage.
	return userEmail ? true : false;
}


/*****************************************

        google login
        
*****************************************/

function tryGoogleLogin()
{

	window.plugins.googleplus.login(
		{
		  'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
		  'webClientId': '583206289891-eokrhgg2ignd47uqnqg3c95didpei892.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
		  'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
		},
		function (obj) {
			console.log(obj);
			window.location.href = "#menu";
		  //alert(JSON.stringify(obj)); // do something useful instead of alerting
		},
		function (msg) {
		  alert('error: ' + msg);
		}
	);
};


/*****************************************

        facebook login
        
*****************************************/


function loginSuccess(response)
{
	console.log("Login succeeded!");
	console.log("response: ", response);
	window.location.href = "#menu";
}

function loginFail(response)
{
	console.log("Login failed!");
	console.log("response: ", response);
	alert("error loggin in :(");
}

function doFacebookLogin()
{
	console.log("Doing facebook login!");
	facebookConnectPlugin.login(["email"], loginSuccess, loginFail);
}




function saveTheDesign()
{
    console.log("Saving the design! !");
    
    var hat = window.localStorage.getItem("container0");
    var top = window.localStorage.getItem("container1");
    var pants = window.localStorage.getItem("container2");
    
    var designName = document.getElementById("designNameToSave").value;
        
    console.log("Saving the selections:"+
                " hat: " + hat +
                " top: " + top +
                " pants: " + pants +
                " designName: " + designName);
                                    
    
    var loggedInUsername = window.localStorage.getItem("loggedInUser");
    
    if ( !loggedInUsername )
    {
        console.log("Error, currently logged in username did not exist or was invalid!");
        return;
    }

    var rawUserData = window.localStorage.getItem( loggedInUsername );
    var parsedUserData = JSON.parse(rawUserData);

    var designObject = {};
    
    designObject.name = designName;
    designObject.hat = hat;
    designObject.top = top;
    designObject.pants = pants;
    
    //Insert to the last item of the list, the new designObject, so the list automatically grows.
    parsedUserData.designs.push(designObject);
    
    window.localStorage.setItem( loggedInUsername, JSON.stringify(parsedUserData));
    
    window.location.href = "#menu";
}





$(document).ready(function(){           
   
	for(var j=0; j<10; j++){
		if(j!=0){
			$('#list'+ j).hide();
		}
	}		 
	  
	$('li a').on("click",function(){
		
		console.log("xx", $(this).attr('href'));
		
		for(var i = 0; i < 10; i++){
			
			if($(this).attr('href') == '#list'+i){
			  // alert($(this).attr('href'));
				$('#list'+ i +'').show();                    
				$('#container'+ i +'').prop('disabled',false);
			} else {
				 $('#container'+ i +'').prop('disabled',true);
				$('#list'+i+'').hide();
			}                
		}

	});

});

/***********************************************

 get geolocation for weather

****************************************/

if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
            }
            else{
                showError("Your phone does not support geolocation!");
        };

        function locationSuccess(position){
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            fetchWeather(lat, lon);           
        };

        function locationError(error){
            switch(error.code) {
                case error.TIMEOUT:
                    showError("A timeout occured! Please try again!");
                    break;
                case error.POSITION_UNAVAILABLE:
                    showError('We can\'t detect your location. Sorry!');
                    break;
                case error.PERMISSION_DENIED:
                    showError('Please allow geolocation access for this to work.');
                    break;
                case error.UNKNOWN_ERROR:
                    showError('An unknown error occured!');
                    break;
            }
        };

        function showError(msg){
           weatherDiv.addClass('error').html(msg);
        };

        function fetchWeather(lan, lon){            
            
            $.ajax({
                url:"http://api.openweathermap.org/data/2.5/weather?lat="+lan+"&lon="+lon+"&APPID=c5480a0746e7943d8282d79f648a400a",
                dataType:"json",
                timeout:5000
            })
            .done(function(data){
                $("#weather").attr("src",data.url);
                $("#weatherIcon").attr("src","http://openweathermap.org/img/w/"+data.weather[0].icon+".png");                
                            })
        };


/**************************************************

            designing page

*******************************************************/

$(function(){
    //var clicked = 0;
    $('#list div img').on("click", function(){
        var listNumber = $(this).attr('class').replace(/[^\d.]/g,'');
        console.log("listnumber:", listNumber);
        var trial = $(this).attr('src');      
        console.log(trial);
       /* clicked++;
        if ( clicked >= 2){*/
        $('#container'+listNumber).attr("src", trial);
        var data = $(this).attr('id');
        console.log(data);
        window.localStorage.setItem("container"+listNumber, data);
            //clicked=0;
       // } 
    });    
});


/*
//website jquery drag and drop 

$('#list div img').on("dragstart",function(event){
	var dt = event.originalEvent.dataTransfer;
	console.log("dragStart: ", $(this).attr('id'));
	dt.setData('Text', $(this).attr('id'));  
});

$('ul li div').on("dragenter dragover drop", function (event) {            
	event.preventDefault();
	if (event.type === 'drop') { 
		
		var listNumber = $(this).attr('id').replace(/[^\d.]/g,'');
		console.log("listnumber:", listNumber);
		
		if ( $('#list'+listNumber).is(":visible") )    {
			
			var old=$(this).find('.dr'+listNumber).detach();     
			old.appendTo('#list'+listNumber).removeAttr('style');
			var data = event.originalEvent.dataTransfer.getData('Text',$(this).attr('id'));
			
			console.log("Final selection dropped:", data);   
			var name = $(this).attr('id'); 
			console.log(name);
			window.localStorage.setItem(name, data);
			
			de=$('#'+data).detach();
			de.css({'top':0+'px','left':0+'px'}).appendTo($(this));                   
		}               
	};            
});
*/
$('#savedata').on("click", function(event){
	
	for(i=0;i<localStorage.length;i++){
		console.log(localStorage.key(i), window.localStorage.getItem(localStorage.key(i)));
	};           
				
});
	

$(document).on("pagecreate", function() {
	$(document).on("pagecontainershow", function(){
		$(".ui-content").height(getRealContentHeight());
	})

	$(window).on("resize orientationchange", function(){
		$(".ui-content").height(getRealContentHeight());
	})
	
	function getRealContentHeight() {
		var activePage = $.mobile.pageContainer.pagecontainer("getActivePage"),
		screen = $.mobile.getScreenHeight(),
		header = $(".ui-header").hasClass("ui-header-fixed") ? $(".ui-header").outerHeight() - 1 : $(".ui-header").outerHeight(),
		footer = $(".ui-footer").hasClass("ui-footer-fixed") ? $(".ui-footer").outerHeight() - 1 : $(".ui-footer").outerHeight(),
		contentMargins = $(".ui-content", activePage).outerHeight() - $(".ui-content", activePage).height();
		var contentHeight = screen - header - footer - contentMargins;    
		
		return contentHeight;
	}
});
app.initialize();
