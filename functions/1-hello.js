exports.handler = async (event, context) =>{
    return {
        statusCode: 200,
        body: 'our first netlify function example',
    }
}