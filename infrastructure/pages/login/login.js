import { findByLogin} from '../../assets/js/script.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Impede o recarregamento da página
      const userLogin = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
      };
      
  
      try {
        const userData = await findByLogin(userLogin);
        console.log('Usuário autenticado:', userData);
        
        // Armazena os dados no localStorage (se necessário)
        localStorage.setItem('user', JSON.stringify(userData));
  
        // Redireciona para outra página após o login bem-sucedido
        if(userData.tipo === 'Administrador') {
          window.location.href = '../home/adm/home-adm.html';
        } else {
          window.location.href = '../home/resident/home.html';
        }
      } catch (error) {
        errorMessage.textContent = 'Email ou senha incorretos!';
      }
    });
  });