document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    let nome = document.getElementById('nome').value.trim();
    let email = document.getElementById('email').value.trim();
    let telefone = document.getElementById('telefone').value.trim();
    let mensagemFormulario = document.querySelector('.mensagemFormulario');

    mensagemFormulario.innerHTML = '';
    mensagemFormulario.style.display = 'none';

    if (nome.length < 3) {
        mostrarMensagem('Nome deve ser maior de 3 caracteres.', 'red');
        return;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarMensagem('Por favor, insira um e-mail válido.', 'red');
        return;
    }

    let telefoneRegex = /^\d{11,}$/;
    if (!telefoneRegex.test(telefone)) {
        mostrarMensagem('O telefone deve ter mais de 11 números.', 'red');
        return;
    }

    this.action = 'php/enviar.php';
    this.submit();
});

function mostrarMensagem(mensagem, cor) {
    let mensagemFormulario = document.querySelector('.mensagemFormulario');
    mensagemFormulario.innerHTML = `<i class="fa-regular fa-circle-info"></i> ${mensagem}`;
    mensagemFormulario.style.display = 'flex';
    mensagemFormulario.style.color = cor;
    mensagemFormulario.style.background = cor === 'green' ? 'rgb(206, 255, 206)' : 'rgb(255, 206, 206)';
    
    let tempo = cor === 'green' ? 5000 : 7000;
    setTimeout(() => {
        mensagemFormulario.style.display = 'none';
    }, tempo);               
}

window.addEventListener('load', function() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('formulario')) {
        let status = urlParams.get('formulario');
        if (status === 'success') {
            mostrarMensagem('Mensagem enviada com sucesso!', 'green');
            setTimeout(() => {
                window.location.href = './';
            }, 10000);
        } else if (status === 'error') {
            mostrarMensagem('Erro ao enviar a mensagem. Tente novamente.', 'red');
            setTimeout(() => {
                window.location.href = './';
            }, 10000);
        }
    }
});