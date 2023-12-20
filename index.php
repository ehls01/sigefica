<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/estiloForm.css">
    <link rel="icon" href="./assets/imgs/logo-if.png">
    <title>Sigefica</title>
</head>
<body>
    <header class="navbar">
        <img src="./assets/imgs/logo-if.png" alt="logo-ifrn" width="6%">
        <h1>Sigefica - Sistema Gerador de Ficha Catalográfica</h1>
        <a class="pag-tutorial" href="./tutorial.html">Tutorial</a>
    </header>

    <div id="sucess" class="successMessage">
        <h1>FICHA GERADA COM SUCESSO E ENVIADA PARA BIBLIOTECA! FIQUE ATENTO AO SEU EMAIL!</h1>
    </div>

    <div id="unsuccess" class="unsuccessMessage">
        <h1>HOUVE UM ERRO AO GERAR SUA FICHA! TENTE NOVAMENTE MAIS TARDE!</h1>
    </div>

    <main class="container">
        <form class="sigefica" onsubmit="puxarInfos(event)" method="post">
            <div class="input-group">
                <h2>Informações Básicas</h2><hr> </br>
                <div class="input-box">
                    <label for="nomeAluno">Nome:</label><br>
                    <input class="input" id="nomeAluno" type="text" name="nomeAluno" placeholder="Nome do aluno" required><br>
                    <span>Ex.: Para o nome João Pedro de Oliveira, digitar João Pedro de.</span><br><br>
                
                    <label for="sobrenomeAluno">Sobrenome:</label><br>
                    <input class="input" id="sobrenomeAluno" type="text" name="sobrenomeAluno" placeholder="Sobrenome do aluno" required><br>
                    <span>Ex.: Para o nome João Pedro de Oliveira, digitar Oliveira.</span><br><br>

                    <label for="titulo">Título:</label><br>
                    <input class="input" id="titulo" type="text" name="titulo" placeholder="Título do Trabalho" required><br><br>

                    <!-- <label for="codigoCutter">Código Cutter:</label><br>
                    <input class="input" id="codigoCutter" type="text" name="codigoCutter" placeholder="Sobrenome do aluno" required><br><br> -->

                    <label for="tipoTcc">Tipo de Trabalho:</label><br>
                    <select class="input" id="tipoTrabalho" required>
                        <option value="selectCurso">--Selecionar Tipo de Trabalho--</option>
                        <option value="tccTecnico">TCC (Técnico)</option>
                        <option value="tccGraduacao">TCC (Graduação)</option>
                        <option value="tccEspecializacao">TCC (Especialização)</option>
                        <option value="mestradoAcademicoE">Mestrado Acadêmico em Ensino</option>
                        <option value="mestradoAcademicoEP">Mestrado Acadêmico em Educação Profissional</option>
                        <option value="mestradoProfissionalEF">Mestrado Profissional em Ensino de Física</option>
                        <option value="mestradoProfissionalEPT">Mestrado Profissional em Educação Profissional e Tecnológica</option>
                        <option value="mestradoProfissionalUSR">Mestrado Profissional em Uso Sustentável dos Recursos Naturais</option>
                        <option value="doutoradoAcademicoEP">Doutorado Acadêmico em Educação Profissional</option>
                    </select><br><br>

                    <label for="curso">Curso:</label><br>
                    <select class="input" id="curso">
                        <option value="selectCurso">--Selecionar Curso--</option>
                        <option value="info">--Informática--</option>
                        <option value="mec">--Mecânica--</option>
                        <option value="eletro">--Eletrotécnica--</option>
                        <option value="edifica">--Edificações--</option>
                    </select><br><br>

                    <label for="titulo">E-Mail:</label><br>
                    <input class="input" id="email" type="email" name="email" placeholder="E-Mail do aluno" required><br><br>
                    <span>Esse email será usado para receber a ficha revisada pela bibliotecária</span><br><br>
                </div>
            </div>

            <div class="input-group">
                <h2>Dados do Orientador</h2><hr> </br>
                <div class="input-box">
                    <label for="nomeOrientador">Nome:</label><br>
                    <input class="input" id="nomeOrientador" type="text" name="nomeOrientador" placeholder="Nome do Orientador" required><br><br>

                    <label for="titulacao">Titulação</label><br>
                    <select class="input" id="titulacao" required>
                        <option value="selectTitulacao">--Selecionar Titulação--</option>
                        <option value="especialista">Especialista</option>
                        <option value="mestre">Mestre(a)</option>
                        <option value="doutor">Doutor(a)</option>
                    </select>   
                </div>
            </div>

            <div class="input-group">
                <h2>Palavras Chave</h2><hr> </br>
                <p>Caso tenha menos que 5 palavras, deixar em branco</p>

                <br>
                <div class="input-box">
                    <label for="palavraChave1">Palavra 1</label>
                    <input class="input" id="palavraChave1" type="text" name="palavraChave1" placeholder="Palavra chave 1" required>
                </div>

                <br>

                <div class="input-box">
                    <label for="palavraChave2">Palavra 2</label>
                    <input class="input" id="palavraChave2" type="text" name="palavraChave2" placeholder="Palavra chave 2" >
                </div>

                <br>

                <div class="input-box">
                    <label for="palavraChave3">Palavra 3</label>
                    <input class="input" id="palavraChave3" type="text" name="palavraChave3" placeholder="Palavra chave 3" >
                </div>

                <br>

                <div class="input-box">
                    <label for="palavraChave4">Palavra 4</label>
                    <input class="input" id="palavraChave4" type="text" name="palavraChave4" placeholder="Palavra chave 4" >
                </div>

                <br>

                <div class="input-box">
                    <label for="palavraChave5">Palavra 5</label>
                    <input class="input" id="palavraChave5" type="text" name="palavraChave5" placeholder="Palavra chave 5" >
                </div>
            </div>

            <div class="input-group">
                <h2>Outras Informações</h2><hr> </br>
                <div class="input-box">
                    <label for="localPublicacao">Cidade:</label><br>
                    <input class="input" id="localPublicacao" type="text" name="localPublicacao" placeholder="Informe a cidade da instituição" required> </br></br></br>
                    <!-- <input class="button" type="button" value="Adicionar outro local"><br><br> -->
    
                    <label for="anoPublicacao">Ano de publicação:</label>
                    <!-- <input class="input" id="anoPublicacao" type="number" name="anoPublicacao" placeholder="2023" required><br><br> -->
                    <select class="input" name="anoPublicacao" id="anoPublicacao">
                        <!-- <option value="selecioneAno">Selecione o ano</option> -->
                        <?php
                            $anoFinal = 2000;
                            $anoInicial = intval(date("Y"));

                            while ($anoInicial >= $anoFinal) {
                                print "<option value=\"$anoInicial\">$anoInicial</option>";
                                $anoInicial -= 1;
                            }
                        ?>
                    </select>

                    <br>
                    <br>

                    <label for="numeroPaginas">Número de Páginas:</label>
                    <input id="numeroPaginas" class="input" type="number" placeholder="100" required min="0"><br><br>
                </div>
            </div>

            <input class="button" type="submit" value="Gerar Ficha Catalográfica" required>
        </form>
    </main>

    <footer>
        <img class="logo-ifrn" src="./assets/imgs/logo-ifrn.png" alt="logo-ifrn">
        <div class="devs">
            <h5>Densenvolvedores:</h5>
            <a href="https://github.com/ehls01">Emanoel Heron</a>
            <p>Francisco Jordel</p>
            <p>Maria Eduarda</p>
            <p>Pedro Lucas</p>
            <a href="https://github.com/DerickCarvalho">Derick Carvalho -> API</a>
        </div>
        <p>@Sigefica</p>
        <p>2023</p>
    </footer>
    <script src="https://cdn.jsdelivr.net/gh/DerickCarvalho/cutterAPI/api.js"></script>
    <script>
        function puxarInfos(event) {
            event.preventDefault(); // Desativa o comportamento padrão do formulário

            // Puxando os alertas de sucesso ou falha
            const success = document.getElementById('sucess');
            const unsuccess = document.getElementById('unsucess');
            
            // Carregar informações do formulário:
            const nomeAluno = document.getElementById("nomeAluno").value;
            const sobrenomeAluno = document.getElementById("sobrenomeAluno").value;
            const tituloTrabalho = document.getElementById("titulo").value;
            const tipoTrabalho = document.getElementById("tipoTrabalho").value;
            const curso = document.getElementById("curso").value;
            const emailAluno =document.getElementById("email").value;
            const nomeOrientador = document.getElementById("nomeOrientador").value;
            const titulacao = document.getElementById("titulacao").value;
            const palavraChave1 = document.getElementById("palavraChave1").value;

            // Formatando palavras chave
            let palavraChave2 = document.getElementById("palavraChave2").value;
            if (palavraChave2 != "") {
                palavraChave2 = "2. " + document.getElementById("palavraChave2").value;
            }

            let palavraChave3 = document.getElementById("palavraChave3").value;
            if (palavraChave3 != "") {
                palavraChave3 = "3. " + document.getElementById("palavraChave3").value;
            }

            let palavraChave4 = document.getElementById("palavraChave4").value;
            if (palavraChave4 != "") {
                palavraChave4 = "4. " + document.getElementById("palavraChave4").value;
            }

            let palavraChave5 = document.getElementById("palavraChave5").value;
            if (palavraChave5 != "") {
                palavraChave5 = "5. " + document.getElementById("palavraChave5").value + ".";
            }
            const localPublicacao = document.getElementById("localPublicacao").value;
            const anoPublicacao = document.getElementById("anoPublicacao").value;
            const numeroPaginas = document.getElementById("numeroPaginas").value;

            // PRA QUE SERVEM
            // TANTOS CÓDIGOS
            // SE A VIDA 
            // NÃO É PROGRAMADA
            // E AS MELHORES COISAS
            // NÃO TEM LÓGICA

            // Criar código Cutter-Sanborn
            const buscarCodigo = buscarMaisSimilar(data, sobrenomeAluno).codigo;

            let primeiraLetraTrabalho = tituloTrabalho[0];
            primeiraLetraTrabalho = primeiraLetraTrabalho.toLowerCase();

            const cutterFinal = buscarCodigo + primeiraLetraTrabalho;

            const informacoes = {
                firstName: nomeAluno,
                lastName: sobrenomeAluno,
                cutter: cutterFinal,
                jobTitle: tituloTrabalho,
                jobType: tipoTrabalho,
                curse: curso,
                studentEmail: emailAluno,
                poName: nomeOrientador,
                titulation: titulacao,
                keyWord1: palavraChave1,
                keyWord2: palavraChave2,
                keyWord3: palavraChave3,
                keyWord4: palavraChave4,
                keyWord5: palavraChave5,
                pubLocate: localPublicacao,
                yearPub: anoPublicacao,
                numPag: numeroPaginas
            };
            
            fetch('http://localhost:3000/receberDados', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(informacoes)
            })
            .then(response => response.text())
            .then(message => {
                console.log('Resposta do servidor:', message);
                success.style.display = 'flex';
            })
            .catch(error => {
                console.error('Erro:', error);
                unsuccess.style.display = 'flex';
            });
        }
    </script>
</body>
</html>