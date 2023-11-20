//const clients = require('../models/client')

const router = require("express").Router()
const auth = require('../middlewares/auth.mid')
const serviceController = require('../controllers/serviceController')
const clientController = require("../controllers/clientController") 
//router.use(auth);

//ao inves de app.get é utilizando o router

router.get('/',clientController.listClients)
//GET BY ID
router.get('/:id', (req, res)=>{
    const id =  parseInt(req.params.id)
    const data = clients.find(item => item.id == id)
    res.send(data)
})
//GET CARS BY CLIENT NAMEs
router.get('/cars/:name',serviceController.getCarByClientName)
//create 
/*
router.post('/', (req, res)=>{
    const newData = req.body
    clients.push(newData)
    res.status(200).send(newData)
}) */

//POST
router.post('/',clientController.createClient )
//DELETE
router.delete('/:id',clientController.deleteClient)
//UPDATE
router.put('/:id',clientController.updateClient)

module.exports = router