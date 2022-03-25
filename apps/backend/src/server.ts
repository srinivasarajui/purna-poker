import fastify from 'fastify'
import fp from 'fastify-plugin';
import ws from 'fastify-websocket';

import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';

import { router } from "@trpc/server";
import { VotingSystemsRouter } from "./voting-system";
import { GameRouter } from './game';
import path from 'path';
export const appRouter = router()
    .merge('game.', GameRouter)
    .merge('votingSystems.', VotingSystemsRouter);
const environment = 'development';
const PORT = process.env.PORT || 8080;

export default function startServer() {
    const server = fastify({ logger: { prettyPrint: environment === 'development' } })
    const staticPath = path.join(__dirname, '..', 'web-site');
    console.log(staticPath.toString());
    server.register(require('fastify-static'), {
        root: path.join(__dirname, '..', 'web-site'),
        prefix: '/', // optional: default '/'
    })

    server.register(require('fastify-healthcheck'))
    server.register(ws);
    server.register(fp(fastifyTRPCPlugin), {
        prefix: '/trpc',
        useWSS: true,
        trpcOptions: { router: appRouter },
    });

    server.listen(PORT, '0.0.0.0', (err, address) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.log(`Server listening at ${address} in ${staticPath}`)
    });
}