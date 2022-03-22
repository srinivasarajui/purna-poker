import type { VotingSystem } from "@prisma/client";
import { router } from "@trpc/server";
import { z } from "zod";
import { getVotingSystems } from "./dal";

interface VotingSystemMap {
    [key: string]: VotingSystem
}
let votingSystemsCache: VotingSystem[];
let votingSystemsMap: VotingSystemMap;

export async function GetVotingSystems() {
    if (!votingSystemsCache) {
        votingSystemsCache = await getVotingSystems();
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
export async function GetVotingSystemById({ input }: { input: z.infer<typeof GetVotingSystemByIdInput> }) {
    return GetVotingSystem(input.votingSystemId)
}

export const VotingSystemsRouter = router()
    .query("list", { resolve: GetVotingSystems })
    .query("getbyId", { input: GetVotingSystemByIdInput, resolve: GetVotingSystemById });
