let elementoTitulo = document.querySelector('.titulo');

//exibendo o elemento no console
console.log(elementoTitulo);

//alterar o conteúdo do elementoTitulo
elementoTitulo.textContent = "Agora, ta tudo dominado!";

//alterar o estilo dele
elementoTitulo.style.color = "#F00";

//acresentar uma classe ao elementoTitulo
elementoTitulo.classList.add("importante");

//remover uma classe
elementoTitulo.classList.remove("titulo");

//Liga e desliga uma classe
elementoTitulo.classList.toggle("importante");

// Criar um elemento main
let elementoMain = document.createElement("main");

//adicionando o elemento ao body
document.body.appendChild(elementoMain);

//removendo o elemento do body depois de 3 segundos
setTimeout(
    () => {document.body.removeChild(elementoMain)},
    3000
)

//removendo o elemento titulo depois de 5 segundos
setTimeout(
    () => {elementoTitulo.remove()},
    5000
)

//capturar todos os elementos td
let arraydeTds = document.querySelectorAll("td");
arraydeTds.forEach(
    td =>{
         td.style.border = "1px black solid";
         td.style.padding = "5px";
         td.style.backgroundColor = "#EEE";
    }
)

//capturando um elemento pelo ID
let elementoLista = document.getElementById("listaDeLetras");
//    * equivale ao document.querySelector("#listaDeLetras")

let camposSenha = document.getElementsByName("senha")[0];
camposSenha.value = "123456";

//fazer com que a opção portugal seja selecionada aqui pelo JS
