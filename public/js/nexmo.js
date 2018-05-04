const numeroCliente = document.getElementById('numero'),
      mensagemEnviar = document.getElementById('mensagem'),
      button = document.getElementById('button'),
      response = document.querySelector('.response');

button.addEventListener('click', send, false);

const socket = io();
socket.on('smsStatus', function(data){
  response.innerHTML = '<h5>Text message sent to ' + data.numero + '</h5>';
})

function send() {
  console.log('enviado');
  const numero = numeroCliente.value.replace(/\D/g, '');
  const texto = mensagemEnviar.value;

  fetch('/', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({numero: numero, texto: texto})
  })
  .then(function(res){
    console.log(res);
  })
  .catch(function(err){
    console.log(err);
  });
}