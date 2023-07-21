import chai, { expect } from "chai";
import chaiHttp from "chai-http";

import app from '../src/index.js';
import UserModel from '../src/models/User.js';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.should();

const user = {
    email: "jack@ukr.net",
    password: "12345678",
    userName: "Jack",
};

before((done) => {
    UserModel.deleteOne({ email: user.email })
        .then(() => done())
});

describe('/user tests', () => {

    it('test register...', (done) => {
        const queryData = {
            query: `mutation UserRegister($registerInput: UserRegisterInput) {
                    userRegister(registerInput: $registerInput) {
                        user { _id }
                        token
                        message
                    }
            }`,
            variables: {
                registerInput: {
                    email: user.email,
                    password: user.password,
                    userName: user.userName,
                }
            },
        };
        chai.request(app)
            .post('/graphql')
            .send(queryData)
            .end((err, res) => {
                const { userRegister } = res.body.data;
                expect(err).to.be.null
                err && console.log(err.message);
                res.should.have.status(200);
                userRegister.should.have.property('user');
                userRegister.should.have.property('token');
                userRegister.should.have.property('message');
                userRegister.user.should.have.property('_id');
                userRegister.token.should.be.a('string');
                userRegister.token.should.not.to.be.empty;
                console.log(userRegister.message);
                done()
            })

    })

    it('test login...', (done) => {
        const queryData = {
            query: `query UserLogin($email: String!, $password: String!) {
                    userLogin(email: $email, password: $password) {
                      user { _id }
                      token
                      message
                    }
                }`,
            variables: {
                email: user.email,
                password: user.password,
            },
        };
        chai.request(app)
            .post('/graphql')
            .send(queryData)
            .end((err, res) => {
                const { userLogin } = res.body.data;
                expect(err).to.be.null
                err && console.log(err.message);
                res.should.have.status(200);
                userLogin.should.have.property('user');
                userLogin.should.have.property('token');
                userLogin.should.have.property('message');
                userLogin.user.should.have.property('_id');
                userLogin.token.should.be.a('string');
                userLogin.token.should.not.to.be.empty;
                console.log(userLogin.message);
                done()
            })
    })
})