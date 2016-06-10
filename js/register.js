var root = "http://ct-test.net23.net/api/"; 

var is_not_logged_in = function() {
	var user = JSON.parse(localStorage.getItem("user"));
	if(user != undefined || user != null) {
		window.location = "index.html";
	}
	return true;
}

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

$(document).ready(function(){

	$("#submit_register").click(function(){

		var name = $("#name").val();
		var username = $("#username").val();
		var email = $("#email").val();
		var password = $("#password").val();


		var is_ok = true;

		$("#register_response").html("").hide();

		// Check if empty
		if(name.length < 3) {
			// name is not ok
			is_ok = false;
			$("#register_response").append("<div>Name missing</div>").show();
			//$("#name").addClass("red_border");
		}
		if(username.length < 3) {
			// username is ok
			is_ok = false;

			var msg = "Username is too short";
			if(username.length == 0) {
				msg = "Username missing";
			}

			$("#register_response").append("<div>"+msg+"</div>").show();
		}
		if(!validateEmail(email)) {
			// email is ok
			is_ok = false;
			$("#register_response").append("<div>Email is invalid</div>").show();
		}
		if(password.length < 6) {
			// password is ok
			is_ok = false;
			$("#register_response").append("<div>Password missing</div>").show();
		}

		if(is_ok) {
			// register user
			
			var data = {
				name: $("#name").val(),
				username: $("#username").val(),
				password: $("#password").val(),
				email: $("#email").val(),
				action: "signup"
			};
			console.log(data);
			data = JSON.stringify(data);

			$.ajax({
				url: root+"register.php",
				data: data,
				type: "POST",
				success: function(response) {
					console.log("SUCCESS");

					if(!response.error) {
						// Login will store the user
						// localStorage.setItem("user", JSON.stringify(response.data));
						window.location = "login.html";
					}
					else {
						// Error handling
						$("#register_response").html(response.message).show();
					}
				},
				error: function(response) {
					console.log("ERROR");
					console.log(response);
				}
			});
			
		}
		else {
			console.log("Errors found");
		}

	});
	
	$("#submit_register").click(function(){
		
	
	});
	
	if( is_not_logged_in() ) {
		console.log("User is not logged in");
	}
	
});

