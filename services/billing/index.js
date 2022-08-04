const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql `


  type Factura @key(fields: "idFolio") {
    codigoCuenta: String!,
    idFolio: ID!,
    montoFactura: String,
    fechaVencimiento: String,
    fechaGeneracionFactura: String,
    estadoFactura: String,
    urlFactura:String,
    user: User
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    facturas: [Factura]
  }
`;

const resolvers = {
    Factura: {
        user(factura) {
            console.log('factura', factura);

            return { __typename: "User", id: factura.authorID };
        }
    },
    User: {
        facturas(user) {
            console.log('user facturas', user);
            return facturas.filter(factura => factura.authorID === user.id);
        }
    }

    /** 
     * extend type Query {
   facturaciones(codigoCuenta: String!): [Factura]
  }

     facturaciones: (root, args) => {
        const { codigoCuenta } = args;
        const arrFact = facturas.filter(el => el.codigoCuenta === codigoCuenta);
        return arrFact;
    } */
};

const server = new ApolloServer({
    schema: buildFederatedSchema([{
        typeDefs,
        resolvers
    }])
});

server.listen({ port: 4005 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});

const facturas = [{
    codigoCuenta: "13384166",
    authorID: "1",
    idFolio: "80400886",
    montoFactura: "57948",
    fechaVencimiento: "2020-11-03",
    fechaGeneracionFactura: "2020-10-07 ",
    estadoFactura: "NO TIENE DEUDA",
    urlFactura: null
}, {
    codigoCuenta: "13384166",
    authorID: "1",
    idFolio: "80400887",
    montoFactura: "57948",
    fechaVencimiento: "2020-10-03",
    fechaGeneracionFactura: "2020-09-07 ",
    estadoFactura: "NO TIENE DEUDAS",
    urlFactura: null
}, {
    codigoCuenta: "13384166",
    authorID: "1",
    idFolio: "80400888",
    montoFactura: "57948",
    fechaVencimiento: "2020-09-03",
    fechaGeneracionFactura: "2020-08-07 ",
    estadoFactura: "NO TIENE DEUDA",
    urlFactura: null
}];