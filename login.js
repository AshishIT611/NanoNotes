document.getElementById("btn").addEventListener("click",()=>{
    event.preventDefault();
    if(document.getElementById("username").value=="" && document.getElementById("password").value==""){
        alert("Please enter username and password");
    } 
});