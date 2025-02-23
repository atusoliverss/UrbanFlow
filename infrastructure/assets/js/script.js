import axios from 'https://cdn.skypack.dev/axios';

export async function findByLogin(userLogin) {
    try {
      console.log(JSON.stringify(userLogin));
      const response = await axios.post('http://localhost:8080/usuarios/login', userLogin);
  
      return response.data; // Retorna os dados do usuário autenticado
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      throw error; // Propaga o erro para ser tratado no script.js
    }
}
  
export async function saveUser(userData, url) {
  try {
    console.log(JSON.stringify(userData));
    const response = await axios.post(url, userData);
    return response.data; // Aqui esperamos um objeto no formato esperado
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    throw error;
  }
}

export async function saveReclamacao(reclamacaoData) {
  try {
    console.log("Enviando reclamação:", JSON.stringify(reclamacaoData));
    const response = await axios.post("http://localhost:8080/reclamacoes/save", reclamacaoData, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return response.data; // Retorna os dados da resposta do servidor
  } catch (error) {
    console.error("Erro ao salvar a reclamação:", error);
    throw error; // Propaga o erro para ser tratado no outro arquivo
  }
}



  
