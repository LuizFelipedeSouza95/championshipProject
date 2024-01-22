import prismaClient from "../../prisma/index";

export class GetChampionshipService {
  async execute() {
    const championship = await prismaClient.championship.findMany();
    return championship;
  }
}
