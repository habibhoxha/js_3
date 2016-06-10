//var root = "http://localhost/ct/api/";
var root = "http://ct-test.net23.net/api/"; 

var is_logged_in = function() {
	var user = localStorage.getItem("user");
	console.log(user);
	if(user == "undefined" || user == null) {
		//user = JSON.parse(user);
		window.location = "login.html";
	}
	return true;
}

var show_loading = function(div) {
	$(div).html('<div class="loading">loading...</div>');
}



$(document).ready(function(){
	
	if( is_logged_in() ) {
	
		var user = localStorage.getItem("user");
		if(user != undefined)
			user = JSON.parse(user);

		$("#name").val(user.name);
		$("#username").val(user.username);
		$("#email").val(user.email);

		
		$("#submit_update_user").click(function(){

			var name = $("#name").val();
			var username = $("#username").val();
			var email = $("#email").val();

			var data = {
				user_id: user.id,
				name: name,
				username: username,
				email: email,
				action: "update_user"
			};

			data = JSON.stringify(data);

			console.log(data);

			$.ajax({
				url: root+"users.php",
				data: data,
				type: "POST",
				success: function(response) {
					console.log("SUCCESS");

					if(!response.error) {
						// Update user in localStorage
						var response_user = response.data;
						localStorage.setItem("user", JSON.stringify(response_user));

						$("#register_response").html("Profile has been updated").show();
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



		});


	}
	
});