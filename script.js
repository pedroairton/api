// Obtém a referência ao elemento onde os dados serão exibidos
const dataContainer = document.getElementById('data-api');

// Faz a requisição GET para a API
fetch('/api/recurso')
  .then(response => response.json())
  .then(data => {
    // Manipula os dados recebidos da API e os exibe na interface
    dataContainer.textContent = JSON.stringify(data);
  })
  .catch(error => {
    // Lida com erros na requisição
    console.error('Erro ao obter dados da API:', error);
  });
