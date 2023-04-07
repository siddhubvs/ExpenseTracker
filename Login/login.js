async function login(e){
    try{
    e.preventDefault();

    const loginDetails={
        email:e.target.email.value,
        password:e.target.password.value
    }

    

    const response=await axios.post("http://localhost:4000/user/login",loginDetails);

    if(response.status===200){
    alert(response.data.message);
    localStorage.setItem('token',response.data.token);
    window.location.href="../Expense/expense.html";
    }

    else if(response.status===401)
    document.body.innerHTML+=`<br><div style="color:pink;text-align:center;">${response.data.message}</div`;
   
    
    }
    catch(err){
        
        document.body.innerHTML+=`<br><div style="color:red;text-align:center;">${err.message}</div`;
    }

}
var forgot=document.getElementById('forgot');

forgot.addEventListener('click',async()=>{
    window.location.href="../Forgot/forgot.html";
})