import { saveReclamacao } from "../../../assets/js/script.js";

document.addEventListener("DOMContentLoaded", () => {
    const formSolicitacao = document.getElementById("form-solicitacao");

    // Capturar envio do formulário
    formSolicitacao.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita recarregar a página

        const tipoSolicitacao = document.getElementById("tipoSolicitacao").value;

        if (tipoSolicitacao === "reclamacao") {
            const descricao = document.getElementById("descricao").value;
            const categoria = document.getElementById("categoria-select").querySelector("select").value;
            const dataReclamacao = new Date().toISOString();
        
            // Recuperar o morador logado do localStorage
            const userData = JSON.parse(localStorage.getItem("user"));
            console.log(JSON.stringify(userData));
            const morador = userData && userData.email ? userData.email : null; 
        
            if (!morador) {
                alert("Erro: Usuário não identificado. Faça login novamente.");
                return;
            }
        
            // Criar objeto JSON para enviar
            const reclamacaoData = {
                descricao: descricao,
                dataReclamacao: dataReclamacao,
                status: "ANALISE",
                morador: morador,
                servico: categoria
            };
        
            try {
                await saveReclamacao(reclamacaoData);
                alert("Reclamação enviada com sucesso!");
                formSolicitacao.reset();
            } catch (error) {
                alert("Erro ao enviar reclamação. Verifique a conexão com o servidor.");
            }
        }
        
    });
});
