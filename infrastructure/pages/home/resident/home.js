import { saveReclamacao } from "../../../assets/js/script.js";

document.addEventListener("DOMContentLoaded", () => {
    const formSolicitacao = document.getElementById("form-solicitacao");

    // Capturar envio do formulário
    formSolicitacao.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita recarregar a página

        const tipoSolicitacao = document.getElementById("tipoSolicitacao").value;

        if (tipoSolicitacao === "reclamacao") {
            const descricao = document.getElementById("descricao").value;
            const categoria = document.getElementById("reclamacao-categorias").querySelector("select").value;
            const morador = "12345678901"; // Substituir pelo CPF dinâmico do morador logado
            const dataReclamacao = new Date().toISOString();

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
