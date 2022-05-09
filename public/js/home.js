//bloco 1 - captura de elementos
const loginContainer = document.getElementById("login-container");
const appContainer = document.getElementById("app-container");
const formLogin = document.querySelector('#login-container > form');
const emailLogin = document.querySelector('#email');
const senhaLogin = document.querySelector('#senha');
const main = document.querySelector('main');
const modal = document.getElementById("modal");
const link = document.getElementById("linkAbrirModal");
const edits = document.querySelectorAll("section > a");
const search = document.getElementById('search');
const cancelButton = document.querySelector('#modal button.link');
const inputParaFocus = document.querySelector('#modal input[name="nome"]')

//bloco 2 - funções
const mostrarModal = () => {
    modal.style.display = "flex";
    modal.style.opacity = 1;
    inputParaFocus.focus()
};

const esconderModal = (e) => {
    e.bubbles = false;
    modal.style.display = "none"
    modal.style.opacity = 0;
};

const showContatos = contatos => {
    main.innerHTML = '';
    contatos.forEach(c => {
        const section = document.createElement('section');

        let htmlEmails = '';
        c.emails.forEach(e => {
            htmlEmails += `<a href="mailto:${e}">${e}</a>`;
        });

        let htmlTels = '';
        c.telefones.forEach(t => {
            htmlTels += `<li><a href="tel:${t}">${t}</a></li>`;
        });

        const html = `
            <h3>${c.nome}</h3>
            <div>
                ${htmlEmails}
            </div>
            <ul>
                ${htmlTels}
            </ul>
            <a href="#">Editar</a>
        `;

        section.innerHTML = html;

        main.appendChild(section);
    });
};

const buscaContatos = trecho => {
    const contatosFiltrados = contatos.filter(
        c => c.nome.toUpperCase().includes(trecho.toUpperCase())
    );

    showContatos(contatosFiltrados);
};

const carregaContatos =  async ()=> {

    //Carregando token do sessionStorage
    let token = sessionStorage.getItem('token');

    let resposta = await fetch(
        '/contatos' ,
        {
            method:"GET",
            headers: {
                authorization: `bearer ${token}`
            }
        }
    );
    let contatos = await resposta.json();
    showContatos(contatos)
    
}



const login = async dadosDeLogin =>{

    let response = await fetch(
        '/login',
        {
            method:"POST",
            body: JSON.stringify(dadosDeLogin),
            headers: {
                "content-type":"application/json"
            }
        }
    );
    
    //verificando se o login obteve sucesso

        if(response.status == 403){

            alert("Login inválido !")
            return;

        } else if (response.status == 200){

            //acessar o conteudo da response
            let dados = await response.json();

            //salvar o token
            sessionStorage.setItem('token', dados.token);

            //mostrar o app container e esconder o login
            appContainer.style.display = "block";
            loginContainer.style.display = "none";

            //carregar os contatos
            carregaContatos();

        }else {

                alert(`Erro inesperado ! Entre em contato com o suporte ! \n ${response.statusText}`);

        }
}

//bloco 3 -  events listener
search.addEventListener('keyup', (e) => buscaContatos(e.target.value));
link.addEventListener('click', mostrarModal);
cancelButton.addEventListener('click', esconderModal);
modal.addEventListener('keyup', e => e.key === 'Escape' ? esconderModal(e) : null);
formLogin.addEventListener(
    'submit',
    e => {
        // Interromper o comportamento padrão do evento;
        e.preventDefault();
        
        // Ler os dados de login
        let dadosDeLogin = {
            email: emailLogin.value,
            senha: senhaLogin.value
        }

        // Chamar uma função para fazer o login
        login(dadosDeLogin);

    }
);