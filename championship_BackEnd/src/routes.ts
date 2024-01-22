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

import { CreateChampionshipController } from "./controllers/championship/CreateChampionshipController";
import { GetChampionshipController } from "./controllers/championship/getChampionshipController";
import { GetOneChampionshipController } from "./controllers/championship/getOneChampionshipController";

const router = Router();

//-- ROTAS USER --
router.post("/create-users", new CreateUsercontroller().handle);
router.post("/auth-session", new AuthUserController().handle);
router.get("/detail-me", isAuthenticated, new DetailUserController().handle);
router.get("/all-users", isAuthenticated, new GetAllUsersController().handle);
router.get("/one-user", isAuthenticated, new GetOneUsersController().handle);

//-- ROTAS ROUNDS --
router.post("/create-round", isAuthenticated, new CreateRoundController().handle);
router.get("/all-round", isAuthenticated, new GetAllRoundsController().handle);
router.put("/update-round", isAuthenticated, new UpdateRoundController().handle);

//-- ROTAS CLASSIFICATION --
router.post("/create-classification", new CreateClassificationController().handle);
router.get("/all-classification", new GetAllClassificationController().handle);
router.put("/update-classification", new UpdateClassificationController().handle);

//-- ROTAS TEAMS --
router.post("/create-teams", new CreateTeamController().handle);
router.get("/all-teams", new GetAllTeamsController().handle);
router.get("/one-team", new GetOneTeamsController().handle);

//-- ROTAS CHAMPIONSHIP --
router.post("/create-championship", new CreateChampionshipController().handle);
router.get("/all-championship", new GetChampionshipController().handle);
router.get("/one-championship", new GetOneChampionshipController().handle);

export { router };
