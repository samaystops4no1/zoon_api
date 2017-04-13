$("#list").hide();
$("#meeting").hide();
$("#create").hide();
$("#loader").hide();

var person={"id":""};
function ajaxRequest(method,url,callback){
	  $("body").css("backgroundColor","#b3b3b3");
	  $("#loader").show();
	  var xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function() {
		  if (this.readyState == 4 && this.status == 200) {
			$("body").css("backgroundColor","white");
			$("#loader").hide();
            callback(null,this.responseText);
           }
		   else{
			 callback("Something Went Wrong.");  
		   }
         };
     xhttp.open(method, url, true);
     xhttp.send();
}

function getUsers(){
	
	if($("#list").is(":visible")==false){
	ajaxRequest("GET","https://shielded-refuge-65245.herokuapp.com/users",createList);
	}
	$("#list").toggle();
	
}

function details(id){
	if($("#meeting").is(":visible")==false){
		ajaxRequest("GET","https://shielded-refuge-65245.herokuapp.com/meeting?id="+id,showMeeting);
	}
	$("#meeting").toggle();
	
}

function createMeeting(id){
	$("#create").toggle();
	person.id=id;
}

function submitMeeting(){
	var topic=$("#title").val();
	if(topic==null || topic==""){
		alert("Please Enter the title");
		return;
	}else{
	ajaxRequest("GET","https://shielded-refuge-65245.herokuapp.com/create?id="+person.id+"&topic="+topic,successMeeting);
	}
}

var createList=function(err,list){
	if(err){
		return;
	}
	else{
	$("#list").empty();
	var list=JSON.parse(list);
	for(var i=0;i<list.body.length;i++){
		$("#list").append("<li>"+list.body[i].first_name+" "+list.body[i].last_name +" || Email- "+list.body[i].email+" <button>View Details</button></li>");
	    //$("#list").append("<button>View Details</button>");
		$("#list button:last").attr("onClick","details('"+list.body[i].id+"')");
	}
	}
}

var showMeeting=function(err,details){
	if(err){
		return;
	}
	else{
	$("#meeting").empty();
	var details=JSON.parse(details);
	if(details.body.length==0){
		$("#meeting").append("<p>Sorry, no meetings to show right now</p>");
		$("#meeting").append("<button>Click to create one</button>");
		$("#meeting button:last").attr("onClick","createMeeting('"+details.id+"')");
	}
	else{
		for(var i=0;i<details.body.length;i++){
			$("#meeting").append("<li>Meeting topic :"+details.body[i].topic+" || Created At:"+details.body[i].created_at+" || <a>Join</a></li>");
			//$("#meeting").append("<span><a>Join</a></span>");
		    $("#meeting a:last").attr({"href":details.body[i].join_url,"target":"_blank"});
			if(i==details.body.length-1){
			$("#meeting").append("<br />");	
			$("#meeting").append("<button>Click to create one</button>");
		    $("#meeting button:last").attr("onClick","createMeeting('"+details.id+"')");
			}
		}
	}
	}
	
}

var successMeeting=function(err,details){
	if(err){
		return;
	}
	else{
	$("#submitIt").append("<span>Success</span>");
	}
}



