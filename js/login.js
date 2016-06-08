var root = "http://192.168.0.123/ct/api/";

var is_not_logged_in = function() {
	var user = JSON.parse(localStorage.getItem("user"));
	if(user != undefined || user != null) {
		window.location = "index.html";
	}
	return true;
}

$(document).ready(function(){

	$("#submit_login").click(function(){

		var username = $("#username").val();
		var password = $("#password").val();

		var is_ok = true;

		$("#register_response").html("").hide();

		if(username.length < 3) {
			// username is ok
			is_ok = false;

			var msg = "Username is too short";
			if(username.length == 0) {
				msg = "Username missing";
			}

			$("#register_response").append("<div>"+msg+"</div>").show();
		}

		if(password.length < 6) {
			// password is ok
			is_ok = false;
			$("#register_response").append("<div>Password missing</div>").show();
		}

		if(is_ok) {
			// login user
			console.log("Everything is ok");
		}
		else {
			console.log("Errors found");
		}

	});
	
	// $("#submit_login").click(function(){
	//
	// 	var data = {
	// 		username: $("#username").val(),
	// 		password: $("#password").val(),
	// 		action: "login"
	// 	};
	// 	console.log(data);
	// 	data = JSON.stringify(data);
	//
	// 	$.ajax({
	// 		url: root+"login.php",
	// 		data: data,
	// 		type: "POST",
	// 		success: function(response) {
	// 			console.log("SUCCESS");
	// 			console.log(response);
	//
	// 			if(!response.error) {
	// 				response.data.password = "";
	// 				localStorage.setItem("user", JSON.stringify(response.data));
	// 				window.location = "index.html";
	// 			}
	// 			else {
	// 				// Error handling
	// 			}
	//
	// 		},
	// 		error: function(response) {
	// 			console.log("ERROR");
	// 			console.log(response);
	// 		}
	// 	});
	//
	// });
	
	if( is_not_logged_in() ) {
		console.log("User is not logged in");
	}
	
});