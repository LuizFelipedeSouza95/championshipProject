import prismaClient from "../../prisma";

class GetAllTeamsService {
  async execute() {
    const teams = await prismaClient.team.findMany();
    return teams;
  }
}
export { GetAllTeamsService };
