import { createRouter, prisma } from "./common";

async function GetVotingSystems() {
    console.log('GetVotingSystems');
    const votingSystems = await prisma.votingSystem.findMany();
    return votingSystems;
}

export const VotingSystemsRouter = createRouter()
.query("list", {resolve: GetVotingSystems});