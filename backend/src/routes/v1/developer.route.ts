import express, { Router } from "express";
import { devController, devMiddleware } from "../../modules/developer/index.js";

const router: Router = Router();

router.route("/new").post(devController.addDeveloper);
router
  .route("/")
  .get(devMiddleware.syncDeveloperStatusService, devController.getDevelopers);
router
  .route("/delete/:id")
  .patch(devMiddleware.syncDeveloperStatusService, devController.removeDev);
router
  .route("/edit/:id")
  .patch(devMiddleware.syncDeveloperStatusService, devController.updateDev);

export default router;
