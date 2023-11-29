import prismaClient from "../../prisma/index";
import teams from "../../teams.json";

class CreateTeamsService {
  async execute() {
    const teamObjects = teams.map((name) => ({ name: name }));

    const createdTeams = await prismaClient.team.createMany({
      data: teamObjects,
      skipDuplicates: true,
    });

    return createdTeams;
  }
}

export { CreateTeamsService };
