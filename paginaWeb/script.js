const ligarButton = document.getElementById('ligarButton');
const desligarButton = document.getElementById('desligarButton');
const restartButton = document.getElementById('restartButton');
const producaoDisplay = document.getElementById('producaoDisplay');
const status = document.getElementById('status');

var urlPost = 'https://leanwebsensor-lbd8.onrender.com/chaves'
var urlGet = 'https://leanwebsensor-lbd8.onrender.com/producao'

function receiverRequest(){
    fetch(urlGet, {
        method: 'GET',  
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => {
        producaoDisplay.textContent = json.sensor;
         status.textContent = json.msg;
        console.log(json.sensor);
    })
    if(json.msg == "LIGADO"){
        if(json.snsor == sensor_old)
        contaErro = contaErro + 1;
    else{
        contaErro = 0;
        sensor_old = json.sensor;
    }
    if (contaErro>= 5)
      error.textContent = "ERRO DE ACIONAMENTO";
    else
     erro.textContent = "";

    }
    else
     erro.textContent = "";

}

setInterval(receiverRequest, 2000)  

ligarButton.addEventListener('click', () => {
    let requestData = {"liga": 1, "desliga": 0, "restart": 0}
    sendRequest(requestData)
 })

desligarButton.addEventListener('click', () => {
    let requestData = {"liga": 0, "desliga": 1, "restart": 0}
    sendRequest(requestData)
});

restartButton.addEventListener('click', () => {
    let requestData = {"liga": 0, "desliga": 0, "restart": 1}
    sendRequest(requestData)
});

function sendRequest(data){
    fetch(urlPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}