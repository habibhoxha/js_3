//var root = "http://localhost/ct/api/";
var root = "http://192.168.0.123/ct/api/";
var is_logged_in = function() {
	var user = localStorage.getItem("user");
	if(user == undefined || user == null) {
		//user = JSON.parse(user);
		window.location = "login.html";
	}
	return true;
}

var list_users = function(users) {
	//$("#users_list").html("");
	for(var i=0; i<users.length; i++) {
		var user = users[i];
		var html = "";
		html += '<div class="user bg-primary" data-user-id="'+user.id+'">';
		html += user.username;
		html += '<div>';
		
		$("#users_list").append(html);
	}
}

var list_messages = function(messages) {
	$("#messages").html("");
	for(var i=0; i<messages.length; i++) {
		var message = messages[i];
		
		var html = message_template(message);	
		$("#messages").append(html);
	}
}

var list_message = function(message) {
	var html = message_template(message);	
	$("#messages").prepend(html);
}

var message_template = function(message) {
	var html = "";
	html += '<div class="message bg-info" data-message-id="'+message.id+'">';
		html += '<div class="message_user">';
		html += message.username;
		html += ':</div>';
		html += '<div class="message_content">';
		html += message.message;
		html += '<div>';
	html += '<div>';
	
	return html;
}



$(document).ready(function(){
	
	if( is_logged_in() ) {
	
		var user = localStorage.getItem("user");
		console.log(user);
		if(user != undefined)
		user = JSON.parse(user);
		
		console.log("Make request every minute");
		
		var data = {
			action: "users"
		};
		data = JSON.stringify(data);
		
		$.ajax({
			url: root+"users.php",
			data: data,
			type: "POST",
			success: function(response) {
				console.log("SUCCESS");
				console.log(response);
				list_users(response.data);
			},
			error: function(response) {
				console.log("ERROR");
				console.log(response);
			}
		});
		
		$.ajax({
			url: root+"messages.php",
			data: data,
			type: "GET",
			success: function(response) {
				console.log("SUCCESS Messages");
				console.log(response);
				list_messages(response.data);
			},
			error: function(response) {
				console.log("ERROR");
				console.log(response);
			}
		});
		
	}
	
	$("#submit_message").click(function(){
		var message = $("#message").val();
		
		if(message.length > 0) {
			$("#message_form label span.error").removeClass("show");
			var data = {
				user_id: user.id,
				message: message,
				action: "messages"
			};
			data = JSON.stringify(data);
			
			$.ajax({
				url: root+"messages.php",
				data: data,
				type: "POST",
				success: function(response) {
					console.log("SUCCESS Messages");
					console.log(response);
					//var message_new = {
						//id: 
					//};
					response.data.username = user.username;
					list_message(response.data);
					$("#message").val("");
				},
				error: function(response) {
					console.log("ERROR");
					console.log(response);
				}
			});
		}
		else {
			console.log("too short");
			$("#message_form label span.error").addClass("show");
		}
	});
	
	$(document).on("click", "#users_list .user", function(){
			var user_id = $(this).data("user-id");
			var data = {
				user_id: user_id,
				action: "user_messages"
			};
			//data = JSON.stringify(data);
			console.log(user.id);
			
			$.ajax({
				url: root+"messages.php",
				data: data,
				type: "GET",
				success: function(response) {
					console.log("SUCCESS Messages");
					console.log(response);
					//var message_new = {
						//id: 
					//};
					list_messages(response.data);
					//$("#message").val("");
				},
				error: function(response) {
					console.log("ERROR");
					console.log(response);
				}
			});
	});
	
});