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
    const stringDefault = 
    "---[ SIGEFICA -> Sistema Gerador de Ficha Catalográfica ]---<br><br>" +
    "Desenvolvedores:<br><br>" +
    "- Emanoel Heron<br>- Francisco Jordel<br>- Maria Eduarda<br>- Pedro Lucas<br>- Derick Carvalho<br><br>" +
    "IFRN - 2023.2 - Mossoró - RN | Baraúna - RN";
    res.send(stringDefault); // Menssagem caso não exista conteúdo
});

app.post('/receberDados', (req, res) => {        

    const {
        cutter,
        lastName,
        firstName,
        studentEmail,

        workTitle,
        workType,
        course,
        institute,
        pubLocate,
        yearPub,
        numPag,

        keyWord1,
        keyWord2,
        keyWord3,
        keyWord4,
        keyWord5,

        poName,
        titulation
    } = req.body;

    const completeName = firstName + " " + lastName;
    
    console.log(`---===[ SIGEFICA INFORMA ]===---\n\nDados de ${completeName} carregados com sucesso!\n\n`);  

    const content = fs.readFileSync(
        path.resolve(__dirname, "ficha-padrao.docx"), // __dirname -> Puxa o nome do autor do arquivo base
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
        nomeComplAlu: completeName,

        tituloTcc: workTitle,
        tipoTrab: workType,
        curso: course,
        instituicao: institute,
        cidadeAlu: pubLocate,
        ano: yearPub,
        numPags: numPag + " f",

        chave1: keyWord1,
        chave2: keyWord2,
        chave3: keyWord3,
        chave4: keyWord4,
        chave5: keyWord5,

        nomeOrien: poName,
        titulacao: titulation
    });

    const buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
    });

    fs.writeFileSync(path.resolve(__dirname, `FichaCatalografica - ${completeName}.docx`), buf);
    console.log(`---===[ SIGEFICA INFORMA ]===---\n\nAluno: ${completeName}\n\nFICHA GERADA COM SUCESSO!\n\n`);

    const emailBibliotecaria = "emanoelheron@gmail.com"; // Email de PRD -> Produção (Comentar caso for usar HOM)
    //const emailBibliotecaria = "derickjesiel96@gmail.com"; // Email de HOM -> Homologação (Comentar caso for usar PRD)

    // UTILIZANDO BREVO.COM PARA ENVIAR OS EMAIL'S

    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com', // Servidor SMTP
        port: 587, // Porta do servidor SMTP
        secure: false, // true para uso com SSL/TLS
        auth: {
          user: 'sigeficaifrn@gmail.com', // Seu endereço de e-mail
          pass: 'NRwmqOtWxcFY9yVC' // Senha do brevo
        }
    });

    // CONTRUINDO A ESTRUTURA DO EMAIL 

    const construirEmail = {
        from: 'sigeficaifrn@gmail.com', // Seu endereço de e-mail
        to: emailBibliotecaria, // Endereço de e-mail do destinatário
        subject: `Ficha catalográfica de ${completeName} para revisão`,
        text: `Segue anexo a ficha catalográfica do aluno ${completeName}\n\nE-Mail do aluno para retorno: ${studentEmail}`,
        attachments: [
        {
            filename: `FichaCatalografica-${completeName}.docx`, // Nome do arquivo anexo
            path: `C:/xampp/htdocs/sigefica/gerador-ficha/FichaCatalografica - ${completeName}.docx` // Caminho absoluto do arquivo
        }
        ]
    };
    
    // ENVIANDO O EMAIL

    transporter.sendMail(construirEmail);

    // EXCLUINDO O ARQUIVO DA FICHA GERADA

    setTimeout(() => {
        const diretorioArquivo = `C:/xampp/htdocs/sigefica/gerador-ficha/FichaCatalografica - ${completeName}.docx`;
        fs.unlink(diretorioArquivo, (err) => {
            if (err) {                
                console.log("Erro ao excluir arquivo:", err);
            }
            return;
        });
    }, 5000);

    res.send('success');
});

// DEFINE A PORTA DO SERVIDOR

const definirPorta = 3000;

// MENSAGEM DE ERRO CASO O SERVIDOR NÃO SEJA INICIADO

app.listen(definirPorta, (err) => {
    if (err) {
        console.log(`---===[ SIGEFICA INFORMA ]===---\n\n--- ERRO ---\n\nFalha ao iniciar serviço\n\n`);
        return;
    }
    
    console.log(`\n\n---===[ SIGEFICA INFORMA ]===---\n\nSistema executado com sucesso!\n\n------------------------------------------\n\nSistema rodando em: http://localhost:${definirPorta}\n\n`);
});