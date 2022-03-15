import { VotingSystem } from "@prisma/client";
import { createRouter, prisma } from "./common";
import { z } from "zod";
interface VotingSystemMap {
    [key: string]: VotingSystem
}
let votingSystemsCache: VotingSystem[];
let votingSystemsMap: VotingSystemMap;

async function GetVotingSystems() {

    if (!votingSystemsCache) {
        votingSystemsCache = await prisma.votingSystem.findMany();
    }
    return votingSystemsCache;
}

async function GetVotingSystem(id: string) {
    if (!votingSystemsMap) {
        votingSystemsMap = (await GetVotingSystems()).reduce((map, obj) => { map[obj.id] = obj; return map }, {} as VotingSystemMap)
    }
    return votingSystemsMap[id];
}

export async function roundupPoints(votingSystemId: string, avg: number) {
    const vs = await GetVotingSystem(votingSystemId);
    return vs.points.filter(v => v.storyPoints >= 0).filter(v => v.storyPoints >= avg)[0].storyPoints
}

const GetVotingSystemByIdInput = z.object({
    votingSystemId: z.string()
})
async function GetVotingSystemById({ input }: { input: z.infer<typeof GetVotingSystemByIdInput> }) {
    return GetVotingSystem(input.votingSystemId)
}

export const VotingSystemsRouter = createRouter()
    .query("list", { resolve: GetVotingSystems })
    .query("getbyId", { input: GetVotingSystemByIdInput, resolve: GetVotingSystemById });