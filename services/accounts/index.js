const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql `
  extend type Query {
    me(username: String!): User
  }

  type InformacionCliente {
        numeroDocumento: String
        codigoCliente:String
        nombre: String
        apellido: String
        email: String
        fechaCreacion: String
        administrador: String
        marcaMultilinea: String
        segmentoNegocio: String
        totalSuscripciones: String
    }

    type InformacionSuscriptor {
        idSuscriptor: String
        codigoPlanSuscripcion: String
        nombrePlanSuscripcion: String
        tipoSegmento: String
        estado: String
        fechaActivacion: String
        fechaEstado: String
        tipoCliente: String
    }
 type   InformacionCuenta {
        codigoCuenta: String
        formaPago: String
        numeroPagador: String
        estadoCuenta: String
    }
    type InformacionCicloFacturacion {
        fechaIncio: String
        fechaFin: String
        idCicloFacturacion: String
    }
  type User @key(fields:"id") {
    id: ID!
    username: String
    codigoCuenta: String
    informacionCliente: InformacionCliente
    informacionSuscriptor: InformacionSuscriptor
    informacionCuenta: InformacionCuenta
    informacionCicloFacturacion: InformacionCicloFacturacion
  }
`;

const resolvers = {
    Query: {
        me(root, args) {
            //return users[0];
            const username = args.username;
            console.log('Quien soy :', username);
            return users.find(user => user.username === username);
        }
    },
    User: {
        __resolveReference(object) {
            console.log('Quien soy resolver User:', object);
            return users.find(user => user.id === object.id);
        }
    }
};

const server = new ApolloServer({
    schema: buildFederatedSchema([{
        typeDefs,
        resolvers
    }])
});

server.listen({ port: 4001 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});

const users = [{
    id: "1",
    username: "@gio",
    codigoCuenta: "12011962962",
    informacionCliente: {
        numeroDocumento: "172833500",
        codigoCliente: "172833500",
        nombre: "KATHERINE VEGA GONZALEZ",
        apellido: "KATHERINE VEGA GONZALEZ",
        email: "katherineyvegag@gmail.com",
        fechaCreacion: "2019-01-18",
        administrador: "Y",
        marcaMultilinea: "N",
        segmentoNegocio: "Empresa",
        totalSuscripciones: "1"
    },
    informacionSuscriptor: {
        idSuscriptor: " 56986425463",
        codigoPlanSuscripcion: "WEH48",
        nombrePlanSuscripcion: "lan Emprendedores 200 GB",
        tipoSegmento: "3",
        estado: "A",
        fechaActivacion: "2022-01-07",
        fechaEstado: "2022-01-08",
        tipoCliente: "C"
    },
    informacionCuenta: {
        codigoCuenta: "12011962962",
        formaPago: "10",
        numeroPagador: "56930829006",
        estadoCuenta: "N"
    },
    informacionCicloFacturacion: {
        fechaIncio: "2022-07-01",
        fechaFin: "2022-08-01",
        idCicloFacturacion: "01"
    }
}];