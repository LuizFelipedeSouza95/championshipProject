import prismaClient from "../../prisma/index";
import { createRoundByUsers } from "../../utils/generateRoudeds";
class CreateRoundService {
  async execute() {
    const Users = await prismaClient.user.findMany();

    const playersName: string[] = Users.map((obj) => obj.name);
    const roundeds = createRoundByUsers(playersName);
    const roundsData = [];

    for (const round in roundeds) {
      const jogos = roundeds[round];
      const numeroround = round.match(/\d+/)[0];

      for (let i = 0; i < jogos.length; i++) {
        const jogo = jogos[i];

        const gethomePlayerId = await prismaClient.user.findFirst({
          where: { name: jogo.casa },
        });
        const homePlayerId = gethomePlayerId?.id ?? null;

        const getvisitPlayerId = await prismaClient.user.findFirst({
          where: { name: jogo.fora },
        });
        const visitPlayerId = getvisitPlayerId?.id ?? null;

        const roundData = await prismaClient.round.create({
          data: {
            roundNumber: parseInt(numeroround),
            homePlayer: jogo.casa,
            homePlayer_id: homePlayerId,
            scoreHome: 0,
            scoreVisiting: 0,
            visitingPlayers: jogo.fora,
            visitingPlayers_id: visitPlayerId,
            disabledInputs: false,
          },
          select: {
            id: true,
            roundNumber: true,
            homePlayer: true,
            scoreHome: true,
            visitingPlayers: true,
            scoreVisiting: true,
            disabledInputs: true,
          },
        });

        roundsData.push(roundData);
      }
    }

    return roundsData;
  }
}

export { CreateRoundService };
