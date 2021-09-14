const express = require('express');
const connectDb = require('./config/db.config'); // pra puxar a função connect

const Todo = require('./models/Todo');

const PORT = 5000;

connectDb(); 
// conect to DataBase

const app = express();

app.use(express.json());
// Utilizar o json no body das requisições

app.post('/todos', async (req, res) => {
    if (!req.body.title) {
      return res.status(400).json({ msg: 'missing title field' });
    }
    try {
      // criar um novo todo no banco de dados
      const newTodo = await Todo.create(req.body);
      // retornar json do todo criado
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ msg: 'ServerError', error });
    }
});

app.get('/todos', async (req, res) => {
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ msg: 'ServerError', error });
    }
});

app.get('/todo/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const todo = await Todo.findById(id);
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ msg: 'Error on find todo', error });
    } 
});

app.put('/todo/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
      const updatedTodo = await Todo.findOneAndUpdate({ _id: id }, payload, { new: true });
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(500).json({ msg: 'Error while updating todo', error });
    }
});
  
  app.delete('/todo/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await Todo.findByIdAndDelete(id);
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ msg: 'Error while deleting todo', error });
    }
});



app.listen(PORT, () => console.log(`Server listen on Port ${PORT}`));
