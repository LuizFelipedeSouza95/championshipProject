import prismaClient from "../../prisma";

class GetAllClassificationService {
  async execute() {
    const classification = await prismaClient.classification.findMany();
    return classification;
  }
}
export { GetAllClassificationService };
