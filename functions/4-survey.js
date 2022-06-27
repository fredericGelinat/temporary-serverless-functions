require('dotenv').config()

const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appfi2K2z8aWrnX0U')
  .table('survey')


exports.handler = async (event, context) =>{
    try {
        const {records} = await airtable.list()
        const survey = records.map((item)=>{
            const {id} = item;
            const {like, votes} = item.fields
            return {id, like, votes}
        })
        return {
            statusCode: 200,
            body: JSON.stringify(survey),
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: 'server error'
        }
    }
    
}