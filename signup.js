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

    let myObj = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }
    console.log(myObj);

    await axios.post('http://localhost:6000/expense/users', myObj)
        .then((ele) => {
            console.log(ele.data);
        })
        .catch((err) => { console.log(err); })

    //resetForm();
}