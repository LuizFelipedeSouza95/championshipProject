//import prismaClient from "../../prisma";
import { Request, Response } from "express";
import { CreateRoundService } from "../../services/rounds/CreateRoundService";

export class CreateRoundController {
  async handle(req: Request, res: Response) {
    const createRoundService = new CreateRoundService();
    await createRoundService.execute();

    if (!createRoundService) {
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(201).json("Rounds Created");
  }
}
