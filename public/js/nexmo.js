const numeroCliente = document.getElementById('numero'),
      mensagem = document.getElementById('mensagem'),
      button = document.getElementById('button'),
      response = document.querySelector('.response');

button.addEventListener('click', send, false);

const socket = io();
socket.on('smsStatus', function(data){
  response.innerHTML = '<h5>Text message sent to ' + data.numero + '</h5>';
})

function envioNotificacao() {
  console.log('send');
  const numero = numeroCliente.value.replace(/\D/g, '');
  const texto = mensagem.value;

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