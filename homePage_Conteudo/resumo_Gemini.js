import { GoogleGenAI } from "@google/genai";

const resumo_Gemini = document.getElementById('resumo_Gemini');

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({apiKey: "AIzaSyCjNNvEhrM_zDEbUGtu-oD4_lopIFyJhCA"});

console.log(segurancaStatusURL);

if (segurancaStatusURL != -1) {
    let conteudoPrompt = valorSegurancaURL(segurancaStatusURL);



    function valorSegurancaURL(status) {
        switch(status) {
            case 0: return "A URL verificada é segura e não apresenta ameaças conhecidas.";
            case 1: return "Houve um erro na verificação da URL. Não foi possível determinar sua segurança.";
            case 2: return "A URL verificada não é segura e apresenta ameaças conhecidas.";
            default: return "O status de segurança da URL é desconhecido.";
        }
    }


    async function main() {
        conteudoPrompt = 0;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Explique o porquê da seguinte avaliação de segurança de URL em três frases: ${conteudoPrompt}`,
        });
        resumo_Gemini.textContent = response.text;
    }

    main();
}