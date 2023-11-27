console.log("JS start");

const myForm = document.querySelector('.my-form');
//const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

// const myForm = document.querySelector('.my-form');
// myForm.addEventListener('button', onSubmit);



async function onSubmit(){
    console.log("inside submit button");

    console.log( emailInput.value );

    let myObj = {
        // name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }
    console.log(myObj);

    await axios.post('http://localhost:5000/user/login', myObj)
        .then((ele) => {
            alert(ele.data.message);
            // console.log(ele.data);
            localStorage.setItem('token' , ele.data.token);
            window.location.href = './expense.html'; 
        })
        .catch((err) => { 
            alert((err));
            console.log("error in User details",err); })

    //resetForm();
}