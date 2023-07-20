export const userTypeDefs = `#graphql
  scalar Date
  type User {
      _id: ID!
      userName: String!
      email: String! 
      resetPassword: ResetPassword            
      createdAt: Date                    
  }
  type UserWithToken {
      user: User        
      token: String
      message: String              
  }
  type ResetPassword {
      token: String
      expire: Date
      changed: Date
  }
  type UserDeleteResponse {        
      userStatus: UserDeleteStatus
      message: String
  }
  type UserDeleteStatus { 
      acknowledged: Boolean
      deletedCount: Int
  }
  type UserPasswordResponse {
      status: Boolean
      message: String
  }
  type ResetPasswordResponse {
      status: String
      message: String
  }
  
  input UserRegisterInput {        
      userName: String!
      email: String!
      password: String!          
  }
  input UserSetPasswordInput {
      token: String!
      password: String!
  } 

  type Query {
    getUserByToken: User
    userLogin(email: String!, password: String!): UserWithToken
  }
  type Mutation {
    userRegister(registerInput: UserRegisterInput): UserWithToken
    userDelete(_id: ID!): UserDeleteResponse
    userResetPassword(email: String!): ResetPasswordResponse
    userSetNewPassword(setPasswordInput: UserSetPasswordInput): UserPasswordResponse
    userConfirmPassword(password: String!): UserPasswordResponse
    userUpdatePassword(password: String!): UserPasswordResponse
  }
`;