import { prismaMock } from "../prisma/singleton";
import { getVotingSystems } from "./dal";
import { sampleVotingSystems } from "./sample.data";

test('should get voting systems ', async () => {
    prismaMock.votingSystem.findMany.mockResolvedValue(sampleVotingSystems)
    const result = await getVotingSystems();
    expect(result.length).toEqual(4);
});