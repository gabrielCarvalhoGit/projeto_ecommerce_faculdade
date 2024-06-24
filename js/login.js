let senhaVisivel = false;

const usuarioInput = document.getElementById('usuario');
const senhaInput = document.getElementById('senha');
const loginButton = document.getElementById('login-btn');

loginButton.addEventListener('click', (e) => {
    if (usuarioInput.value.trim() === '') {
        e.preventDefault();
        alert('Por favor, preencha o campo de usuário.');
    } else if (senhaInput.value.trim() === '') {
        alert('Por favor, preencha o campo de senha.');
        e.preventDefault();
    } else {
        window.location.href = './home.html';
    }
});

function alternarSenha() {
    const botaoSenha = document.getElementById('senha-btn');
  
    if (senhaVisivel) {
      senhaInput.type = 'password';
      botaoSenha.classList.remove('senha-visivel');
      senhaVisivel = false;
    } else {
      senhaInput.type = 'text';
      botaoSenha.classList.add('senha-visivel');
      senhaVisivel = true;
    }
};

const botaoSenha = document.getElementById('senha-btn');
botaoSenha.addEventListener('click', alternarSenha);