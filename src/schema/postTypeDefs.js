export const postTypeDefs = `#graphql
    scalar Date
    type Coordinates {
        latitude: Float
        longitude: Float
    }
    type Post {
        _id: ID
        title: String
        address: String
        coordinates: Coordinates
        description: String
        tags: [String]
        allSquare: String
        usefulSquare: String
        yearBuilt: Date
        price: Float
        floor: Int
        imagesURL: [String]
        createdAt: Date
    }
    type PostDeleteResponse {        
        postStatus: PostDeleteStatus
        message: String
    }
    type PostDeleteStatus { 
        acknowledged: Boolean
        deletedCount: Int
    }
    
    input InputCoordinates {
        latitude: Float
        longitude: Float
    }
    input CreatePostInput {
        title: String
        address: String
        coordinates: InputCoordinates   
        description: String
        tags: [String]
        allSquare: String
        usefulSquare: String
        yearBuilt: Date
        price: Float
        floor: Int
        imagesURL: [String]
    }
    input UpdatePostInput {
        _id: ID!
        title: String
        address: String
        coordinates: InputCoordinates        
        description: String
        tags: [String]
        allSquare: String
        usefulSquare: String
        yearBuilt: Date
        price: Float
        floor: Int
        imagesURL: [String]
    }

    type Query {
        getPosts: [Post]
        getOnePost(_id: String): Post
    }
    type Mutation {
        createPost(createPostInput: CreatePostInput): Post
        updatePost(updatePostInput: UpdatePostInput): Post
        deletePost(_id: ID!): PostDeleteResponse
    }
`;