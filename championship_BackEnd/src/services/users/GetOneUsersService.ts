import prismaClient from "../../prisma";

interface UserRequest {
  email: string;
}

class GetOneUsersService {
  async execute({ email }: UserRequest) {
    const users = await prismaClient.user.findFirst({
      where: {
        email,
      },
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
export { GetOneUsersService };
