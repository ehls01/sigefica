// Para executar, use primeiro: npm install tcp-port-used

const portaTcpEmUso = require('tcp-port-used');

const porta = 443; // Substituir pela porta que quer testar

portaTcpEmUso.check(porta, '127.0.0.1')
    .then(inUse => {
        if (inUse) {
            console.log(`A porta ${porta} está em uso`);
        } else {
            console.log(`A porta ${porta} está livre`);
        }
    })
    .catch(erro => {
        console.log('Erro: ', erro.message);
    });