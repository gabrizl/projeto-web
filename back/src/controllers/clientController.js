const client = require('../models/client'); // Importe o modelo de cliente

// Controlador para criar um novo cliente
const createClient = async (req, res) => {
  try {
    const clientData = req.body; // Dados do cliente a ser criado
    const newClient = await client.create(clientData);
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o cliente' });
  }
};

// Controlador para listar todos os clientes
const listClients = async (req, res) => {
  try {
    const clients = await client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os clientes' });
  }
};

// Controlador para atualizar os dados de um cliente por ID
const updateClient = async (req, res) => {
  try {
    const clientId = req.params.id; // ID do cliente a ser atualizado
    const clientData = req.body; // Novos dados do cliente
    const updatedClient = await client.updateOne({id:clientId}, clientData);
    if (!updatedClient) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o cliente' });
  }
};

// Controlador para excluir um cliente por ID
const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id; // ID do cliente a ser excluído
    const deletedClient = await client.findOne({id:clientId});
    if (!deletedClient) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    await client.deleteOne({id:clientId})
    res.status(200).json(deletedClient);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o cliente' });
  }
};

module.exports = {
  createClient,
  listClients,
  updateClient,
  deleteClient,
};
