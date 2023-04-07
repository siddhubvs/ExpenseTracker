

async function expense(event){
    event.preventDefault();
   
    const expenseDetails={
        amount:event.target.amount.value,
        description:event.target.description.value,
        category:event.target.category.value,
    }
    const token=localStorage.getItem('token');
    const response=await axios.post(`http://localhost:4000/expense/add`,expenseDetails,{headers:{"Authorisation":token}});
    
    showNewUser(response.data.NewExpenseDetail);

}


var premium=document.getElementById('premium');

function premiumUser(){
    const token=localStorage.getItem('token');
    premium.remove();
    var h1=document.getElementById('end');
    var div=document.getElementById('tracker');
    var p=document.createElement('p');
    p.textContent='You are a premium user';
    var leaderboard=document.createElement('button');
    leaderboard.textContent='Show Leaderboard';
    leaderboard.width='100%';
    var download=document.createElement('button');
    download.textContent='Download Expenses';
    div.width='100%';
    var showExpenses=document.getElementById('pagination');
    div.insertBefore(p,showExpenses);
    div.insertBefore(leaderboard,showExpenses);  
    div.insertBefore(download,showExpenses);
    
    leaderboard.onclick=async(e)=>{
        var leader=document.createElement('h2');
        leader.textContent='LeaderBoard';
        div.insertBefore(leader,h1);
        try{
        e.preventDefault();
        const response=await axios.get('http://localhost:4000/premium/showleaderboard',{headers:{"Authorisation":token}})
        
        for(var i=0;i<response.data.length;i++){
            showLeaderBoard(response.data[i]);
            console.log(response.data[i]);
        }
            
    }catch(err){
        console.log(err);
    }
    }
}


function showLeaderBoard(obj){
    var li=document.createElement('li');
    li.style.fontSize='20px';
    li.style.textAlign='center';
    li.textContent=' '+'Name'+' - '+obj.name+' - '+'Total Expense'+' - ' + obj.totalExpense;
    
    var div=document.getElementById("tracker")
    var h1=document.getElementById("end");
    div.insertBefore(li,h1)

}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

premium.onclick=async(e)=>{
    
    const token=localStorage.getItem('token');
    const response=await axios.get('http://localhost:4000/purchase/purchasePremium',{headers:{"Authorisation":token}});
    var options={
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        "handler": async function(response){
        const res=await axios.post('http://localhost:4000/purchase/updatetransactionstatus',{
               order_id:options.order_id,
               payment_id:response.razorpay_payment_id,
            },{headers:{"Authorisation":token}})
            alert('You are a premium user');
            localStorage.setItem('token',res.data.token);
            premiumUser();   
        }
    }
    const rzp1=new Razorpay(options);
    rzp1.open();
    e.preventDefault();
    rzp1.on('payment.failed',async function(response){
        console.log(response);
        alert('Something went wrong');
        await axios.post('http://localhost:4000/premium/failtransaction',{
               order_id:options.order_id,
            },{headers:{"Authorisation":token}})
        
    })
    
}

window.addEventListener('DOMContentLoaded',async()=>{
    try{
    const token=localStorage.getItem('token');
    const decodetoken=parseJwt(token);
    console.log(decodetoken);
    const ispremiumuser=decodetoken.isPremiumUser;
    if(ispremiumuser){
        premiumUser();
    }
    const page=1;
    const response=await axios.get(`http://localhost:4000/expense?page=${page}`,{headers:{"Authorisation":token}})
    for(var i=0;i<response.data.AllExpenseDetail.length;i++){
        showNewUser(response.data.AllExpenseDetail[i]);
    }
    showPagination(response.data);
    }catch(err){
        console.log(err);
    }
})


function showNewUser(obj){     
    var li=document.createElement('li');
    li.style.fontSize='20px';
    li.style.textAlign='center';
    li.textContent=obj.amount+' - ' + obj.description+' - '+obj.category+'  '+ '   ';

    var deletebtn=document.createElement('button');
    deletebtn.style.textAlign='center';
    deletebtn.textContent='Delete'
    deletebtn.width='100%'
    deletebtn.onclick=async (e)=>{
        try{
        if(confirm('Are you sure to delete')){
                var li=e.target.parentElement;
                li.remove();
                const token=localStorage.getItem('token');
                const amount=obj.amount;
                const response=await axios.delete(`http://localhost:4000/expense/delete/${obj.id}`,{headers:{"Authorisation":token}});
                console.log(response);
        }
        }
        catch(err){
          console.log(err);
        }
    }

    li.appendChild(deletebtn);
    var div=document.getElementById("tracker")
    var h1=document.getElementById("leaderboard");
    div.insertBefore(li,h1)
}
var pagination=document.getElementById('pagination'); 
function showPagination({
    currentPage,
    hasNextPage,
    nextPage,
    hasPreviousPage,
    previousPage,
    lastPage
}){
     if(hasPreviousPage){
        const btn1=document.createElement('button');
        btn1.innerHTML=previousPage
        btn1.addEventListener('click',()=>GetExtendedCampaignOverviewSender(previousPage))
        pagination.appendChild(btn1);
    }
    const btn2=document.createElement('button');
    btn1.innerHTML=currentPage,
    btn1.addEventListener('click',()=>GetExtendedCampaignOverviewSender(currentPage))
    pagination.appendChild(btn2);

    if(hasNextPage){
        const btn3=document.createElement('button');
        btn3.innerHTML=nextPage
        btn1.addEventListener('click',()=>GetExtendedCampaignOverviewSender(nextPage))
        pagination.appendChild(btn3);
    }
}

async function getProducts(page){
    try{
    const response=await axios.get(`http://localhost:4000/expense?page=${page}`,{headers:{"Authorisation":token}})
    showNewUser(response.data.AllExpenseDetail);
    showPagination(response.data);
    }catch(Err){
        console.log(Err);
    }
}