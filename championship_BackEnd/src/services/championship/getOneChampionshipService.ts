import prismaClient from "../../prisma";

interface championshipProps {
  id: string;
}

export class GetOneChampionshipService {
  async execute({ id }: championshipProps) {
    const championship = await prismaClient.championship.findMany({
      where: {
        id
      },
    });
    return championship;
  }
}
