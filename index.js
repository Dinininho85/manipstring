const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Configuração do bodyParser para JSON
app.use(bodyParser.json());

// Validação de entrada para o parâmetro "texto"
const validateTexto = (texto) => {
    if (!texto || typeof texto !== 'string') {
        throw new Error('Parâmetro "texto" inválido');
    }
};

// Função para verificar se uma string é um palíndromo
const isPalindrome = (str) => {
    validateTexto(str);

    const reversed = str.split('').reverse().join('');
    return str === reversed;
};

// Função para contar o número de ocorrências de cada caractere na string
const countCharacters = (str) => {
    validateTexto(str);

    const count = {};
    str.split('').forEach(char => {
        count[char] = (count[char] || 0) + 1;
    });
    return count;
};

// Função principal para manipulação da string
const manipulacaoString = (req, res) => {
    try {
        const texto = req.body.texto;

        // Validação do parâmetro "texto"
        validateTexto(texto);

        // Verificar se a string é um palíndromo
        const palindromo = isPalindrome(texto);

        // Contar o número de ocorrências de cada caractere na string
        const ocorrencias_caracteres = countCharacters(texto);

        // Construir o objeto de resposta
        const result = {
            palindromo: palindromo,
            ocorrencias_caracteres: ocorrencias_caracteres
        };

        // Retornar a resposta como JSON
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error.message });
    }
};

// Rota para manipulação da string
app.post('/api/manipulacao-string', manipulacaoString);

// Manipulador de erros global
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send({ message: 'Erro interno do servidor' });
});

// Iniciar o servidor na porta especificada
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
