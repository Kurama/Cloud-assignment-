var express    		=       require("express");
var multer     		=       require('multer');
var app        		=       express();
var upload 			= 		multer({ dest: './uploads/'});
var cloudinary      =       require('cloudinary');
var mongoose		=		require('mongoose');

mongoose.connect('mongodb://heroku_zh4cbvfs:hjpc8864334bcvb390de7s1u5q@ds033744.mongolab.com:33744/heroku_zh4cbvfs');

cloudinary.config({ 
  cloud_name: 'hi2z4su2p', 
  api_key: '114891252928919', 
  api_secret: 'eCL51fYt02gSbegwZYqz75ylwNc' 
});

var Schema = mongoose.Schema;
 
var photoSchema = new Schema({
    publicId  		: String
  , version   		: Number
  , signature 		: String
  , format    		: String
  , resourceType	: String
  , url				: String
  , secureUrl		: String
});

var PhotoModel = mongoose.model('Photo', photoSchema);

app.use(multer({ dest: './uploads/',
	rename: function (fieldname, filename) {
		return filename+Date.now();
	},
	onFileUploadStart: function (file) {
		console.log(file.originalname + ' is starting ...');
	},
	onFileUploadComplete: function (file) {
		console.log(file.fieldname + ' uploaded to  ' + file.path)
		cloudinary.uploader.upload('./' + file.path, function(result) { 
		  console.log(result);

		  var photo = new PhotoModel();
		  photo.publicId = result.public_id;
		  photo.version = result.version;
		  photo.signature = result.signature;
		  photo.format = result.format;
		  photo.resourceType = result.resource_type;
		  photo.url = result.url;
		  photo.secureUrl = result.secure_url;

		  photo.save(function (err) {
		  	console.error('Unable to save photo details: ' + err);
		  });
		});
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

		PhotoModel.find({}, 'url', function (error, docs) {
			var photoList = "File is uploaded. Your list of photos are :";
			int i = 1;
			docs.forEach(function (photo) {
				photoList += '\n <a href=' + photo.url + '>' + photo.publicId + '</a>'
			});

			res.end(photoList);
		});
	});
});

app.listen(process.env.PORT,function(){
    console.log("Working on port 3000");
});
