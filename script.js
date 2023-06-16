// Obtém a referência ao elemento onde os dados serão exibidos
const dataContainer = document.getElementById('data-api');

// Faz a requisição GET para a API
fetch('http://localhost:3000/user')
  .then(response => response.json())
  .then(data => {
    // Manipula os dados recebidos da API e os exibe na interface
    dataContainer.textContent = JSON.stringify('CONECTOU-SE COM SUCESSO AO SERVIDOR!', data);
    console.log('Estabeleceu uma rota de GET com sucesso.')

  })
  .catch(error => {
    // Lida com erros na requisição
    console.error('Erro ao obter dados da API:', error);
  });
