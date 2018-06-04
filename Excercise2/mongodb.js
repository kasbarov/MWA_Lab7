
const express = require('express');
const app = express();
const mongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
const cryptAlgorithm = 'aes256';
const cryptPassword = 'asaadsaad';


app.get('/secret', (req, res) => {

    // connect to mongo db
    mongoClient.connect('mongodb://127.0.0.1:27017/testdb', (err, client) => {

        if (err)
            throw err;

        const db = client.db('testdb');

        // get the message from homework collection
        db.collection('homework7').findOne({}, (err, doc) => {

            // encrypted message
            const message = doc.message;

            //console.dir(doc);

            // decrypt the message
            var decipher = crypto.createDecipher(cryptAlgorithm, cryptPassword)
            var decryptedMsg = decipher.update(message, 'hex', 'utf8')
            decryptedMsg += decipher.final('utf8');
            // console.log(dec);
            client.close();

            //send the decrypted message back to the client
            res.send(decryptedMsg);
            res.end();

        })
    })
});
app.listen(8000, () => console.log('listenning on port 8000'));