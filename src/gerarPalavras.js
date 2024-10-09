const fs = require('fs');

// Lê o arquivo de palavras
fs.readFile('./src/palavras.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }

  // Separa as palavras em um array
  const palavras = data.split('\n');

  // Filtra as palavras que têm exatamente 5 letras
  const palavrasCincoLetras = palavras.filter(p => p.length === 5);

  // Verifica se existem palavras com 5 letras
  if (palavrasCincoLetras.length === 0) {
    console.log('Não há palavras com 5 letras no arquivo.');
    return;
  }

  // Gera um índice aleatório
  const indiceAleatorio = Math.floor(Math.random() * palavrasCincoLetras.length);

  // Seleciona uma palavra aleatória
  const palavraSelecionada = palavrasCincoLetras[indiceAleatorio];

  console.log(`Palavra aleatória com 5 letras: ${palavraSelecionada}`);
});

