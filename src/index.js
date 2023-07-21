import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import http from 'http';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';

import { userTypeDefs, residentialTypeDefs, camposTypeDefs } from "./schema/_index.js";
import { queryResolver, mutationResolver } from "./resolvers/_index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import router from './router/router.js';

import 'dotenv/config';

const MONGO_DB = (process.env.NODE_ENV === 'test') ? process.env.MONGO_DB_TEST : process.env.MONGO_DB;

mongoose
    .connect(MONGO_DB)
    .then(() => console.log('Mongo DB successfully connected...'))
    .catch((err) => console.log('Mongo DB Error:', err))

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use('/api/upload', express.static('uploads'));

const port = process.env.PORT || 4004;

const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs: userTypeDefs.concat(residentialTypeDefs, camposTypeDefs),
    resolvers: { ...queryResolver, ...mutationResolver },
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                console.log(`Apollo server has been started on port ${port}`);
            },
        },
        process.env.NODE_ENV === 'production'
            ? ApolloServerPluginLandingPageProductionDefault()
            : ApolloServerPluginLandingPageLocalDefault(),
    ],
});

await server.start();

app.use('/graphql', cors(),
    expressMiddleware(server, {
        context: async ({ req, res }) => {
            const token = req.headers.authorization || '';
            return { token };
        },
    }),
);

app.use(errorHandler);

await new Promise((resolve) => httpServer.listen({ port }, resolve));

export default app; // for testing