function puxarInfos(event) {
    event.preventDefault(); // Desativa o comportamento padrão do formulário

    // Puxando os alertas de sucesso ou falha
    let topPage = document.getElementById('topPage');
    let success = document.getElementById('success');
    let unsuccess = document.getElementById('unsucess');
    
    // Carregar informações do formulário:
    let nomeAluno = document.getElementById("nomeAluno").value;
    let sobrenomeAluno = document.getElementById("sobrenomeAluno").value;
    let tituloTrabalho = document.getElementById("titulo").value;
    let tipoTrabalho = document.getElementById("tipoTrabalho").value;
    let curso = document.getElementById("curso").value;
    let emailAluno =document.getElementById("email").value;
    let nomeOrientador = document.getElementById("nomeOrientador").value;
    let titulacao = document.getElementById("titulacao").value;
    let palavraChave1 = document.getElementById("palavraChave1").value;

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
    let localPublicacao = document.getElementById("localPublicacao").value;
    let anoPublicacao = document.getElementById("anoPublicacao").value;
    let numeroPaginas = document.getElementById("numeroPaginas").value;

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
        if (message == "erro 200") {
            // Limpando campos
            document.getElementById("nomeAluno").value = "";
            document.getElementById("sobrenomeAluno").value = "";
            document.getElementById("titulo").value = "";
            document.getElementById("tipoTrabalho").value = "";
            document.getElementById("curso").value = "";
            document.getElementById("email").value = "";
            document.getElementById("nomeOrientador").value = "";
            document.getElementById("titulacao").value = "";
            document.getElementById("palavraChave1").value = "";
            document.getElementById("palavraChave2").value = "";
            document.getElementById("palavraChave3").value = "";
            document.getElementById("palavraChave4").value = "";
            document.getElementById("palavraChave5").value = "";
            document.getElementById("localPublicacao").value = "";
            document.getElementById("anoPublicacao").value = "";
            document.getElementById("numeroPaginas").value = 0;
            
            topPage.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

            unsuccess.style.display = 'flex';
            setTimeout(() => {             
                unsuccess.classList.remove('hidden');      
            }, 250);                    

            setTimeout(() => {
                unsuccess.classList.add('hidden');              
            }, 3000);

            setTimeout(() => {
                unsuccess.style.display = 'none';
            }, 3500);  
        }
        else if (message == "erro204") {
            // Limpando campos
            document.getElementById("nomeAluno").value = "";
            document.getElementById("sobrenomeAluno").value = "";
            document.getElementById("titulo").value = "";
            document.getElementById("tipoTrabalho").value = "";
            document.getElementById("curso").value = "";
            document.getElementById("email").value = "";
            document.getElementById("nomeOrientador").value = "";
            document.getElementById("titulacao").value = "";
            document.getElementById("palavraChave1").value = "";
            document.getElementById("palavraChave2").value = "";
            document.getElementById("palavraChave3").value = "";
            document.getElementById("palavraChave4").value = "";
            document.getElementById("palavraChave5").value = "";
            document.getElementById("localPublicacao").value = "";
            document.getElementById("anoPublicacao").value = "";
            document.getElementById("numeroPaginas").value = 0;
            
            topPage.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

            unsuccess.style.display = 'flex';
            setTimeout(() => {              
                unsuccess.classList.remove('hidden');      
            }, 250);                    

            setTimeout(() => {
                unsuccess.classList.add('hidden');                  
            }, 3000);

            setTimeout(() => {
                unsuccess.style.display = 'none';
            }, 3500);  
        } 
        else if (message == "erro206") {
            // Limpando campos
            document.getElementById("nomeAluno").value = "";
            document.getElementById("sobrenomeAluno").value = "";
            document.getElementById("titulo").value = "";
            document.getElementById("tipoTrabalho").value = "";
            document.getElementById("curso").value = "";
            document.getElementById("email").value = "";
            document.getElementById("nomeOrientador").value = "";
            document.getElementById("titulacao").value = "";
            document.getElementById("palavraChave1").value = "";
            document.getElementById("palavraChave2").value = "";
            document.getElementById("palavraChave3").value = "";
            document.getElementById("palavraChave4").value = "";
            document.getElementById("palavraChave5").value = "";
            document.getElementById("localPublicacao").value = "";
            document.getElementById("anoPublicacao").value = "";
            document.getElementById("numeroPaginas").value = 0;
            
            topPage.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

            unsuccess.style.display = 'flex';
            setTimeout(() => {              
                unsuccess.classList.remove('hidden');      
            }, 250);                    

            setTimeout(() => {
                unsuccess.classList.add('hidden');                  
            }, 3000);

            setTimeout(() => {
                unsuccess.style.display = 'none';
            }, 3500);       
        } else {
            //Limpando campos
            document.getElementById("nomeAluno").value = "";
            document.getElementById("sobrenomeAluno").value = "";
            document.getElementById("titulo").value = "";
            document.getElementById("tipoTrabalho").value = 0;
            document.getElementById("curso").value = 0;
            document.getElementById("email").value = "";
            document.getElementById("nomeOrientador").value = "";
            document.getElementById("titulacao").value = 0;
            document.getElementById("palavraChave1").value = "";
            document.getElementById("palavraChave2").value = "";
            document.getElementById("palavraChave3").value = "";
            document.getElementById("palavraChave4").value = "";
            document.getElementById("palavraChave5").value = "";
            document.getElementById("localPublicacao").value = "";
            document.getElementById("anoPublicacao").value = 0;
            document.getElementById("numeroPaginas").value = "";

            // Scrollando para o topo da pagina
            topPage.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            
            // Mostrando mensagem de conclusão     
            success.style.display = 'flex';
            setTimeout(() => {              
                success.classList.remove('hidden');      
            }, 250);                   

            // Removendo menssagem após um tempo
            setTimeout(() => {
                success.classList.add('hidden');        
            }, 3000);     
            
            setTimeout(() => {                              
                success.style.display = 'none'; 
            }, 3500);
        }
    })
    .catch(error => {
        console.error('Erro:', error);

        topPage.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

        unsuccess.style.display = 'flex';
        setTimeout(() => {              
            unsuccess.classList.remove('hidden');      
        }, 250);                    

        setTimeout(() => {
            unsuccess.classList.add('hidden');                  
        }, 3000);

        setTimeout(() => {
            unsuccess.style.display = 'none';
        }, 3500);
    });
}