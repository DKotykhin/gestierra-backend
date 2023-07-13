import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from "./schema/typeDefs.js";
import { queryResolver, mutationResolver } from "./resolvers/_index.js";

import 'dotenv/config';

mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log('Mongoose DB successfully connected...'))
    .catch((err) => console.log('DB Error:', err))

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4004;

const server = new ApolloServer({
    typeDefs,
    resolvers: { ...queryResolver, ...mutationResolver },
});

const { url } = await startStandaloneServer(server, {
    listen: { port },
    context: async ({ req, res }) => {
        const token = req.headers.authorization || '';
        return { token };
    },
});

console.log(`🚀  Server ready at: ${url}`);