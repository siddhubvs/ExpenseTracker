async function forgot(event){
    event.preventDefault();
    try{
        const forgotDetails={
            email:event.target.email.value
        }

        const response=await axios.post('http://localhost:4000/password/forgotpassword',forgotDetails);
        document.body.innerHTML+=response.data.message;
    }
    catch(err){
        console.log(err);
    }
}