// Simulando os contatos em uma variável

let contatos = [
    {
        "id":1,
        "nome":"Kakashi Hatake",
        "emails":["kakashi@anbu.com"],
        "telefones":["99999-1111","98888-1234"]
    },
    {
        "id":2,
        "nome":"Sakura Haruno",
        "emails":["sakura@konoha.com"],
        "telefones":["99999-2222","98888-3333"]
    },
    {
        "id":3,
        "nome":"Hinata Hyuga",
        "emails":["Hinata@hyugas.com"],
        "telefones":["99999-3333","98888-4444"]
    },
    {
        "id":4,
        "nome":"Vovó Tsunade",
        "emails":["tsunade@hokages.com"],
        "telefones":["99999-4444","98888-5555"]
    },
    {
        "id":5,
        "nome":"Shikamaru Nara",
        "emails":["shikamaru@konoha.com"],
        "telefones":["99999-5555","98888-6666"]
    },
    {
        "id":6,
        "nome":"Ino",
        "emails":["ino@yamanakas.com"],
        "telefones":["99999-6666","98888-7777"]
    },
    {
        "id":7,
        "nome":"Choji Akimichi",
        "emails":["choji@akimichis.com"],
        "telefones":["99999-7777","98888-8888"]
    }
]

console.log(contatos)

//função que mostra todos os contatos
let showContatos = (contatos) => {
    
    // limpando o main
    let main = document.querySelector("main");
    main.innerHTML = "";

    //fazer um for percorrendo essse contatos
    contatos.forEach(
        c => {
            //criar um elemento section
            let section = document.createElement('section');

            //criar o codigo HTML dos emails
            let htmlDosEmails = "";
            c.emails.forEach(
                e=>{
                    htmlDosEmails += `<a href="mailto:${e}">${e}</a>`
                }
            )

            //creiar o codigo HTML dos telefones
            let htmlDosTelefones = "";
            c.telefones.forEach(
                t=>{
                    htmlDosTelefones += `<li><a href="tel:${t}">${t}</a></li>`
                }
            )

            //criar o código html que será conteúdo da section
            let html = `
                <h3>${c.nome}</h3>
                <div>
                    ${htmlDosEmails}
                </div>
                <ul>
                    ${htmlDosTelefones}
                </ul>
                <a href="#">Editar</a>
            `;

            //adicionar o código html ao elemento section
            section.innerHTML = html;

            //adicionar a section ao main
            main.appendChild(section);

        }
    );
}

let buscaContatos = (trecho)=>{

    //filtrar dos contatos somente os que possuem o trecho no nome
    let contatosFiltrados = contatos.filter(
        c => c.nome.includes(trecho)
    )

    //mostrar os contatos filtrados
        showContatos(contatosFiltrados);

}

showContatos(contatos);

search.addEventListener('keyup', (e) => buscaContatos(e.target.value));

//função para exibir o modal
let mostrarModal = () => {
    modal.style.display = "flex";
    modal.style.opacity = 1;
    inputParaFocus.focus()
};

//capturando o botão de adicionar contatos
let link = document.getElementById("linkAbrirModal");

//adicionando evento ao botão
link.addEventListener('click', mostrarModal)

//capturando o modal
const modal = document.getElementById("modal")

//capturando o botão de cancelar
const cancelButton = document.querySelector('#modal button.link');

//função para esconder o modal
let esconderModal = (evt) => {
     evt.bubbles = false;
     modal.style.display = "none"
     modal.style.opacity = 0;
};

//adicionar o evento e chamar a função esconder o modal
cancelButton.addEventListener('click', esconderModal);

//fechar o modal clicando fora dele
modal.addEventListener('click', esconderModal);

//capturar o input para focus
const inputParaFocus = document.querySelector('#modal input[name="nome"]')

//fechar o modal com o ESC do teclado
modal.addEventListener('keyup', e => {
    if (e.key === 'Escape'){
        esconderModal(e)
    }
})