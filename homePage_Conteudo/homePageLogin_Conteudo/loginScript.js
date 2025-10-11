const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const recoverForm = document.getElementById('recover-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const showRecover = document.getElementById('show-recover');
const showLoginFromRecover = document.getElementById('show-login-from-recover');
const formTitle = document.getElementById('form-title');

const container = document.getElementById('loginContainerID')
const messageDiv = document.getElementById('message');





showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllForms();
    registerForm.classList.add('visible');
    container.style.top = '55px';
    formTitle.textContent = 'Cadastro';
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllForms();
    loginForm.classList.add('visible');
    formTitle.textContent = 'Login';
});

showRecover.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllForms();
    recoverForm.classList.add('visible');
    formTitle.textContent = 'Recuperar Senha';
});

showLoginFromRecover.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllForms();
    loginForm.classList.add('visible');
    formTitle.textContent = 'Login';
});

function hideAllForms() {
    loginForm.classList.remove('visible');
    loginForm.classList.add('hidden');
    registerForm.classList.remove('visible');
    registerForm.classList.add('hidden');
    recoverForm.classList.remove('visible');
    recoverForm.classList.add('hidden');
}


    


const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        // Validação básica do frontend
        if (form.id === 'register-form') {
            const password = document.getElementById('register-password');
            const passwordConfirm = document.getElementById('register-password-confirm');
            
            if (password.value !== passwordConfirm.value) {
                e.preventDefault();
                showMessage('As senhas não coincidem!', 'error');
                return;
            }
        }
        
        // Se a validação passar, o formulário será enviado para o PHP
    });
});

// Validação em tempo real (exemplo para e-mail)
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value && !isValidEmail(input.value)) {
            input.parentElement.classList.add('error');
            input.parentElement.querySelector('small').textContent = 'E-mail inválido';
        } else if (input.value) {
            input.parentElement.classList.remove('error');
            input.parentElement.classList.add('success');
        }
    });
});





const loginGerarPassword = document.getElementById('loginGerarPasswordID');
const password = document.getElementById('register-password');
const passwordConfirm = document.getElementById('register-password-confirm');

if (loginGerarPassword) {
    loginGerarPassword.addEventListener('click', () => {
        const passwordForte = gerarPasswordForte();
        password.value = passwordForte;
        passwordConfirm.value = passwordForte;
    })
}
function gerarPasswordForte() {
    const passwordTamanho = 10;
    
    const passwordUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLowerCase = "abcdefghijklmnopqrstuvwxyz";
    
    const passwordNumeros = "0123456789";
    const passwordCaracteres = passwordUpperCase + passwordLowerCase + passwordNumeros;


    let password = '';

    password += passwordUpperCase[Math.floor(Math.random() * passwordUpperCase.length)];
    password += passwordLowerCase[Math.floor(Math.random() * passwordLowerCase.length)];
    password += passwordNumeros[Math.floor(Math.random() * passwordNumeros.length)];

    for (let i = 2; i < passwordTamanho; i++) {
        password += passwordCaracteres[Math.floor(Math.random() * passwordCaracteres.length)];
    }

    return password.split('').sort(() => Math.random() - 0.5).join('');
}





const mostrarSenhaIcone = document.getElementById("mostrarSenhaIcone");
const mostrarSenhaRegistroIcone = document.getElementById("mostrarSenhaRegistroIcone");

const mostrarSenhaIcone_RegistroIcone = [mostrarSenhaIcone, mostrarSenhaRegistroIcone];

const senhaLogin = document.getElementById('login-password');
const register_password = document.getElementById("register-password");
const register_password_confirm = document.getElementById("register-password-confirm");

const senhaLogin_registerPasswords = [senhaLogin, register_password, register_password_confirm];

let mostrarSenhaIconeClick = 0;
for (let i = 0; i < mostrarSenhaIcone_RegistroIcone.length; i++) {

    mostrarSenhaIcone_RegistroIcone[i].addEventListener('click', function() {
        mostrarSenhaIconeClick++;

        for (let index = 0; index < senhaLogin_registerPasswords.length; index++) {
            if (mostrarSenhaIconeClick === 1) {
                senhaLogin_registerPasswords[index].type = "text";
                mostrarSenhaIcone_RegistroIcone[i].classList.remove('fa-eye');
                mostrarSenhaIcone_RegistroIcone[i].classList.add('fa-eye-slash');
                mostrarSenhaIcone_RegistroIcone[i].style.color = 'var(--primary)';
            }
            else if (mostrarSenhaIconeClick === 2){
                senhaLogin_registerPasswords[i].type = "password"; 
                mostrarSenhaIcone_RegistroIcone[i].classList.remove('fa-eye-slash')
                mostrarSenhaIcone_RegistroIcone[i].classList.add('fa-eye');
                mostrarSenhaIcone_RegistroIcone[i].style.color = '#b9b9b9';
                mostrarSenhaIconeClick = 0;
            }
        }
    })
    
}
// mostrarSenhaIcone.addEventListener('click', function() {
//     mostrarSenhaIconeClick++;

//     for (let index = 0; index < senhaLogin_registerPasswords.length; index++) {
//         console.log(senhaLogin_registerPasswords[i]);
//         if (mostrarSenhaIconeClick === 1) {
//             senhaLogin_registerPasswords[index].type = "text";
//             mostrarSenhaIcone.classList.remove('fa-eye');
//             mostrarSenhaIcone.classList.add('fa-eye-slash')
//         }
//         else {
//             senhaLogin_registerPasswords[i].type = "password"; 
//             mostrarSenhaIcone.classList.remove('fa-eye-slash')
//             mostrarSenhaIcone.classList.add('fa-eye');
//             mostrarSenhaIconeClick = 0;
//         }
//     }
// })





const registerFormNascimento = document.getElementById('registerFormNascimento');
const registerFormNascimentoValor = registerFormNascimento.value;

const registerFormNascimentoReset = document.getElementById('registerFormNascimentoReset');
registerFormNascimentoReset.addEventListener('click', () => {
    registerFormNascimento.value = "";
    registerFormNascimento.parentElement.classList.remove('error');
    registerFormNascimento.parentElement.classList.remove('success');
});


passwordConfirm.addEventListener('blur', () => {
    if (passwordConfirm.value !== password.value) {
        passwordConfirm.parentElement.classList.add('error');
        passwordConfirm.parentElement.querySelector('small').textContent = 'As senhas não coincidem';
    } else if (passwordConfirm.value) {
        passwordConfirm.parentElement.classList.remove('error');
        passwordConfirm.parentElement.classList.add('success');
    }
});

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = 'message ' + (type === 'success' ? 'success' : 'error-msg');
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Verificar se há parâmetros de mensagem na URL
const urlParams = new URLSearchParams(window.location.search);
const message = urlParams.get('message');
const messageType = urlParams.get('type');

if (message) {
    showMessage(decodeURIComponent(message), messageType || 'error');
}
// Adicione esta função ao loginScript.js
function validatePasswordResetForm() {
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');

    if (newPassword.value.length < 6) {
        showMessage('A senha deve ter pelo menos 6 caracteres', 'error');
        return false;
    }

    if (newPassword.value !== confirmPassword.value) {
        showMessage('As senhas não coincidem', 'error');
        return false;
    }

    return true;
}

// Adicione este evento se o formulário de redefinição existir na página
const resetForm = document.querySelector('form[action="reset_password.php"]');
if (resetForm) {
    resetForm.addEventListener('submit', function(e) {
        if (!validatePasswordResetForm()) {
            e.preventDefault();
        }
    });
}
