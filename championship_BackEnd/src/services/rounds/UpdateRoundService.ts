import prismaClient from "../../prisma";

interface RoundRequest {
  roundNumber: number;
  homePlayer: string;
  scoreHome: number;
  scoreVisiting: number;
}

class UpdateRoundService {
  async execute({
    roundNumber,
    homePlayer,
    scoreHome,
    scoreVisiting,
  }: RoundRequest) {
    const game = await prismaClient.round.findMany({
      where: { roundNumber: roundNumber },
    });

    const filterPlayer = game.filter(function (jogo) {
      return (
        jogo.visitingPlayers === homePlayer || jogo.homePlayer === homePlayer
      );
    });

    const updatedGame = await prismaClient.round.update({
      where: { id: filterPlayer[0].id },
      data: {
        scoreHome,
        scoreVisiting,
      },
      select: {
        id: true,
        roundNumber: true,
        homePlayer: true,
        scoreHome: true,
        scoreVisiting: true,
        visitingPlayers: true,
        disabledInputs: true,
      },
    });

    return updatedGame;
  }
}

export { UpdateRoundService };
