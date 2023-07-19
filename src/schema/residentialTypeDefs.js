export const residentialTypeDefs = `#graphql
    scalar Date
    enum AdvertiseTypes {
        Sell
        Rent
    }
    enum CategoryTypes {
        House
        Apartments
        Offices
        Land
        Locals
        Wineries
    }
    type Coordinates {
        latitude: Float
        longitude: Float
    }
    type ResidentialPost {
        _id: ID
        title: String
        category: CategoryTypes
        advertiseType: AdvertiseTypes
        address: String
        coordinates: Coordinates
        description: String
        tags: [String]
        allSquare: String
        usefulSquare: String
        yearBuilt: Date
        price: Int
        floor: Int
        parkingLots: Int
        bathService: Int
        bathRoom: Int
        bedRoom: Int
        imagesURL: [String]
        createdAt: Date
    }
    type ResidentialPostDeleteResponse {        
        postStatus: DeleteStatus
        message: String
    }
    type DeleteStatus { 
        acknowledged: Boolean
        deletedCount: Int
    }
    
    input InputCoordinates {
        latitude: Float
        longitude: Float
    }
    input PriceRange {
        minPrice: Int
        maxPrice: Int
    }
    input ResidentialParamsInput {
        advertiseType: AdvertiseTypes
        category: CategoryTypes
        priceRange: PriceRange
        parkingLots: Int
        bathRoom: Int
        bedRoom: Int
    }
    input CreateResidentialPostInput {
        title: String
        category: CategoryTypes
        advertiseType: AdvertiseTypes
        address: String
        coordinates: InputCoordinates   
        description: String
        tags: [String]
        allSquare: String
        usefulSquare: String
        yearBuilt: Date
        price: Int
        floor: Int
        parkingLots: Int
        bathService: Int
        bathRoom: Int
        bedRoom: Int
        imagesURL: [String]
    }
    input UpdateResidentialPostInput {
        _id: ID!
        title: String
        category: CategoryTypes
        advertiseType: String
        address: String
        coordinates: InputCoordinates        
        description: String
        tags: [String]
        allSquare: String
        usefulSquare: String
        yearBuilt: Date
        price: Int
        floor: Int
        parkingLots: Int
        bathService: Int
        bathRoom: Int
        bedRoom: Int
        imagesURL: [String]
    }

    type Query {
        getResidentialPosts(residentialParamsInput: ResidentialParamsInput): [ResidentialPost]
        getOneResidentialPost(_id: String): ResidentialPost
    }
    type Mutation {
        createResidentialPost(createResidentialPostInput: CreateResidentialPostInput): ResidentialPost
        updateResidentialPost(updateResidentialPostInput: UpdateResidentialPostInput): ResidentialPost
        deleteResidentialPost(_id: ID!): ResidentialPostDeleteResponse
    }
`;