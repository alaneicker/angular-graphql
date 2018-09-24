const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'development';
const app = require('express')();
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const schema = buildSchema(require('./graphql/type-defs'));
const { queries } = require('./graphql/queries');
const cors = require('cors')
const q = queries();

const resolvers = {
    getFirstContact: q.getFirstContact,
    getAllContactNames: q.getAllContactNames,
    contact: q.contact,
    contactByName: q.contactByName,
    createContact: q.createContact,
    deleteContact: q.deleteContact,
};

app.use(cors());

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: resolvers,
    graphiql: env === 'development' ? true : false,
}));

app.listen(port, () => {
    console.log(`Server Running in ${env} mode at localhost:${port}/graphql`)
});