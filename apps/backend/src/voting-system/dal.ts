import prisma from "../prisma/client";

export function getVotingSystems() {
    return prisma.votingSystem.findMany();
}