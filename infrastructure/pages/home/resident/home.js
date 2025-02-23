import { saveReclamacao} from '../../../assets/js/script';
document.addEventListener("DOMContentLoaded", () => {
    const tipoSolicitacao = document.getElementById("tipoSolicitacao");
    const reclamacaoCategorias = document.getElementById("reclamacao-categorias");
    const avaliacaoCategorias = document.getElementById("avaliacao-categorias");
    const anexoEvidencias = document.getElementById("anexo-evidencias");
    const formSolicitacao = document.getElementById("form-solicitacao");

    // Alternar visibilidade com base no tipo de solicitação
    tipoSolicitacao.addEventListener("change", () => {
        if (tipoSolicitacao.value === "reclamacao") {
            reclamacaoCategorias.classList.remove("d-none");
            avaliacaoCategorias.classList.add("d-none");
            anexoEvidencias.classList.remove("d-none");
        } else if (tipoSolicitacao.value === "avaliacao") {
            avaliacaoCategorias.classList.remove("d-none");
            reclamacaoCategorias.classList.add("d-none");
            anexoEvidencias.classList.add("d-none");
        }
    });

    // Capturar envio do formulário
    formSolicitacao.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita recarregar a página

        if (tipoSolicitacao.value === "reclamacao") {
            const descricao = document.getElementById("descricao").value;
            const categoria = reclamacaoCategorias.querySelector("select").value;
            const morador = "12345678901"; // Substitua pelo CPF dinâmico do morador logado
            const dataReclamacao = new Date().toISOString();

            // Criar objeto JSON para enviar
            const reclamacaoSave = {
                descricao: descricao,
                dataReclamacao: dataReclamacao,
                status: "REGISTRADA",
                morador: morador,
                servico: categoria
            };

            try {
                const reclamacaoData = await saveReclamacao(reclamacaoSave);
                console.log('Reclamacao autenticada:', reclamacaoData);
                alert('Reclamação enviada com sucesso!');
            } catch (error) {
                console.error("Erro na requisição:", error);
                alert("Erro ao salvar a reclamação.");
            }
        }
    });
});
