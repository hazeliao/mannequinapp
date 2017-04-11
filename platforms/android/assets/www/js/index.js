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
        //console.log("device.cordova: ", device.cordova);
        console.log("cordova-plugin-device: device.platform: ", device.platform);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    }

};

/**********************************************

        designs showing with swipe
        
**************************************************/

var designerIndex = 0;
var designIndex = 0;

$(function(){
  $( "#menu" ).on( "swipeleft", swipedLeft );
  $( "#menu" ).on( "swiperight", swipedRight );
 
  function swipedLeft( event ){
      swipeNextDesign(1);
  }
    
  function swipedRight( event ){
      swipeNextDesign(-1);
  }
});

function swipeNextDesign( direction )
{
    console.log("swipeNextDesign( direction: " + direction + " );");
        
    var userList = getUserList();
    
    //
    //Does the current designer have more designs?
    //
    //If not, go to the next designer.
    //
    //If yes, display the next design.
    //
    //
    var rawUser = window.localStorage.getItem(userList[designerIndex]);
    var userData = JSON.parse(rawUser);
    
    console.log("userList.length: " + userList.length);
    console.log("userData.designs.length: " + userData.designs.length);
    if ( direction == 1 )
    {
         //If the current user has no more designs to show, check for the next designer.
        if ( designIndex + 1 >= userData.designs.length )
        {           
            
            //If no next user exists, go back to the first users designs.
            if ( designerIndex + 1 >= userList.length )
            {
                designerIndex = 0;
                designIndex = 0;
            }
            else
            {
                //Yes, another user does exist! Increase the target to the next designer and reset the design index.
                designerIndex++;
                designIndex = 0;
            }

        } else {
            
            //Current user still has designs to show! Increase designIndex
            designIndex++;
        }
    }
            
    
    if ( direction == -1 )
    {
        
        //If the current user has no more designs to show in the negative space, decrement designer.
        if ( designIndex - 1 < 0 )
        {

            //If we're at the start of the userList and trying to go backwards, go to the last one on the list.   
            if ( designerIndex - 1 < 0 ) 
            {
                designerIndex = userList.length-1;
                var lastUser = window.localStorage.getItem(userList[designerIndex]);
                console.log("last user: " + userList[designerIndex]);
                var lastUsersData = JSON.parse(lastUser);
                designIndex = lastUsersData.designs.length - 1;
            }
            else
            {
                designerIndex--;//Go back one designer index as we are not at the end of the list.
                var lastUser = window.localStorage.getItem(userList[designerIndex]);
                console.log("last user: " + userList[designerIndex]);
                var lastUsersData = JSON.parse(lastUser);
                designIndex = lastUsersData.designs.length - 1;
            }

            
        } else {
            //Another design exists in the negative space, show it first before changing the designer.
            designIndex--;
        }
        
    }

    
    /*
    if ( designerIndex <= 0 && direction == -1 )
        return;
    if ( designerIndex >= userList.length-1 && direction == 1 )
        return;
    
    designerIndex += direction; 
    */
    
    showDesignersDesign(designerIndex, designIndex);
}

function showDesignersDesign( designerIndexNow, designIndexNow )
{
    console.log("showDesigner( " + designerIndexNow + " , " + designIndexNow + " )");
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
    
    
    //First, check if designer index should be increased?
    //
    //This depends on if the current designer has any more designs left to show.
    //    
        
    var userList = getUserList();
    
    if ( designerIndexNow > userList.length )
    {
        console.log("designerIndexNow index out of bounds.");
        return;        
    }

    //{"nickname":"Donald Duck","password":"user1","designs":[{"name":"onetutu","hat":"hat1","top":"top2","pants":"pants2"},{"name":"no zu no dai","hat":"hat0","top":"top3","pants":"pants2"}]}
    var rawUser = window.localStorage.getItem(userList[designerIndexNow]);
    var userData = JSON.parse(rawUser);
    $('#designersName').text(""+userData.nickname);
    
    if ( designIndexNow < userData.designs.length )
    {
        if ( designIndexNow < userData.designs.length )
            if ( userData.designs[designIndexNow].name )
                $('#designName').text(""+userData.designs[designIndexNow].name);
        /*
        $('#hattu').text(""+userData.designs[designIndexNow].hat);
        $('#toppu').text(""+userData.designs[designIndexNow].top);
        $('#pantsu').text(""+userData.designs[designIndexNow].pants);
        */
        
        //Remove the 'hat' 'top' and 'pants' from the data to get pure numbers.
        var hatIndex = parseInt(userData.designs[designIndexNow].hat.replace('hat',''), 10);
        var topIndex = parseInt(userData.designs[designIndexNow].top.replace('top',''), 10);
        var pantsIndex = parseInt(userData.designs[designIndexNow].pants.replace('pants',''), 10);
         
        $('#hattuImage').attr("src","img/head"+(hatIndex+1)+".png");
        $('#toppuImage').attr("src","img/torso"+(topIndex+1)+".png");
        $('#pantsuImage').attr("src","img/legs"+(pantsIndex+1)+".png");
    } else {
        
        if ( userData.designs.length == 0 )
        {
            $('#designName').text("This user is currently designing...");
            /*
            $('#hattu').text("");
            $('#toppu').text("");
            $('#pantsu').text("");
            */
            $('#hattuImage').attr("src","img/head.png");
            $('#toppuImage').attr("src","img/torso.png");
            $('#pantsuImage').attr("src","img/legs.png");
        } else {
            $('#designName').text("index out of bounds.");
            $('#hattuImage').attr("src","img/head.png");
            $('#toppuImage').attr("src","img/torso.png");
            $('#pantsuImage').attr("src","img/legs.png");
            /*
            $('#hattu').text("index out of bounds.");
            $('#toppu').text("index out of bounds.");
            $('#pantsu').text("index out of bounds.");
            */
        }
    }
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

function fblogoutSuccess()
{
    console.log("fblogoutSuccess");
}

function fblogoutFail()
{
    console.log("fblogoutFail");
}

function logout()
{
    log("Logged out user: "+window.localStorage.getItem("loggedInUser"));
    
    if ( window.localStorage.getItem("isLoggedInWithFacebook") !== null )
    {
        window.localStorage.removeItem("isLoggedInWithFacebook");
        facebookConnectPlugin.logout(fblogoutSuccess, fblogoutFail);
    }
    
    if ( window.localStorage.getItem("isLoggedInWithGoogle") !== null )
    {
        window.localStorage.removeItem("isLoggedInWithGoogle");
        window.plugins.googleplus.logout(
            function (msg) {
              console.log("GOOGLE LOGOUT: ", msg);
            }
        );

    }
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
            
            var loginDataObject = {};
            loginDataObject.email = loginEmail;
            loginDataObject.password = userDataObject.password;
            loginDataObject.nickName = userDataObject.nickname;
            loginDataObject.google = false;
            loginDataObject.facebook = false;
            
            finalizeLogin(loginDataObject);
            
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

    
    var loginDataObject         = {};
    loginDataObject.email       = emailUserWants;
    loginDataObject.password    = passwordUserEntered;
    loginDataObject.nickName    = nickNameUserWants;
    loginDataObject.google      = false;
    loginDataObject.facebook    = true;

    //
	//	Register & Login a new user with the now valid user email (it has passed all the checks!)
	//
    finalizeLogin( loginDataObject );
    
}

//NOTE: This function should only be called from finalizeLogin(...)
function createNewUser(nickname, email, password)
{
	var userDataObject = {}
	userDataObject.nickname = nickname;
	userDataObject.password = password;
	userDataObject.designs = [];
	console.log("Creating new user with data: ", userDataObject);
    addUserToUsersList( email );
    window.localStorage.setItem(email, JSON.stringify(userDataObject));
}

function doesEmailExistInLocalStorage(userEmailToCheck)
{
	var userEmail = window.localStorage.getItem(userEmailToCheck);

    console.log("doesEmailExistInLocalStorage: " + userEmail + " ? " + ( userEmail ? "TRUE" : "FALSE" ) + " ");

    //Returns that the email is available if anything the key exists in localStorage.
	return userEmail ? true : false;
}

/****************************************

        All Logins
        
*****************************************/

function finalizeLogin( loginDataObject )
{
    /*
        loginDataObject.email       STRING
        loginDataObject.password    STRING
        loginDataObject.nickName    STRING
        loginDataObject.google      BOOL
        loginDataObject.facebook    BOOL
    */
    
    if ( loginDataObject.google === true )
    {
        window.localStorage.setItem("isLoggedInWithGoogle", "yeees");
    } else if ( loginDataObject.facebook === true )
    {
        window.localStorage.setItem("isLoggedInWithFacebook", "yeees");
    }

    if ( doesEmailExistInLocalStorage( loginDataObject.email ) === false )
    {
        console.log("NEW USER DETECTED, CREATING NEW DATABASE ENTRY!");
        createNewUser( loginDataObject.nickName, loginDataObject.email, loginDataObject.password );
    }

    console.log("FINALIZING LOGIN...");
    
    $('#userNameLoggedIn').text(""+loginDataObject.nickName);
    window.localStorage.setItem("loggedInUser", loginDataObject.email);

    location.hash = "#menu";
    
    showDesignersDesign(0,0);

}


/*****************************************

        google login
        
*****************************************/

function tryGoogleLogin()
{

    /*
		Installation steps to avoid bugs:
        cordova plugin rm cordova-plugin-googleplus
		cordova plugin add https://github.com/EddyVerbruggen/cordova-plugin-googleplus --variable REVERSED_CLIENT_ID=com.googleusercontent.apps.583206289891-eokrhgg2ignd47uqnqg3c95didpei892
    */
    
	window.plugins.googleplus.login(
		{
            scopes: 'profile email',
            webClientId: '583206289891-eokrhgg2ignd47uqnqg3c95didpei892.apps.googleusercontent.com',
            offline: true
	   },
		function (obj) {
            console.log("GOOGLE LOGIN RESULTS:");
			console.log(obj);
            
            var loginDataObject         = {};
            loginDataObject.email       = obj.email;
            loginDataObject.password    = obj.userId;
            loginDataObject.nickName    = obj.displayName;
            loginDataObject.google      = true;
            loginDataObject.facebook    = false;

            finalizeLogin( loginDataObject );

            //window.location.href = "#menu";
            //alert(JSON.stringify(obj)); // do something useful instead of alerting
		},
		function (msg) {
		  alert('error with google login: ' + msg);
		}
	);
};


/*****************************************

        facebook login
        
*****************************************/

function doFacebookLogin()
{
    if (window.cordova.platformId == "browser") {
        facebookConnectPlugin.browserInit(208554899623511);
    }
	console.log("Doing facebook login!");
	facebookConnectPlugin.login(["email"], fbloginSuccess, fbloginFail);
    window.localStorage.setItem("isLoggedInWithFacebook", "yeees");
}

function fbloginSuccess(response)
{
	console.log("Login succeeded!");
	console.log("response: ", response);  
    
    var loginDataObject         = {};
    loginDataObject.email       = response.authResponse.userID;
    loginDataObject.password    = response.authResponse.userID;
    loginDataObject.nickName    = response.authResponse.userID;
    loginDataObject.google      = false;
    loginDataObject.facebook    = true;

    finalizeLogin( loginDataObject );//window.location.href = "#menu";
}

function fbloginFail(response)
{
	console.log("Login failed!");
	console.log("response: ", response);
	alert("error loggin in :(");
}

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
            console.log("Error with weather: ", msg);
            //if ( weatherDiv )
            //    weatherDiv.addClass('error').html(msg);

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

function resetDesign()
{
    window.localStorage.removeItem("container0");
    window.localStorage.removeItem("container1");
    window.localStorage.removeItem("container2");
    
    $('#container0').attr("src", 'img/head.png');
    $('#container1').attr("src", 'img/torso.png');
    $('#container2').attr("src", 'img/legs.png');
    
}

function saveTheDesign()
{
    console.log("Saving the design! !");
    
    var hat = window.localStorage.getItem("container0");
    var top = window.localStorage.getItem("container1");
    var pants = window.localStorage.getItem("container2");
    var designName = document.getElementById("designNameToSave").value;
    
    if ( hat == null || top == null || pants == null || designName == null)
    {
        alert("You haven't finished your design, did you remember to name it and select all 3 pieces?");
        return;
    }
    
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
    
    showDesignersDesign(designerIndex,designIndex);
    window.location.href = "#menu";
}

/**************************************************

            Replace images by clicking

*******************************************************/
$(document).ready(function(){           
       
	for(var j=0; j<10; j++){
		if(j!=0){
			$('#list'+ j).hide();
		}
	}	
    
	$('li a').on("click",function() {
		
        console.log("EVE");
		console.log("click: ", $(this).attr('href'));
		
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

/**************************************************

            Replace images by clicking

*******************************************************/
$(function(){
    //var clicked = 0;
    $('#list div img').on("click", function(){
        console.log("ADAM");
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

/* Does nothing, just for text printing.
$('#savedata').on("click", function(event){
	
	for(i=0;i<localStorage.length;i++){
		console.log(localStorage.key(i), window.localStorage.getItem(localStorage.key(i)));
	};           
				
});
*/
	

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
