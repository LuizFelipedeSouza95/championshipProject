import prismaClient from "../../prisma";

class GetAllUsersService {
  async execute() {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        teamName: true,
        classifications: true,
        roundsHome: true,
        roundVisiting: true,
      },
    });
    return users;
  }
}
export { GetAllUsersService };
