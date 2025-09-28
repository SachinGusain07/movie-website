import express from "express";
import movieRoutes from "./movieRoutes.js";


const allRoute = express.Router();


allRoute.use("/movies" , movieRoutes )


export default allRoute;




