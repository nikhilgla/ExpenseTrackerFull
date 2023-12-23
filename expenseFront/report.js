

console.log("inside report");


async function onRDButton(){
    console.log("inside Download report");

    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/premium/downloadreport', { headers: { "Authorization": token } });

    console.log(response);
}