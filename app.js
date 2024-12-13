let lista_de_numeros = [];
let limite_qtd_numeros = 10;
let numerosecreto = numeroAleatorio();
let tentativas = 1
function texto_Exibido(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}
function exibicaoInicial(){
texto_Exibido('h1', 'Número Secreto!');
texto_Exibido('p', 'Escolha um número entre 1 e 10');}
exibicaoInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if (chute == numerosecreto){
        texto_Exibido('h1', 'Acertou!');
        let palavraTentativa = tentativas >1 ? 'tentativas' : ' tentativa';
        let mensagemTentativa = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}`;
        texto_Exibido('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numerosecreto) {
            texto_Exibido('p', 'O número secreto é menor.');
        } else {
            texto_Exibido('p', 'O número secreto é maior.');
        }
        tentativas++;
        limparCampo();
    }
    

}

function numeroAleatorio(){
    let numero_Escolhido = parseInt(Math.random() * limite_qtd_numeros +1);
    let tamanho_Lista = lista_de_numeros.length;
    if (tamanho_Lista == limite_qtd_numeros){
        lista_de_numeros = [];
    }
    if (lista_de_numeros.includes(numero_Escolhido)) {
        return numeroAleatorio();
    } else {
        lista_de_numeros.push(numero_Escolhido);
        return numero_Escolhido;
    }
}
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo(){
    numerosecreto = numeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibicaoInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
