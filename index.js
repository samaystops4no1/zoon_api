var express=require("express");
var request=require("request");
var bodyParser=require("body-parser");

//My native modules
var blogger=require("./required/javascript/logger.js");
var logger= blogger.logger;
var error=require("./required/json/error.json");
var app=express();

//variables
var key=process.env.KEY;
var secret=process.env.SECRET;

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

//static files
app.use(express.static(__dirname+'/required'));

//setting up the port
app.set('port', process.env.PORT || 8080);

//firing up the server
app.listen(app.get('port'),function(){
	logger.info("The server is now running...");
});

//the api code begins from here
app.get("/",function(req,res){
	logger.info(req.method+" request received from "+req.url);
	res.sendFile(__dirname+"/required/html/index.html");
});

app.get("/users",function(req,res){
	logger.info(req.method+" request received from "+req.url);
	
	request({
	     url:"https://api.zoom.us/v1/user/list",
	     method:"POST",
		 qs:{api_key:key,api_secret:secret,data_type:"JSON"}
		 },function(err,response,body){
	          if(err){
		          logger.error(err);
				  res.status(300).json(error.apiError);
	            }
	          else{
		          logger.info(body);
				  var body=JSON.parse(body);
				  res.status(200).json({"success":true,"body":body.users});
	            }
			});
			
});

app.get("/meeting",function(req,res){
	logger.info(req.method+" request received from "+req.url);
	
		request({
	     url:"https://api.zoom.us/v1/meeting/list",
	     method:"POST",
		 qs:{api_key:key,api_secret:secret,data_type:"JSON",host_id:req.query.id}
		 },function(err,response,body){
	          if(err){
		          logger.error(err);
				  res.status(300).json(error.apiError);
	            }
	          else{
		          logger.info(body);
				  var body=JSON.parse(body);
				  res.status(200).json({"success":true,"id":req.query.id,"body":body.meetings});
	            }
			});
	
});

app.get("/create",function(req,res){
	logger.info(req.method+" request received from "+req.url);
	logger.info(req.query);
	
		request({
	     url:"https://api.zoom.us/v1/meeting/create",
	     method:"POST",
		 qs:{api_key:key,api_secret:secret,data_type:"JSON",host_id:req.query.id,topic:req.query.topic,type:2}
		 },function(err,response,body){
	          if(err){
		          logger.error(err);
				  res.status(300).json(error.apiError);
	            }
	          else{
		          logger.info(body);
				  var body=JSON.parse(body);
				  res.status(200).json({"success":true,"body":body.users});
	            }
			});
	
});
