import express, { Router } from "express";
import techRoute from "./technology.route.js";

const router: Router = express();

interface IRoute {
  path: string;
  route: Router;
}

const defaultRoute: IRoute[] = [
  {
    path: "/tech",
    route: techRoute,
  },
];

defaultRoute.forEach((route) => {
  router.use(route.path, route.route); // router.use("/auth", authRoute)
});

export default router;
