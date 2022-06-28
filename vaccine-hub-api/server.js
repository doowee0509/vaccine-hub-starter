const express = require("express")
const {BadRequestError, NotFoundError} = require("./utils/errors")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(cors())

app.use(morgan("tiny"))
app.use(express.json())

app.get((req, res, next) => {
    next(new NotFoundError())
})

app.get((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error: { message, status },
    })
})

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`🚀 Server listening on port ` + port)
})