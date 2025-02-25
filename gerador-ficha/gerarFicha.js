const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const PizZip = require("pizzip");
const path = require("path");
const cors = require('cors');
const Docxtemplater = require("docxtemplater");
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const localStoreFicha = path.join(__dirname, "fichas");

// Configurações do email (coloque seu email e senha aqui)
const EMAIL_USER = "ifrnsigefica@gmail.com";
const EMAIL_PASS = "ngqc ruuy yvfu hekm";

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Criar diretório para fichas se não existir
if (!fs.existsSync(localStoreFicha)) {
    fs.mkdirSync(localStoreFicha);
}

// Página inicial
app.get('/', (req, res) => {
    res.send(`
        ---[ SIGEFICA -> Sistema Gerador de Ficha Catalográfica ]---<br><br>
        Desenvolvedores:<br>
        - Emanoel Heron<br>- Francisco Jordel<br>- Maria Eduarda<br>- Pedro Lucas<br>- Derick Carvalho<br><br>
        IFRN - 2023.2 - Mossoró - RN | Baraúna - RN
    `);
});

// Rota para processar os dados
app.post('/receberDados', async (req, res) => {
    try {
        const {
            firstName, lastName, cutter, jobTitle, jobType, curse,
            studentEmail, poName, titulation, keyWord1, keyWord2,
            keyWord3, keyWord4, keyWord5, pubLocate, yearPub, numPag
        } = req.body;

        const completeName = `${firstName} ${lastName}`;
        console.log(`\n--- SIGEFICA INFORMA ---\nDados de ${completeName} carregados com sucesso!\n`);

        // Carregar template
        const content = fs.readFileSync(path.join(__dirname, "ficha-padrao.docx"), "binary");
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

        // Renderizar documento
        doc.render({
            cutter, sobreAlu: lastName, nomeAlu: firstName,
            tituloTcc: jobTitle, nomeComplAlu: completeName,
            cidadeAlu: pubLocate, ano: yearPub, numPags: `${numPag}f`,
            tipoTrab: jobType, tipoTrab2: "Outro Tipo",
            nomeOrien: poName, chave1: keyWord1, chave2: keyWord2,
            chave3: keyWord3, chave4: keyWord4, chave5: keyWord5,
        });

        const buf = doc.getZip().generate({ type: "nodebuffer", compression: "DEFLATE" });
        const filePath = path.join(localStoreFicha, `FichaCatalografica - ${completeName}.docx`);
        fs.writeFileSync(filePath, buf);

        console.log(`\n--- SIGEFICA INFORMA ---\nFicha gerada com sucesso para ${completeName}!\n`);

        // Configuração do Nodemailer
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
        });

        const emailBibliotecaria = "derickjesiel96@gmail.com"; // Altere conforme necessário

        // Construir e enviar email
        const emailOptions = {
            from: EMAIL_USER,
            to: emailBibliotecaria,
            subject: `Ficha catalográfica de ${completeName} para revisão`,
            text: `Segue anexo a ficha catalográfica do aluno ${completeName}.\n\nE-Mail do aluno para retorno: ${studentEmail}`,
            attachments: [{ filename: `FichaCatalografica - ${completeName}.docx`, path: filePath }],
        };

        await transporter.sendMail(emailOptions);
        console.log(`\n--- SIGEFICA INFORMA ---\nEmail enviado para ${emailBibliotecaria} com sucesso!\n`);

        // Deletar arquivo após envio
        setTimeout(() => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("\n--- SIGEFICA ERRO ---\nErro ao excluir o arquivo:", err);
                } else {
                    console.log("\n--- SIGEFICA INFORMA ---\nArquivo excluído com sucesso!\n");
                }
            });
        }, 2000);

        res.send('success');
    } catch (error) {
        console.error("\n--- SIGEFICA ERRO ---\nErro:", error);
        res.status(500).send('erro206');
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`\n--- SIGEFICA INFORMA ---\nSistema rodando em: http://localhost:${PORT}\n`);
});
