let containerBettwen = document.getElementById('containerBettwen')
let tabLetreco = document.getElementById('containerDivTab');
let tabTeclado = document.getElementById('containerDivTec');
let body = document.getElementById('body');
body.classList.add('flex', 'justify-center', 'flex-col', 'items-center', 'bg-zinc-300')

let keyboards = [["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
["a", "s", "d", "f", "g", "h", "j", "k", "l"],
["z", "x", "c", "v", "b", "n", "m", "ç"]]

//remover os consoleslogs
//wqrte

let colunas = 5;
let linhas = 6;

// let palavraSorteada = 'qwert'.toLowerCase()
let palavraSorteada = ''
let palavraNormal = ''

let setLinha = 0
let setColuna = 0







//sorteia palavras ---------------------------------------------------------------------
async function carregarPalavras() {
    const response = await fetch('./palavras.txt');
    const data = await response.text();
    const palavras = data.split('\n').filter(p => p.length === 5 && !p.includes('-'))
    palavraNormal = palavras
    return palavras;
}

async function gerarPalavra() {
    const palavrasCincoLetras = await carregarPalavras();
    if (palavrasCincoLetras.length === 0) {
        console.log('Não há palavras com 5 letras no arquivo.');
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * palavrasCincoLetras.length);
    const palavraSelecionada = palavrasCincoLetras[indiceAleatorio];


    palavraSorteada = palavraSelecionada
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    //falta impleentaçãopra tirar o çççç

    console.log(`Palavra sorteada (sem acentos): ${palavraSorteada}`);
}

// Para testar a função, você pode chamar gerarPalavra()
gerarPalavra();








//funça cria tabela onde ficam os nimes -------------------------------------------------------

for (let linha = 0; linha < linhas; linha++) {

    let linhaDiv = document.createElement('div');
    linhaDiv.classList.add('flex');

    for (let coluna = 0; coluna < colunas; coluna++) {

        let blocosColunas = document.createElement('div');
        blocosColunas.classList.add('flex', 'items-center', 'text-zinc-600', 'justify-center', 'bg-zinc-400', 'bg-opacity-40', 'm-1',
            'w-14', 'h-14', 'border-4', 'border-neutral-400', 'p-7', 'rounded-lg', 'text-lg');
        // blocosColunas.textContent = 'a'.toUpperCase();
        if (linha === 0) {
            blocosColunas.classList.remove('border-neutral-400')
            blocosColunas.classList.add('border-blue-500');
        }
        blocosColunas.id = `l${linha}c${coluna}`
        linhaDiv.appendChild(blocosColunas);
    }
    tabLetreco.appendChild(linhaDiv);
}

//-----------------------------------------------------------------------------------------


//funcoes eventos enter mistrar tecla e etc 
const eventteclas = (event) => {
    if (setLinha < 6 && setColuna < 5) {
        let getTeclas = document.getElementById(`l${setLinha}c${setColuna}`)
        getTeclas.textContent = event.target.textContent;
        setColuna++
        console.log(setColuna);
    }
}

const backspaceEvent = () => {
    if (setColuna > 0 && setLinha < 5) {
        setColuna--
        let backspace = document.getElementById(`l${setLinha}c${setColuna}`)
        backspace.textContent = ''
    }
}


const enterEvent = () => {

    if (setColuna > 4) {
        setColuna = 4
    }
    if (setLinha > 4) {
        setColuna = 4
    }
    // console.log('colunas' + setColuna)
    // console.log('linhas' + setLinha)

    for (let i = 0; i < 5; i++) { //verifica

        //iinplementar
      
    }


    let very = document.getElementById(`l${setLinha}c${setColuna}`)

    if (setLinha < 6 && very.textContent !== "") {

        let resultado = [];
        let letrasJaUsadas = {};

        for (let i = 0; i < 5; i++) { //verde

            let setColor = document.getElementById(`l${setLinha}c${i}`)

            if (setColor.textContent.toLowerCase() === palavraSorteada[i]) {

                console.log('verde ' + setColor.textContent)
                resultado.push({ letra: setColor.textContent, cor: "verde" });
                letrasJaUsadas[setColor.textContent] = (letrasJaUsadas[setColor.textContent] || 0) + 1;
                setColor.classList.remove('bg-zinc-400', 'text-zinc-600', 'bg-opacity-40')
                setColor.classList.add('bg-green-500', 'text-white', 'bg-opacity-60')

            } else {
                resultado.push({ letra: setColor.textContent, cor: "pendente" });
            }
        }

        for (let i = 0; i < 5; i++) { //amarelo e preto 

            let setColor = document.getElementById(`l${setLinha}c${i}`)

            if (resultado[i].cor === "pendente") {

                let letra = setColor.textContent.toLowerCase();
                let totalNaSorteada = contarLetras(palavraSorteada, letra);
                let usadasJa = letrasJaUsadas[letra] || 0;

                if (palavraSorteada.includes(letra) && usadasJa < totalNaSorteada) {

                    console.log('amarelo ' + setColor.textContent);
                    resultado[i].cor = "amarelo";
                    letrasJaUsadas[letra] = (letrasJaUsadas[letra] || 0) + 1;
                    setColor.classList.remove('bg-zinc-400', 'text-zinc-600', 'bg-opacity-40')
                    setColor.classList.add('bg-yellow-500', 'text-gray-200', 'bg-opacity-50')

                } else {

                    console.log('preto ' + setColor.textContent);
                    resultado[i].cor = "cinza";
                    setColor.classList.remove('bg-zinc-400', 'text-zinc-600', 'bg-opacity-40')
                    setColor.classList.add('bg-gray-600', 'text-white', 'bg-opacity-50')
                }
            }
        }

        setLinha++
        setColuna = 0

        //apenas efeitos -------------------------------------------------------------

        for (let i = 0; i < colunas; i++) {

            let setColor = document.getElementById(`l${setLinha - 1}c${i}`)
            setColor.classList.add('border-neutral-500')
            setColor.classList.remove('border-blue-500')
        }

        for (let i = 0; i < colunas; i++) {

            let setColor = document.getElementById(`l${setLinha}c${i}`)
            setColor.classList.remove('border-neutral-400')
            setColor.classList.add('border-blue-500')
        }

        //------------------------------------------------------------------------------
    }
}

function contarLetras(palavra, letra) {
    return palavra.split(letra).length - 1;
}




//funcao teclado e stylos -------------------------------------------------------------------------------------

for (let linha = 0; linha < keyboards.length; linha++) {

    let linhaDivTec = document.createElement('div');

    for (let coluna = 0; coluna < keyboards[linha].length; coluna++) {

        let blocosColunasTec = document.createElement('button');
        blocosColunasTec.classList.add('bg-blue-500', 'm-1',
            'h-14', 'text-white', 'shadow-sm', 'w-full', 'max-w-10', 'rounded-lg', 'hover:-translate-y-1');

        blocosColunasTec.textContent = keyboards[linha][coluna].toLocaleUpperCase()

        blocosColunasTec.id = `lt${linha}ct${coluna}`
        blocosColunasTec.addEventListener('click', eventteclas)

        tabTeclado.classList.add('translate-y-7', 'flex-col', 'px-3', 'flex', 'items-center', 'w-full')
        linhaDivTec.classList.add('flex', 'items-center', 'justify-center', 'w-full', 'max-w-[600px]')
        linhaDivTec.appendChild(blocosColunasTec);
        tabTeclado.appendChild(linhaDivTec);
    }
    if (linha == 1) {
        let buttonBackspace = document.createElement('button');
        buttonBackspace.textContent = '<-'
        buttonBackspace.classList.add('bg-blue-500', 'text-white', 'hover:-translate-y-1',
            'h-14', 'w-[10px]', 'min-w-14', 'mr-1', 'ml-1', 'rounded-lg', 'border', 'border-blue-500')
        buttonBackspace.addEventListener('click', backspaceEvent)
        linhaDivTec.appendChild(buttonBackspace);
    }
    if (linha == 2) {
        let buttonAdicionais = document.createElement('button');
        buttonAdicionais.textContent = 'ENTER'
        buttonAdicionais.addEventListener('click', enterEvent)
        linhaDivTec.classList.add('sm:translate-x-3')
        buttonAdicionais.classList.add('bg-blue-500', 'text-white', 'hover:-translate-y-1',
            'h-14', 'w-[70px]', 'min-w-20', 'mr-1', 'ml-1', 'rounded-lg', 'border', 'border-blue-500')
        linhaDivTec.appendChild(buttonAdicionais);
    }
    if (linha == 0) {
        linhaDivTec.classList.add('sm:-translate-x-10', 'sm:pl-8')
    }
}