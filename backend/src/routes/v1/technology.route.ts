import express, { Router } from "express";
import { techController } from "../../modules/technologies/index.js";

const router : Router = express()

router.route('/').get(techController.getAllTech)
router.route('/getcategory').get(techController.getAllCategory)
router.route('/addnew').post(techController.addTechStack)
router.route('/deletetech/:id').patch(techController.deleteTech)

export default router