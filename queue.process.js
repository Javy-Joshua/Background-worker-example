const Bull = require("bull")

const BackgroundQueue = () => {
    const redisHost = process.env.REDIS_HOST || '127.0.0.1'
    const redisPort = process.env.REDIS_PORT || '6379'
    const queueName = process.env.QUEUE_Name || 'background_workers'

    const WorkQueue = new Bull(queueName, { redis : { host: redisHost, port: redisPort }})

    const addToQueue = (data) => {
        console.log('Adding to queue')
        WorkQueue.add(data)
    }

    return { addToQueue}
}

module.exports = BackgroundQueue