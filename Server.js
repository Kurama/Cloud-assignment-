var express    		=       require("express");
var multer     		=       require('multer');
var app        		=       express();
var upload 			= 		multer({ dest: './uploads/'});
var cloudinary      =       require('cloudinary');

cloudinary.config({ 
  cloud_name: 'hi2z4su2p', 
  api_key: '114891252928919', 
  api_secret: 'eCL51fYt02gSbegwZYqz75ylwNc' 
});

cloudinary.uploader.upload('./uploads/', function(result) { 
  console.log(result.url);
});

app.use(multer({ dest: './uploads/',
	rename: function (fieldname, filename) {
		return filename+Date.now();
	},
	onFileUploadStart: function (file) {
		console.log(file.originalname + ' is starting ...');
	},
	onFileUploadComplete: function (file) {
		console.log(file.fieldname + ' uploaded to  ' + file.path)
	}
}));

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo',function(req,res){
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
});

app.listen(process.env.PORT,function(){
    console.log("Working on port 3000");
});
