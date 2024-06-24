const axios = require('axios');

exports.graphQLQuery = (query, variables) =>
    axios({
        url: 'https://xk2f5slxkze65n3obkdunmagmy.appsync-api.us-east-1.amazonaws.com/graphql',
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": 'da2-oi3aas55mnfwvgb2e5crugterm',
            "x-apigateway-event": '{}',
            "x-apigateway-context": '{}',
        },
        data: {
            query, variables
        },
    });
