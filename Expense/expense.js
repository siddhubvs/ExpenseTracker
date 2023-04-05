
async function expense(event){
    event.preventDefault();
   
    const expenseDetails={
        amount:event.target.amount.value,
        description:event.target.description.value,
        category:event.target.category.value,
    }

    const response=await axios.post(`http://localhost:4000/expense/add`,expenseDetails,{headers:{"Authorisation":token}});
    
    showNewUser(response.data.NewExpenseDetail);

}

var premium=document.getElementById('premium');

premium.onclick=async(e)=>{
    
    const token=localStorage.getItem('token');
    const response=await axios.get('http://localhost:4000/premium/purchase',{headers:{"Authorisation":token}});
    var options={
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        "handler": async function(response){
            await axios.post('http://localhost:4000/premium/updatetransactionstatus',{
               order_id:options.order_id,
               payment_id:response.razorpay_payment_id,

            },{headers:{"Authorisation":token}})
            alert('You are a premium user');
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
const token=localStorage.getItem('token');
window.addEventListener('DOMContentLoaded',async()=>{
    try{
   
    const response=await axios.get('http://localhost:4000/expense',{headers:{"Authorisation":token}})
    console.log(response);
    for(var i=0;i<response.data.AllExpenseDetail.length;i++){
            showNewUser(response.data.AllExpenseDetail[i]);
    }
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
    var h1=document.getElementById("end");
    div.insertBefore(li,h1)
}
