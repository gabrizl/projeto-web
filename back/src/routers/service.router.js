const serviceController = require('../controllers/serviceController')

const router = require("express").Router()
const auth = require('../middlewares/auth.mid')
//router.use(auth);

//ao inves de app.get é utilizando o router
router.get('/',serviceController.listServices)
//GET BY ID
router.get('/:id', (req, res)=>{
    const id =  parseInt(req.params.id)
    const data = services.find(item => item.id == id)
    res.send(data)
})
//create
router.post('/',serviceController.createService)
//DELETE
router.delete('/:id',serviceController.deleteService)
//UPDATE
router.put('/:id',serviceController.updateService)
module.exports = router