import jwt from 'jsonwebtoken';

import { GraphQLError } from 'graphql';

export const checkAuth = (auth) => {

    if (!auth) {
        throw new GraphQLError("No authorization data");
    }
    try {
        const token = auth.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

        return decoded._id;
    } catch {
        throw new GraphQLError("Authorization error");
    }
}
