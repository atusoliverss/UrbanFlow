import { saveUser } from '../../assets/js/script.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-custom');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    const tipoUsuario = document.querySelector('input[name="tipoUsuario"]:checked')?.value;
    const userData = {
      usuario: {
        nome: document.getElementById('InputName1').value + ' ' + document.getElementById('InputName2').value,
        email: document.getElementById('InputEmail1').value,
        telefone: document.getElementById('InputPhone').value,
        dataNascimento: document.getElementById('birthdate').value,
        tipo: tipoUsuario, // Morador ou Administrador
        senha: document.getElementById('InputPassword1').value
      }
      
    };

    // Dados específicos do morador
    if (tipoUsuario === 'Morador') {
      userData.cpf = document.getElementById('cpf').value;
      userData.endereco = {
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        cep: document.getElementById('cep').value,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value
      };
    }

    // Dados específicos do administrador
    if (tipoUsuario === 'Administrador') {
      // const adminKey = document.getElementById('adminKey').value;
      // if (adminKey != 1357) {  // Aqui você pode validar a chave do admin
      //   alert('Chave de acesso inválida!');
      //   return;
      // }
      userData.cnpj = document.getElementById('cnpj').value;
      userData.cargo = document.getElementById('cargo').value;
      userData.servico = document.getElementById('servicoPublico').value;
    }

    // Definir a URL de envio dependendo do tipo de usuário
    const url = tipoUsuario === 'Administrador' 
        ? 'http://localhost:8080/administradores/save' 
        : 'http://localhost:8080/moradores/save';

    try {
      const savedUser = await saveUser(userData, url);
      console.log('Usuário cadastrado com sucesso:', savedUser);

      // Exibe mensagem de sucesso
      alert('Cadastro realizado com sucesso!');

      // Redireciona para a página de login
      window.location.href = '../login/login.html';

    } catch (error) {
      alert('Erro ao cadastrar usuário. Tente novamente.');
    }
  });
});
