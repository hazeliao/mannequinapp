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

$(function(){
    //var clicked = 0;
    $('#list div a img').on("click", function(){
        console.log("testtest!!!");
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
