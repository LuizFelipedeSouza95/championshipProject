import prismaClient from "../../prisma";

interface ClassificationRequest {
  namePlayer1: string;
  scorePlayer1: number;
  namePlayer2: string;
  scorePlayer2: number;
}

class UpdateClassificationService {
  async execute({
    namePlayer1,
    scorePlayer1,
    namePlayer2,
    scorePlayer2,
  }: ClassificationRequest) {
    let updatedTeam1, updatedTeam2;
    let defeated_1, defeated_2;

    const team1 = await prismaClient.classification.findFirst({
      where: { namePlayer: namePlayer1 },
    });
    const team2 = await prismaClient.classification.findFirst({
      where: { namePlayer: namePlayer2 },
    });

    if (team1) {
      // verificação para evitar erro quando team1 é nulo
      team1.GP += scorePlayer1;
      team1.GC += scorePlayer2;
      team1.SG = team1.GP - team1.GC;
      team1.J += 1;

      if (scorePlayer1 > scorePlayer2) {
        team1.P += 3;
        team1.V += 1;
        if (team2) {
          // verificação para evitar erro quando team2 é nulo
          team2.D += 1;
          defeated_2 = true;
        }
      } else if (scorePlayer1 < scorePlayer2) {
        if (team2) {
          // verificação para evitar erro quando team2 é nulo
          team2.P += 3;
          team2.V += 1;
        }
        team1.D += 1;
        defeated_1 = true;
      } else {
        team1.P += 1;
        if (team2) {
          // verificação para evitar erro quando team2 é nulo
          team2.P += 1;
          team2.E += 1;
        }
        team1.E += 1;
      }

      updatedTeam1 = await prismaClient.classification.update({
        where: { id: team1.id },
        data: {
          P: team1.P,
          V: team1.V,
          E: team1.E,
          J: team1.J,
          D: team1.D,
          GP: team1.GP,
          GC: team1.GC,
          SG: team1.SG,
        },
      });
    }

    // Atualiza os valores para o time 2
    if (team2) {
      // verificação para evitar erro quando team2 é nulo
      team2.GP += scorePlayer2;
      team2.GC += scorePlayer1;
      team2.SG = team2.GP - team2.GC;
      team2.J += 1;
      if (scorePlayer2 > scorePlayer1) {
        team2.P += 3;
        team2.V += 1;
        if (team1) {
          // verificação para evitar erro quando team1 é nulo
          if (defeated_1 === false) {
            team1.D += 1;
          }
        }
      } else if (scorePlayer2 < scorePlayer1) {
        if (team1) {
          // verificação para evitar erro quando team1 é nulo
          team1.P += 3;
          team1.V += 1;
        }
        if (defeated_2 === false) {
          team1.D += 1;
        }
      } else {
        if (team1) {
          // verificação para evitar erro quando team1 é nulo
          team1.P += 1;
          team1.E += 1;
        }
        team2.E += 1;
      }

      updatedTeam2 = await prismaClient.classification.update({
        where: { id: team2.id },
        data: {
          P: team2.P,
          V: team2.V,
          E: team2.E,
          J: team2.J,
          D: team2.D,
          GP: team2.GP,
          GC: team2.GC,
          SG: team2.SG,
        },
      });
    }

    const updated = {
      player1: updatedTeam1,
      player2: updatedTeam2,
    };

    return updated;
  }
}

export { UpdateClassificationService };
