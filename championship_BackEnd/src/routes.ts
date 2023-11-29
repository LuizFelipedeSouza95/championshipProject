import { Router } from "express";
import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateUsercontroller } from "./controllers/users/CreateUserController";
import { AuthUserController } from "./controllers/users/AuthUserController";
import { DetailUserController } from "./controllers/users/DetailUserController";
import { GetAllUsersController } from "./controllers/users/GetAllUsersController";
import { GetOneUsersController } from "./controllers/users/GetOneUsersController";

import { CreateRoundController } from "./controllers/rounds/CreateRoundController";
import { GetAllRoundsController } from "./controllers/rounds/GetAllRoundsController";
import { UpdateRoundController } from "./controllers/rounds/UpdateRoundController";

import { CreateClassificationController } from "./controllers/classifications/CreateClassificationController";
import { GetAllClassificationController } from "./controllers/classifications/GetAllClassificationController";
import { UpdateClassificationController } from "./controllers/classifications/UpdateClassificationController";

import { CreateTeamController } from "./controllers/teams/CreateTeamController";
import { GetAllTeamsController } from "./controllers/teams/GetAllTeamsController";
import { GetOneTeamsController } from "./controllers/teams/GetOneTeamsController";

const router = Router();

//-- ROTAS USER --
router.post("/users", new CreateUsercontroller().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.get("/users", isAuthenticated, new GetAllUsersController().handle);
router.get("/user", isAuthenticated, new GetOneUsersController().handle);

//-- ROTAS ROUNDS --
router.post("/round", isAuthenticated, new CreateRoundController().handle);
router.get("/round", isAuthenticated, new GetAllRoundsController().handle);
router.put("/round", isAuthenticated, new UpdateRoundController().handle);

//-- ROTAS CLASSIFICATION --
router.post("/classification", new CreateClassificationController().handle);
router.get("/classification", new GetAllClassificationController().handle);
router.put("/classification", new UpdateClassificationController().handle);

//-- ROTAS TEAMS --
router.post("/teams", new CreateTeamController().handle);
router.get("/teams", new GetAllTeamsController().handle);
router.get("/team", new GetOneTeamsController().handle);

export { router };
