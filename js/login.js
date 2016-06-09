var root = "http://responseve.net/ct/api/";

var is_not_logged_in = function() {
	var user = JSON.parse(localStorage.getItem("user"));
	if(user != undefined || user != null) {
		window.location = "index.html";
	}
	return true;
}

$(document).ready(function(){
	
	$("#submit_login").click(function(){
		
		var data = {
			username: $("#username").val(),
			password: $("#password").val(),
			action: "login"
		};
		console.log(data);
		data = JSON.stringify(data);
		
		$.ajax({
			url: root+"login.php",
			data: data,
			type: "POST",
			success: function(response) {
				console.log("SUCCESS");
				console.log(response);
				
				if(!response.error) {
					response.data.password = "";
					localStorage.setItem("user", JSON.stringify(response.data));
					window.location = "index.html";
				}
				else {
					// Error handling
				}
				
			},
			error: function(response) {
				console.log("ERROR");
				console.log(response);
			}
		});
		
	});
	
	if( is_not_logged_in() ) {
		console.log("User is not logged in");
	}
	
});