<?php
    $diretorioDownload = $_GET["diretorio"];
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TESTE DOWNLOAD</title>
</head>
<body>
    <h1>Download do Meu Arquivo</h1>
  
    <p>Clique no link abaixo para baixar o arquivo:</p>
    
    <a id="downloadComplete" href="<?php print $diretorioDownload ?>" download>Download do Arquivo</a>

    <script>
        document.getElementById('downloadComplete').addEventListener('click', () => { // Array Function
                setTimeout(() => {
                    const diretorioArquivo = "../gerador-ficha/FichaCatalografica.docx";

                    fetch('http://localhost:3000/excluirArquivo', {
                        method: 'GET',
                        headers: {
                        'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.text())
                    .then(message => {
                        console.log('Resposta do servidor:', message);
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                    });
                
                    window.location.href = "./index.html";
                }, 2000);
            });            
    </script>
</body>
</html>