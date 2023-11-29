import prismaClient from "../../prisma/index";

interface RoundRequest {
  team_id: string;
  namePlayer: string;
}

class CreateClassificationService {
  async execute({ team_id, namePlayer }: RoundRequest) {
    const getNameTeam = await prismaClient.team.findFirst({
      where: {
        id: team_id,
      },
    });

    const getNamePlayer = await prismaClient.user.findFirst({
      where: {
        name: namePlayer,
      },
    });

    if (!getNameTeam) {
      return "Team not exist";
    }

    if (!getNamePlayer) {
      return "Player not exist";
    }

    const classification = await prismaClient.classification.create({
      data: {
        team_id,
        team_name: getNameTeam.name,
        namePlayer,
        J: 0,
        P: 0,
        V: 0,
        E: 0,
        D: 0,
        GP: 0,
        GC: 0,
        SG: 0,
        player_id: getNamePlayer.id,
      },
    });

    return classification;
  }
}

export { CreateClassificationService };
