console.log("JS start");

const myForm = document.querySelector('.my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

// const myForm = document.querySelector('.my-form');
// myForm.addEventListener('button', onSubmit);



async function onSubmit(){
    console.log("inside submit button");

    console.log(nameInput.value , emailInput.value );
    if(nameInput.value != '' && emailInput.value!=''  && passwordInput.value!='' )
    {

    let myObj = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }
    console.log(myObj);

    await axios.post('http://localhost:5000/user/signup', myObj)
        .then((ele) => {
            // console.log(ele.data);
            window.location.href = './login.html';
        })
        .catch((err) => { console.log(err); })
    }
    else{
        alert('Please fill all details')
    }

    //resetForm();
}