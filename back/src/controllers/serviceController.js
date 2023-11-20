const service = require('../models/service');
const client = require('../models/client'); // Importe o modelo de serviço

// Controlador para criar um novo serviço
const createService = async (req, res) => {
  try {
    const serviceData = req.body; // Dados do serviço a ser criado
    console.log(serviceData);
    const newService = await service.create(serviceData);
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o serviço' });
  }
};

// Controlador para listar todos os serviços
const listServices = async (req, res) => {
  try {
    const services = await service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os serviços' });
  }
};

// Controlador para atualizar os dados de um serviço por ID
const updateService = async (req, res) => {
  try {
    const serviceId = req.params.id; // ID do serviço a ser atualizado
    const serviceData = req.body; // Novos dados do serviço
    const updatedService = await service.updateOne({id:serviceId}, serviceData);
    if (!updatedService) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o serviço' });
  }
};

// Controlador para excluir um serviço por ID
const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id; // ID do serviço a ser excluído
    const deletedService = await service.findOne({id:serviceId});
    if (!deletedService) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }
    await service.deleteOne({id:serviceId})
    res.status(200).json(deletedService);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o serviço' });
  }
};

const getCarByClientName = async (req, res) => {
  const name = req.params.name;

  try {
      const data = await client.find({ name: name });
      console.log(data)
      console.log(name);
      const cars = data.map(client => client.car);
      res.status(200).json(cars);
  } catch (error) {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
  }
};


module.exports = {
  createService,
  listServices,
  updateService,
  deleteService,
  getCarByClientName,
};
