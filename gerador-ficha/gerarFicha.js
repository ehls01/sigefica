const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const PizZip = require("pizzip");
const path = require("path");
const cors = require('cors');
const Docxtemplater = require("docxtemplater");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.all('/', (req, res) => {
    res.send('gerarFicha'); // Menssagem caso não exista conteúdo
});

app.post('/receberDados', (req, res) => {        

    const {
        firstName,
        lastName,
        cutter,
        jobTitle,
        jobType,
        curse,
        studentEmail,
        poName,
        titulation,
        keyWord1,
        keyWord2,
        keyWord3,
        keyWord4,
        keyWord5,
        pubLocate,
        yearPub,
        numPag
    } = req.body;

    const completeName = firstName + " " + lastName;
    
    console.log(`Funcionando! Seu nome é: ${completeName}`);  

    const content = fs.readFileSync(
        path.resolve(__dirname, "ficha-padrao.docx"),
        "binary"
    );

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    doc.render({
        cutter: cutter,
        sobreAlu: lastName,
        nomeAlu: firstName,
        tituloTcc: jobTitle,
        nomeComplAlu: completeName,
        ano: yearPub,
        numPags: numPag + "f",
        tipoTrab: jobType,
        tipoTrab2: "otoTipo",
        nomeOrien: poName,
        chave1: keyWord1,
        chave2: keyWord2,
        chave3: keyWord3,
        chave4: keyWord4,
        chave5: keyWord5,
    });

    const buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
    });

    try {
        fs.writeFileSync(path.resolve(__dirname, "FichaCatalografica.docx"), buf);
        res.send('Ficha gerada com sucesso!');        

        const emailBibliotecaria = "derickjesiel96@gmail.com";

        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com', // Servidor SMTP
            port: 587, // Porta do servidor SMTP
            secure: false, // true para uso com SSL/TLS
            auth: {
              user: 'sigeficaifrn@gmail.com', // Seu endereço de e-mail
              pass: 'NRwmqOtWxcFY9yVC' // Sua senha de e-mail
            }
        });

        const construirEmail = {
            from: 'sigeficaifrn@gmail.com', // Seu endereço de e-mail
            to: emailBibliotecaria, // Endereço de e-mail do destinatário
            subject: `Ficha catalográfica de ${completeName} para revisão`,
            text: `Segue anexo a ficha catalográfica do aluno ${completeName}\n\nE-Mail do aluno para retorno: ${studentEmail}`,
            attachments: [
            {
                filename: 'FichaCatalografica.docx', // Nome do arquivo anexo
                path: 'C:/xampp/htdocs/sigefica/gerador-ficha/FichaCatalografica.docx' // Caminho absoluto do arquivo
            }
            ]
        };

        try {
            transporter.sendMail(construirEmail);
            console.log(`Email enviado com sucesso para a bibliotecária!`);
        } catch (error) {
            console.log('Deu ruim!');
        }

        setTimeout(() => {
            const diretorioArquivo = 'C:/xampp/htdocs/sigefica/gerador-ficha/FichaCatalografica.docx'; // Modificar para o seu

            fs.unlink(diretorioArquivo, (err) => {
                if (err) {
                  console.error('Ocorreu um erro ao excluir o arquivo:', err);
                  return;
                }
                console.log('Arquivo excluído com sucesso!');
            });
        }, 2000);
    } catch (error) {
        res.send('Erro ao gerar e enviar ficha\n\nErro:', error);
    }
});

const definirPorta = 3000;

app.listen(definirPorta, () => {
    console.log(`Servidor Node.js está rodando em http://localhost:${definirPorta}`);
});