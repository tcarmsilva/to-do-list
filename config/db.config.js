const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://tcarmsilva:123Novasenha@mongotestes.uyh5f.mongodb.net/todosDb?retryWrites=true&w=majority';

// transformado em async await
// mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});


const connect = async () => {
    const connection = await mongoose.connect(MONGO_URL, {
        useNewUrlParser:true,
        useUnifiedTopology: true});
    console.log(`Database connected: ${connection.connections[0].name}`);
};

module.exports = connect

// connect(); 
// também poderia não exportar o connect e executar aqui