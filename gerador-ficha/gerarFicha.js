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
        tituloTcc: jobTitle,
        nomeComplAlu: completeName,
        cidadeAlu: pubLocate,
        ano: yearPub,
        numPags: numPag + " f",
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
        fs.writeFileSync(path.resolve(__dirname, `FichaCatalografica - ${completeName}.docx`), buf);
        console.log(`---===[ SIGEFICA INFORMA ]===---\n\nAluno: ${completeName}\n\nFICHA GERADA COM SUCESSO!\n\n`);

        const emailBibliotecaria = "emanoelheron@gmail.com"; // Email de PRD -> Produção (Comentar caso for usar HOM)
        // const emailBibliotecaria = "derickjesiel96@gmail.com"; // Email de HOM -> Homologação (Comentar caso for usar PRD)

        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com', // Servidor SMTP
            port: 587, // Porta do servidor SMTP
            secure: false, // true para uso com SSL/TLS
            auth: {
              user: 'sigeficaifrn@gmail.com', // Seu endereço de e-mail
              pass: 'NRwmqOtWxcFY9yVC' // Sua do brevo
            }
        });

        const construirEmail = {
            from: 'sigeficaifrn@gmail.com', // Seu endereço de e-mail
            to: emailBibliotecaria, // Endereço de e-mail do destinatário
            subject: `Ficha catalográfica de ${completeName} para revisão`,
            text: `Segue anexo a ficha catalográfica do aluno ${completeName}\n\nE-Mail do aluno para retorno: ${studentEmail}`,
            attachments: [
            {
                filename: `FichaCatalografica - ${completeName}.docx`, // Nome do arquivo anexo
                path: `C:/xampp/htdocs/sigefica/gerador-ficha/FichaCatalografica - ${completeName}.docx` // Caminho absoluto do arquivo
            }
            ]
        };

        try {
            transporter.sendMail(construirEmail);
            console.log(`---===[ SIGEFICA INFORMA ]===---\n\nDe: ${emailBibliotecaria}\nPara: ${studentEmail}\n\nAssunto: ${construirEmail.subject}\n\n\nEmail enviado com sucesso para a bibliotecária!\n\n`);
        } catch (error) {
            res.send('erro200');
            console.log(`---===[ SIGEFICA INFORMA ]===---\n\n--- ERRO 200 ---\n\nFalha ao enviar e-mail!\n\n`);
        }

        setTimeout(() => {
            const diretorioArquivo = `C:/xampp/htdocs/sigefica/gerador-ficha/FichaCatalografica - ${completeName}.docx`; // Modificar para o seu

            fs.unlink(diretorioArquivo, (err) => {
                if (err) {
                    res.send('erro204');
                    console.error('---===[ SIGEFICA INFORMA ]===---\n\n--- ERRO 204 ---\n\nOcorreu um erro ao excluir o arquivo!\n\nErro:' + err + '\n\nDiretório:' + diretorioArquivo + '\n\n');
                    return;
                }
                console.log('---===[ SIGEFICA INFORMA ]===---\n\nArquivo excluído com sucesso!\n\nSistema está pronto para gerar uma nova ficha!\n\n');
            });
        }, 2000);
        res.send('success');
    } catch (error) {
        console.log(`---===[ SIGEFICA INFORMA ]===---\n\n--- ERRO 206 ---\n\nErro ao gerar ficha catalográfica e enviar para bibliotecária!\n\nErro: ${error}\n\n`);
        res.send('erro206');
    }
});

const definirPorta = 3000;

app.listen(definirPorta, (err) => {
    if (err) {
        console.log("deu madeira");
        return;
    }
    
    console.log(`\n\n---===[ SIGEFICA INFORMA ]===---\n\nSistema executado com sucesso!\n\n------------------------------------------\n\nSistema rodando em: http://localhost:${definirPorta}\n\n`);
});