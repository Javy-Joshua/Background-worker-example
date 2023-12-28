const BackgroundWorker = require('./queue.worker')
const SendEmail = require('./email.worker')

const app = BackgroundWorker()

app.listenToQueue({
    SendEmail
})