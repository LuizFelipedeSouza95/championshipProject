import prismaClient from "../../prisma";

class GetAllRoundsService {
  async execute() {
    const rounds = await prismaClient.round.findMany();
    return rounds;
  }
}

export { GetAllRoundsService };
