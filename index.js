const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// Rota de leitura (Read)
app.get('/api/recurso', (req, res) => {
  // Implemente a lógica para recuperar os recursos do banco de dados
  // e envie a resposta como JSON
  res.json({ message: 'Recursos recuperados com sucesso.' });
});

// Rota de criação (Create)
app.post('/api/recurso', (req, res) => {
  // Implemente a lógica para criar um novo recurso no banco de dados
  // com base nos dados enviados no corpo da solicitação (req.body)
  res.json({ message: 'Recurso criado com sucesso.' });
});

// Rota de atualização (Update)
app.put('/api/recurso/:id', (req, res) => {
  // Implemente a lógica para atualizar um recurso existente no banco de dados
  // com base no ID fornecido (req.params.id) e nos dados enviados no corpo da solicitação (req.body)
  res.json({ message: 'Recurso atualizado com sucesso.' });
});

// Rota de exclusão (Delete)
app.delete('/api/recurso/:id', (req, res) => {
  // Implemente a lógica para excluir um recurso existente do banco de dados
  // com base no ID fornecido (req.params.id)
  res.json({ message: 'Recurso excluído com sucesso.' });
});

const port = 3000; // ou a porta de sua preferência
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017'; // URL do seu banco de dados
const dbName = 'nomeDoBancoDeDados'; // Nome do seu banco de dados

MongoClient.connect(url, (err, client) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
  
    const db = client.db(dbName);
  
    // Adicione o middleware do cors aqui
    app.use(cors());

  // Defina as operações CRUD utilizando o banco de dados
  // Exemplo:

  // Rota de leitura (Read)
  app.get('/api/recurso', (req, res) => {
    db.collection('recurso').find().toArray((err, result) => {
      if (err) {
        console.error('Erro ao recuperar recursos:', err);
        res.status(500).json({ error: 'Erro ao recuperar recursos.' });
        return;
      }

      res.json(result);
    });
  });

  // Rota de criação (Create)
  app.post('/api/recurso', (req, res) => {
    const novoRecurso = req.body;

    db.collection('recurso').insertOne(novoRecurso, (err, result) => {
      if (err) {
        console.error('Erro ao criar recurso:', err);
        res.status(500).json({ error: 'Erro ao criar recurso.' });
        return;
      }

      res.json({ message: 'Recurso criado com sucesso.', resourceId: result.insertedId });
    });
  });

  // Rota de atualização (Update)
  app.put('/api/recurso/:id', (req, res) => {
    const recursoAtualizado = req.body;
    const resourceId = req.params.id;

    db.collection('recurso').updateOne(
      { _id: mongodb.ObjectId(resourceId) },
      { $set: recursoAtualizado },
      (err, result) => {
        if (err) {
          console.error('Erro ao atualizar recurso:', err);
          res.status(500).json({ error: 'Erro ao atualizar recurso.' });
          return;
        }

        res.json({ message: 'Recurso atualizado com sucesso.' });
      }
    );
  });

  // Rota de exclusão (Delete)
  app.delete('/api/recurso/:id', (req, res) => {
    const resourceId = req.params.id;

    db.collection('recurso').deleteOne(
      { _id: mongodb.ObjectId(resourceId) },
      (err, result) => {
        if (err) {
          console.error('Erro ao excluir recurso:', err);
          res.status(500).json({ error: 'Erro ao excluir recurso.' });
          return;
        }

        res.json({ message: 'Recurso excluído com sucesso.' });
      }
    );
  });
});

