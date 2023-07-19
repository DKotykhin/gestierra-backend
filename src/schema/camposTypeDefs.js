export const camposTypeDefs = `#graphql
    scalar Date
    enum AdvertiseTypes {
        Sell
        Rent
    }
    enum PropertyTypes {
        Livestock
        Dairy
        Forestry
        Fruit
        Vegetables
        Conservation
        Real estate
        Energy
    }
    type CamposPost {
        _id: ID
        title: String
        advertiseType: AdvertiseTypes
        address: String
        description: String
        tags: [String]
        price: Int
        propertyType: PropertyTypes
        size: Float
        waterRights: Int
        bodyOfWater: Boolean
        riverShore: Int
        lakeShore: Int
        plantedHectares: Int
        buildInfrastructure: Int        
        bathRoom: Int
        bedRoom: Int
        imagesURL: [String]
        createdAt: Date
    }
    type CamposPostDeleteResponse {        
        postStatus: DeleteStatus
        message: String
    }
    type DeleteStatus { 
        acknowledged: Boolean
        deletedCount: Int
    }    

    input CreateCamposPostInput {
        title: String
        advertiseType: AdvertiseTypes
        address: String
        description: String
        tags: [String]
        price: Int
        propertyType: PropertyTypes
        size: Float
        waterRights: Int
        bodyOfWater: Boolean
        riverShore: Int
        lakeShore: Int
        plantedHectares: Int
        buildInfrastructure: Int        
        bathRoom: Int
        bedRoom: Int
        imagesURL: [String]
    }
    input UpdateCamposPostInput {
        _id: ID!
        title: String
        advertiseType: AdvertiseTypes
        address: String
        description: String
        tags: [String]
        price: Int
        propertyType: PropertyTypes
        size: Float
        waterRights: Int
        bodyOfWater: Boolean
        riverShore: Int
        lakeShore: Int
        plantedHectares: Int
        buildInfrastructure: Int        
        bathRoom: Int
        bedRoom: Int
        imagesURL: [String]
    }

    type Query {
        getCamposPosts: [CamposPost]
        getOneCamposPost(_id: String): CamposPost
    }
    type Mutation {
        createCamposPost(createCamposPostInput: CreateCamposPostInput): CamposPost
        updateCamposPost(updateCamposPostInput: UpdateCamposPostInput): CamposPost
        deleteCamposPost(_id: ID!): CamposPostDeleteResponse
    }
`;