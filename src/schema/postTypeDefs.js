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
    input CreatePost {
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
    }
    input UpdatePost {
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
    }

    type Query {
        getPosts: [Post]
    }
    type Mutation {
        createPost(createPostInput: CreatePost): Post
        updatePost(updatePostInput: UpdatePost): Post
        deletePost(_id: ID!): PostDeleteResponse
    }
`;