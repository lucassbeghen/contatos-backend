//capturando o elemento h1.titulo
let elementoTitulo = document.querySelector('.titulo');

//exibindo o elemento no console
console.log(elementoTitulo);

//Alterar o conteudo do elemntoTitulo
elementoTitulo.textContent = "Agora, ta tudo dominado !"

//alterar o estilo
elementoTitulo.style.color = "#f00";

// acrescentando uma classe ao elementoTitulo
elementoTitulo.classList.add("importante");

// remover uma classe
elementoTitulo.classList.remove("titulo")

//liga/desliga uma classe
elementoTitulo.classList.toggle("importante")

//criar um elemento main
let elementoMain = document.createElement("main");

//adicionando o elemento ao body
document.body.appendChild(elementoMain);

//removendo o elemento do body após 3000 milisegundos
setTimeout(
    () => {document.body.removeChild(elementoMain)},
    3000
)
//removendo o elemento título depois de 5 segundos
setTimeout(
    ()=>{elementoTitulo.remove()},
    5000
)

//capturar todos os elementos td
let arrayDeTds = document.querySelector("td");
//console.log(arrayDeTds);
arrayDeTds.array.forEach(
    td => {
         td.style.border = "1px black solid"
         td.style.padding = "5px"
         td.style.backgroundColor = "#EEE"
    }
);

//capturando um elemento pelo ID
let elementoLista = document.getElementById("listaDeLetras");
//    equivale a : document.querySelector("#listaDeLetras");

let campoSenha = document.getElementsByName("senha")[0];
campoSenha.value = "123456";

//fazer com que a opção portugal seja selecionada aqui pelo javascript !
