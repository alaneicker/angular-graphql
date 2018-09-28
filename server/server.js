const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'development';
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const schema = buildSchema(require('./graphql/type-defs'));
const { queries } = require('./graphql/queries');
const cors = require('cors')
const q = queries();

const resolvers = {
    getFirstContact: q.getFirstContact,
    allContacts: q.allContacts,
    contact: q.contact,
    contactByName: q.contactByName,
    createContact: q.createContact,
    deleteContact: q.deleteContact,
    updateContact: q.updateContact,
};

app.use(cors());

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: resolvers,
    graphiql: env === 'development' ? true : false,
}));

app.use(express.static(`${__dirname}/dist`));

app.get('/', (req, res) => {
    res.sendFile('dist/index.html', { root: __dirname });
});

app.listen(port, () => {
    console.log(`Server Running in ${env} mode at /graphql`)
});
