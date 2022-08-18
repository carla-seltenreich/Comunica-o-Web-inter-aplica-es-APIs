const fs = require('fs');
const https = require('https');

const httpsGet = () => {
    return new Promise((resolve, reject) => {
        https.get('https://picsum.photos/v2/list', (response) => {
            let dados = '';
            response.on('data', (buffer) => {
                dados += buffer;
            });
            response.on('end', () => {
                resolve(JSON.parse(dados));
            })
        }).on('error', (error) => {
            reject(error);
        });
    });
}

httpsGet()
    .then((dados) => {
        console.log(dados);
        escreveArquivo(dados);
    })
    .catch((error) => {
        console.log(error)
    });
    
    function escreveArquivo(dados) {

        let content = JSON.stringify(dados);

        fs.writeFile('novofile', content, {}, function (error) {
            if (error) {
                throw error;
            }
            console.log("Arquivo gravado com sucesso!");
    });
}