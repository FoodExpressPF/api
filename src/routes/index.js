const { Router } = require("express");
const routerGFood = require("./routeGetFoods");
const routerPFood = require("./routePostFoods");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/foods", routerGFood);
router.use("/createFood", routerPFood);
module.exports = router;
