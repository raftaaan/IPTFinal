const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const userRouter = require('./API/routers/user_router');
const productRouter = require('./API/routers/product_router')

app.use((req, res, next)=>{

    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    
    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT", "POST", "PATCH","DELETE","GET")
        
        return res.status(200).json({})
    }
    next()
})

app.get('/', (req, res) => {
    res.send('you just hit the home page\n')
  })

app.use('/users', userRouter);
app.use('/products', productRouter);


app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message

        }
    })
})

module.exports = app;