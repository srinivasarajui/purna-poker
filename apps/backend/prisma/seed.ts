import { PrismaClient, VotingSystem } from '@prisma/client'
const prisma = new PrismaClient()

const votingSystems: VotingSystem[] = [{
  id: 'fib',
  name: 'Fibonacci ',
  points: [
    { "category": "GREEN", "displayText": "0", "storyPoints": 0 },
    { "category": "GREEN", "displayText": "1", "storyPoints": 1 },
    { "category": "GREEN", "displayText": "2", "storyPoints": 2 },
    { "category": "GREEN", "displayText": "3", "storyPoints": 3},
    { "category": "GREEN", "displayText": "5", "storyPoints": 5 },
    { "category": "GREEN", "displayText": "8", "storyPoints": 8 },
    { "category": "RED", "displayText": "13", "storyPoints": 13 },
    { "category": "RED", "displayText": "21", "storyPoints": 21 },
    { "category": "RED", "displayText": "43", "storyPoints": 43 },
    { "category": "QUESTION", "displayText": "?", "storyPoints": -1 },
    { "category": "QUESTION", "displayText": "pass", "storyPoints": -2 }
  ]
}, {
  id: "mfib",
  name: "Modified Fibonacci",
  points: [
    { "category": "GREEN", "displayText": "0", "storyPoints": 0 },
    { "category": "GREEN", "displayText": "1", "storyPoints": 1 },
    { "category": "GREEN", "displayText": "2", "storyPoints": 2 },
    { "category": "GREEN", "displayText": "3", "storyPoints": 3 },
    { "category": "GREEN", "displayText": "5", "storyPoints": 5 },
    { "category": "GREEN", "displayText": "8", "storyPoints": 8 },
    { "category": "RED", "displayText": "13", "storyPoints": 13 },
    { "category": "RED", "displayText": "20", "storyPoints": 20 },
    { "category": "RED", "displayText": "40", "storyPoints": 40 },
    { "category": "RED", "displayText": "100", "storyPoints": 100 },
    { "category": "QUESTION", "displayText": "?", "storyPoints": -1 },
    { "category": "QUESTION", "displayText": "pass", "storyPoints": -2 }
  ]
},
  {
    id: "tshirt",
    name: "T Shirts Size",
    points: [
      { "category": "GREEN", "displayText": "xxs", "storyPoints": 1 },
      { "category": "GREEN", "displayText": "xs", "storyPoints": 2 },
      { "category": "GREEN", "displayText": "s", "storyPoints": 3 },
      { "category": "GREEN", "displayText": "m", "storyPoints": 5 },
      { "category": "RED", "displayText": "l", "storyPoints": 8 },
      { "category": "RED", "displayText": "xl", "storyPoints": 13 },
      { "category": "RED", "displayText": "xxl", "storyPoints": 20 },
      { "category": "QUESTION", "displayText": "?", "storyPoints": -1 },
      { "category": "QUESTION", "displayText": "pass", "storyPoints": -2 }
    ]
  },
  {
    id: "square",
    name: "Powers of 2",
    points: [
      { "category": "GREEN", "displayText": "0", "storyPoints": 0 },
      { "category": "GREEN", "displayText": "1", "storyPoints": 1 },
      { "category": "GREEN", "displayText": "2", "storyPoints": 2 },
      { "category": "GREEN", "displayText": "4", "storyPoints": 4 },
      { "category": "GREEN", "displayText": "8", "storyPoints": 8 },
      { "category": "RED", "displayText": "16", "storyPoints": 16},
      { "category": "RED", "displayText": "32", "storyPoints": 32 },
      { "category": "RED", "displayText": "64", "storyPoints": 64},
      { "category": "QUESTION", "displayText": "?", "storyPoints": -1 },
      { "category": "QUESTION", "displayText": "pass", "storyPoints": -2}
    ]
  }
];
async function AddOrUdate(){
  for (const vs of votingSystems) {
    await prisma.votingSystem.upsert({
      where: {
        id: vs.id,
      },
      update: {
        name:vs.name,
        points:vs.points

      },
      create: {
        ...vs
      },
    });
  }

}
async function main() {
  await AddOrUdate();
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })