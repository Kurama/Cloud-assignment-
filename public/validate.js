
window.onload = function(){
 	//alert("window is loaded");
 	// var mybutton = document.getElementById('btn1');
 	// mybutton.onclick = buttonClickHandler;
   // console.log("windowaLoaded");

   //  $('#clickBut').on('click',validateForm);


 }

function validateForm() {

var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
if( ( username == "i077559" && password == "123")||( username == "i077636" && password == "123")||( username == "i077568" && password == "123")){
// alert ("Login successfully");
window.location = "photo"; // Redirecting to other page.
return false;
}
else if(username==""|| password==""){
	alert("Login unsuccessful.Please enter all details.");
	return false;
}


}
