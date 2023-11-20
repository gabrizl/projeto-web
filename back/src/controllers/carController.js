const car = require('../models/car'); // Importe o modelo de carro

// Controlador para criar um novo carro
const createCar = async (req, res) => {
  try {
    const carData = req.body; // Dados do carro a ser criado
    const newCar = await car.create(carData);
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o carro' });
  }
};

// Controlador para listar todos os carros
const listCars = async (req, res) => {
  try {
    const cars = await car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os carros' });
  }
};

// Controlador para atualizar os dados de um carro por ID
const updateCar = async (req, res) => {
  try {
    const carId = req.params.id; // ID do carro a ser atualizado
    const carData = req.body; // Novos dados do carro
    const updatedCar = await car.findByIdAndUpdate(carId, carData, { new: true });
    if (!updatedCar) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }
    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o carro' });
  }
};

// Controlador para excluir um carro por ID
const deleteCar = async (req, res) => {
  try {
    const carId = req.params.id; // ID do carro a ser excluído
    const deletedCar = await car.findOne({_id:carId});
    if (!deletedCar) {
      return res.status(404).json({ error: 'Carro não encontrado' });
    }
    await client.deleteOne({_id:clientId})
    res.status(200).json(deletedCar);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o carro' });
  }
};

module.exports = {
  createCar,
  listCars,
  updateCar,
  deleteCar,
};
