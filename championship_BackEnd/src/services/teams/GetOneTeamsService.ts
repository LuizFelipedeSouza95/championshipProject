import prismaClient from "../../prisma";

interface TeamProps {
  teamName: string;
}
class GetOneTeamsService {
  async execute({ teamName }: TeamProps) {
    let team = teamName
      .toLowerCase()
      .replace(/\b(\w)/g, (match) => match.toUpperCase());

    const teams = await prismaClient.team.findMany({
      where: {
        name: team,
      },
    });

    return teams;
  }
}
export { GetOneTeamsService };
