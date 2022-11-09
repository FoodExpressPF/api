const { Router } = require("express");
const routerGFood = require("./routeGetFoods");
const routerPFood = require("./routePostFoods");
const filterPrice = require("./filterByPrice");
const filterRating = require("./filterByRating");
const filterType = require("./filterByType");
const filterOffer = require("./filterByOffer");
const routerAZ = require("./filter A-Z");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/foods", routerGFood);
router.use("/createFood", routerPFood);
router.use("/filterPrice", filterPrice); //http://localhost:3001/filterPrice?order=
router.use("/filterRating", filterRating); //http://localhost:3001/filterRating?order=----------------
router.use("/filterType", filterType); //http://localhost:3001/filterType?order=
router.use("/filterOffer", filterOffer); //http://localhost:3001/filterOffer?order=
router.use("/AZ", routerAZ); //http://localhost:3001/AZ?order=Z-A
module.exports = router;
