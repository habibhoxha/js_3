var root = "http://192.168.0.123/ct/api/";

var is_not_logged_in = function() {
	var user = JSON.parse(localStorage.getItem("user"));
	if(user != undefined || user != null) {
		window.location = "index.html";
	}
	return true;
}

$(document).ready(function(){

	$("#submit_register").click(function(){

		

	});
	
	// $("#submit_register").click(function(){
	//
	// 	var data = {
	// 		name: $("#name").val(),
	// 		username: $("#username").val(),
	// 		password: $("#password").val(),
	// 		email: $("#email").val(),
	// 		action: "signup"
	// 	};
	// 	console.log(data);
	// 	data = JSON.stringify(data);
	//
	// 	$.ajax({
	// 		url: root+"register.php",
	// 		data: data,
	// 		type: "POST",
	// 		success: function(response) {
	// 			console.log("SUCCESS");
	//
	// 			if(!response.error) {
	// 				localStorage.setItem("user", JSON.stringify(response.data));
	// 				window.location = "login.html";
	// 			}
	// 			else {
	// 				// Error handling
	// 				$("#register_response").html(response.message).show();
	// 			}
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

