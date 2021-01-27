const express = require('express')
const bodyParser = require('body-parser')
const app = express()


const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://practiceUser:practicePassword@cluster0.1gytv.mongodb.net/test?retryWrites=true&w=majority'

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

// MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
//     if (err) return console.log('Hay algun error con la conexion a mongodb Atlas')
//     console.log('Conectados a mongodb atlas!')
// })

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Conectados a mongodb atlas!')
        const db = client.db('la-guerra-de-las-galaxias')
        const citasCollection = db.collection('citas')

        app.get('/', (req, res) => {
            db.collection('citas').find().toArray()
                .then(results => {
                    res.render('index.ejs', { citas: results })
                })
                .catch(error => console.error(error))
        })

        app.post('/citas', (req, res) => {
            citasCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.put('/citas', (req, res) => {
            citasCollection.findOneAndUpdate(
                { name: 'El Intruso 3' },
                { $set: { name: req.body.name, quote: req.body.quote } },
                { upsert: true }
            )
                .then(result => {
                    res.json('Todo bien')
                })
                .catch(error => console.error(error))
        })

        app.delete('/citas', (req, res) => {
            citasCollection.deleteOne(
                { name: req.body.name }
            )
                .then(result => {
                    if (result.deletedCount === 0 ) {
                        return res.json('No hay ninguna cita')
                    }
                    res.json('El Intruso 3 eliminado')
                })
                .catch(error => console.error(error))
        })

    })
    .catch(error => console.error(error))



// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })

// app.post('/citas', (req, res) => {
//     citasCollection.insertOne(req.body)
//         .then(result => {
//             console.log(result)
//         })
//         .cathc(error => console.error(error))

//     console.log('Mandando!')
//     console.log(req.body)
// })