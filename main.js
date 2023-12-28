const express = require("express")
const BackgroundQueue = require('./queue.process')

const PORT = 4400

const app = express()

app.use(express.json())

app.post('/process_email', (req, res) => {
    console.log(req.body)
    BackgroundQueue().addToQueue({
        email: req.body.email,
        message: req.body.message,
        jobName: "SendEmail"
    })
    return res.json({
      message: "Email Processed",
      success: true,
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})