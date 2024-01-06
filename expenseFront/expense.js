console.log("JS start");

const myForm = document.querySelector('.my-form');
const price = document.querySelector('#price');
const titleInput = document.querySelector('#title');
const emailInput = document.querySelector('#description');
var itemList = document.querySelector('.items')
var leaderItems = document.querySelector('.leaderitems');
var showleader = document.querySelector('.showleader');
var showExpense = document.querySelector('.showExpense');

// var tot = document.querySelector('.totalamount');
var limit = document.querySelector('#lmt');

if (localStorage.getItem('lim') === null) {
    limit.value = Number(10);
}
else {
    limit.value = localStorage.getItem('lim');
}

myForm.addEventListener('submit', onSubmit);
// var total = Number("0");
var premium = false;

window.addEventListener('DOMContentLoaded', async () => {
    let l1 = limit.value

    const token = localStorage.getItem('token');
    await axios.get(`http://localhost:5000/expense/data?page=1&limit=${l1}`, { headers: { "Authorization": token } })
        .then((ele) => {
            console.log(ele);
            if (ele.data.AllData.length > 0) {
                const ch = 'Expense List';
                showExpense.innerHTML = showExpense.innerHTML + ch;

                const chh = `<tr class="table-info">
                    <th scope="col">#</th>
                    <th scope="col">Expense</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Type</th>
                    <th scope="col">Delete</th>
                    </tr>`
                document.querySelector('.headOfexpense').innerHTML = chh;
            }

            for (var i = 0; i < ele.data.AllData.length; i++) {
                showOnScreen(ele.data.AllData[i], i + 1);
            }
            checkPremium(ele.data.isPremium);
        })
        .catch((err) => { console.log(err); })

})

async function getPages(page) {
    const ll = limit.value;
    const token = localStorage.getItem('token');
    await axios.get(`http://localhost:5000/expense/data?page=${page}&limit=${ll}`, { headers: { "Authorization": token } })
        .then((ele) => {
            console.log(ele);
            if (ele.data.AllData.length > 0) {
                const ch = 'Expense List';
                showExpense.innerHTML = ch;
            }
            itemList.innerHTML = '';
            for (var i = 0; i < ele.data.AllData.length; i++) {

                showOnScreen(ele.data.AllData[i], i + 1);
            }
            localStorage.setItem('lim', ll)
            if(page >= 3){
                const pp = `<li class="page-item"><button class="btn btn-secondary" onclick="getPages(${page+1})">${page+1}</button></li>`
                document.querySelector('.pagination').innerHTML = document.querySelector('.pagination').innerHTML + pp;
            }
        })
        .catch((err) => { console.log(err); })

}

async function checkPremium(ele) {
    if (ele === true) {
        console.log("premium hai bhai");
        document.getElementById("rzp-button1").style.visibility = "hidden";
        document.getElementById("pree").style.visibility = "visible";
        document.getElementById("ldr-nav").style.visibility = "visible";
        premium = true;
    }
    else {
        console.log("nhi hai premium");
    }
}

async function onSubmit(e) {
    e.preventDefault();
    // console.log(titleInput.value);
    if (titleInput.value != '' && price.value != '' && emailInput.value != '') {

        let myObj = {
            title: titleInput.value,
            price: price.value,
            description: emailInput.value
        }
        console.log(myObj);
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/expense/data', myObj, { headers: { "Authorization": token } })
            .then((ele) => {
                console.log(ele.data);
                showOnScreen(ele.data.newExpenseDetail, 'new')
            })
            .catch((err) => { console.log(err); })

        resetForm();
    }
    else {
        alert('Please fill all details of the expenditure');
    }
}

async function showOnScreen(userObj, c1) {
    // const childli = `<li class="item" id=${userObj.title}>${userObj.title} - ${userObj.price} - ${userObj.description} <button onclick=deleteExp('${userObj.title}','${userObj.id}') class="btn btndel btn-danger btn-sm float-right delete">X</button>  <button onclick=insExp('${userObj.title}','${userObj.id}') class="btn btn-success btn-sm float-right delete" style=" visibility:hidden;">Ins</button></li>`
    const childtr = `<tr id=${userObj.title} class="table-info">
    <th scope="row">${c1}</th>
    <td>${userObj.title}</td>
    <td>${userObj.price}</td>
    <td>${userObj.description}</td>
    <td><button onclick=deleteExp('${userObj.title}','${userObj.id}') class="btn btndel btn-danger btn-sm float-right delete">X</button></td>
  </tr>`
    itemList.innerHTML = itemList.innerHTML + childtr;
}

async function showleaderboard(userObj, c1) {
    const childli = `<tr>
    <th scope="row">${c1}</th>
    <td>${userObj.name}</td>
    <td>${userObj.totalAmount}</td>
  </tr>`
    leaderItems.innerHTML = leaderItems.innerHTML + childli;
}

async function deleteExp(name, id) {

    const cc = document.getElementById(name);
    //var li = cc.parentElement;
    itemList.removeChild(cc);

    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/expense/data/${id}`, { headers: { "Authorization": token } })
        .then((ele) => { console.log(ele.data) })
        .catch((err) => { console.log(err); });
}

async function insExp(name, id) {
    const cc = document.getElementById(name);
    //var li = cc.parentElement;
    itemList.removeChild(cc);

    // this.total = this.total - Number(amount);
    // const childtotal = `<h3>Total Value worth of Products : ${this.total}</h3>`;
    // tot.innerHTML = childtotal;

    await axios.post(`http://localhost:5000/expense/data/ins/${id}`)
        .then((ele) => {
            console.log(ele.data);
            titleInput.value = ele.data.newUserDetail.title;
            price.value = ele.data.newUserDetail.price;
            emailInput.value = ele.data.newUserDetail.description;
        })
        .catch((err) => { console.log(err); });
}

// reset the form
function resetForm() {
    titleInput.value = '';
    price.value = '';
    emailInput.value = '';
}

//paybutton
async function onPaybutton() {
    console.log("inside pay button");

    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/purchase/buypremium', { headers: { "Authorization": token } });
    console.log(response);

    var options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function (response) {
            await axios.post('http://localhost:5000/purchase/updatetransactionstatus', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            },
                { headers: { "Authorization": token } })

            alert('You are a Premium User now')
            checkPremium(true);
        }
    }

    const rzp1 = new Razorpay(options);
    rzp1.open();

    rzp1.on('payment.failed', function (response) {

        console.log(">>>>>>>>>>>>>>>>", response, "<<<<<<<<<<<<<<<<<<");
        alert('Something went wrong in RZP');

    })
}

async function onLeaderButton() {
    if (premium == true) {
        console.log("inside leaderboard button");

        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/premium/showleader', { headers: { "Authorization": token } });

        console.log(response.data.leaderDetails);

        const ch = 'LeaderBoard';
        showleader.innerHTML = ch;
        const chh = `<tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Total Amount</th>
      </tr>`
        document.querySelector('.headOfleader').innerHTML = chh;

        var c1 = 1;
        leaderItems.innerHTML = '';
        response.data.leaderDetails.forEach(element => {
            showleaderboard(element, c1);
            c1 = c1 + 1;
        });
        window.scrollBy(0,1000);
    }
    else {
        alert("Buy Premium");
    }
}

async function onReportButton() {
    if (premium == true) {
        console.log("inside report button");

        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/premium/showleader', { headers: { "Authorization": token } }).then(console.log("donr"))
        // window.open("./report.html", "_blank")
    }
    else {
        alert("Buy Premium")
    }

}

async function onLogoutButton() {
    console.log("inside logout");
    localStorage.removeItem("token");
    window.location.href = "./login.html"

}