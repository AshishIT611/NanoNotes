document.getElementById("btn").addEventListener("click",()=>{
    event.preventDefault();
    if(document.getElementById("FirstName") && document.getElementById("LastName") && document.getElementById("Email") && document.getElementById("Username") && document.getElementById("Password") && document.getElementById("Number")){
        alert("Fill all details");
    }
});