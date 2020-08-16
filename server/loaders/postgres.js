const { Client } = require('pg')
const client = new Client()

client.connect(err => {
    if (err) {
        console.error('Error: Could not connect to Postgresql!', err.stack)
    } else {
        console.log('Connected to PostgreSQL!')
    }
})

module.exports = client