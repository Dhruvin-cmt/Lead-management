import express, { Router } from "express";
import techRoutes from "./technology.route.js";
import devRoutes from './developer.route.js'

const router: Router = express();

interface IRoute {
  path: string;
  route: Router;
}

const defaultRoute: IRoute[] = [
  {
    path: "/tech",
    route: techRoutes,
  },
  {
    path: '/dev',
    route: devRoutes
  }
];

defaultRoute.forEach((route) => {
  router.use(route.path, route.route); // router.use("/auth", authRoute)
});

export default router;
