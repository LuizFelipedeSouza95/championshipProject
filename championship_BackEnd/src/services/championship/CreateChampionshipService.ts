import prismaClient from "../../prisma/index";

interface RoundRequest {
  name: string;
  maxPlayers: number;
  players: string[];
}

export class CreateChampionshipService {
  async execute({ name, maxPlayers, players }: RoundRequest) {
    const championship = await prismaClient.championship.create({
      data: {
        name,
        maxPlayers,
        players,
      },
    });

    return championship;
  }
}
