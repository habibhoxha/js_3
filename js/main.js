//var root = "http://localhost/ct/api/";
var root = "http://ct-test.net23.net/api/"; 

var user = localStorage.getItem("user");

var is_logged_in = function() {
	console.log(user);
	if(user == "undefined" || user == null) {
		// Return to login
		window.location = "login.html";
	}
	user = JSON.parse(user);
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
	html += '<div class="message bg-info" id="message_'+message.id+'" data-message-id="'+message.id+'">';
		if(user.id == message.user_id)
			html += '<div class="message_delete close" data-message-id="'+message.id+'">x</div>';
		html += '<div class="message_user">';
		html += message.name + ' (' + message.username+')';
		html += ':</div>';
		html += '<div class="message_content">';
		html += message.message.replace(/(?:\r\n|\r|\n)/g, '<br />');
		html += '<div>';
	html += '<div>';
	
	return html;
}

var show_loading = function(div) {
	$(div).html('<div class="loading">loading...</div>');
}



$(document).ready(function(){
	
	if( is_logged_in() ) {
	
		var user = localStorage.getItem("user");
		console.log(user);
		if(user != undefined)
		user = JSON.parse(user);
		
		// console.log("Make request every minute");
		
		show_loading("#messages");
		
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

		setInterval(function(){
			data = {
				action: "messages"
			};
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
		}, 10000);


	}
	
	$("#submit_message").click(function(){
		var message = $("#message").val();
		
		if(message.length > 0) {
			$("#message_form label span.error").removeClass("show");
			var data = {
				user_id: user.id,
				message: message,
				action: "new_message"
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
					response.data.name = user.name;
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
			show_loading("#messages");
			
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
	
	$(document).on("click", "#messages .message_delete", function(){
			var div_to_close = $(this).parent().attr("id");
			var message_id = $(this).attr("data-message-id");
			console.log(message_id);
			var data = {
				user_id: user.id,
				message_id: message_id,
				action: "delete_message"
			};
			data = JSON.stringify(data);
			
			$.ajax({
				url: root+"messages.php",
				data: data,
				type: "POST",
				success: function(response) {
					console.log("SUCCESS Messages");
					console.log(response);
					
					console.log("This");
					console.log(div_to_close);
					if(!response.error)
						$("#"+div_to_close).fadeOut();
				},
				error: function(response) {
					console.log("ERROR");
					console.log(response);
				}
			});
	});
	
});