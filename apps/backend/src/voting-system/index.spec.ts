import { prismaMock } from "../prisma/singleton";
import { GetVotingSystemById, GetVotingSystems, roundupPoints } from ".";
import { sampleVotingSystems } from "./sample.data";

beforeEach(() => {
    prismaMock.votingSystem.findMany.mockResolvedValue(sampleVotingSystems)
});

test('should get voting systems by calling Backed only once', async () => {
    const result = await GetVotingSystems();
    expect(result.length).toEqual(4);
    const result2 = await GetVotingSystems();
    expect(result2.length).toEqual(4);
    expect(prismaMock.votingSystem.findMany).toBeCalledTimes(1);
});

test('should get GetVotingSystemById', async () => {
    const data = await GetVotingSystemById({ input: { votingSystemId: 'fib' } });
    expect(data.id).toEqual('fib');
    expect(data.name).toEqual('Fibonacci');
    expect(data.points.length).toEqual(11);
});

test('should get roundupPoints', async () => {
    const points = await roundupPoints('fib', 6);
    expect(points).toEqual(8);
});

