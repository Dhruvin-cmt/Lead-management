import express, { Router } from "express";
import { techController } from "../../modules/technologies/index.js";

const router : Router = express()

router.route('/addnew').post(techController.addTechStack)
router.route('/getall').get(techController.getAllTech)
router.route('/deletetech/:id').patch(techController.deleteTech)

export default router