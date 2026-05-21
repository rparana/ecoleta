import { Router } from "express";
import { PrismaItemsRepository } from "../database/PrismaItemsRepository";
import { PrismaPointsRepository } from "../database/PrismaPointsRepository";
import { ListItemsUseCase } from "../../use-cases/list-items/ListItemsUseCase";
import { FilterPointsUseCase } from "../../use-cases/list-points/FilterPointsUseCase";
import { CreatePointUseCase } from "../../use-cases/create-point/CreatePointUseCase";
import { GetPointDetailsUseCase } from "../../use-cases/get-point/GetPointDetailsUseCase";
import { ItemsController } from "./controllers/ItemsController";
import { PointsController } from "./controllers/PointsController";

const routes = Router();

// Repositories
const itemsRepository = new PrismaItemsRepository();
const pointsRepository = new PrismaPointsRepository();

// Use Cases
const listItemsUseCase = new ListItemsUseCase(itemsRepository);
const filterPointsUseCase = new FilterPointsUseCase(pointsRepository);
const createPointUseCase = new CreatePointUseCase(pointsRepository);
const getPointDetailsUseCase = new GetPointDetailsUseCase(pointsRepository);

// Controllers
const itemsController = new ItemsController(listItemsUseCase);
const pointsController = new PointsController(
  filterPointsUseCase,
  createPointUseCase,
  getPointDetailsUseCase,
);

// Routes
routes.get("/items", (req, res) => itemsController.index(req, res));
routes.get("/points", (req, res) => pointsController.index(req, res));
routes.post("/points", (req, res) => pointsController.create(req, res));
routes.get("/points/:id", (req, res) => pointsController.show(req, res));

export default routes;
