const Bull = require("bull");


const BackgroundQueue = () => {
  const redisHost = process.env.REDIS_HOST || "127.0.0.1";
  const redisPort = process.env.REDIS_PORT || "6379";
  const queueName = process.env.QUEUE_Name || "background_workers";

  const WorkerQueue = new Bull(queueName, {
    redis: { host: redisHost, port: redisPort },
  });

  const listenToQueue = (jobs) => {
    WorkerQueue.process((job, done) => {
      console.log("Processing job", job.data);

      switch (job.data.jobname) {
        case "sendEmail":
          console.log("Processing send email job");
          jobs[job.data.jobName](job.data);
          done(null);
          break;
        case "sendSMS":
          console.log("Processing sending SMS job");
          jobs[job.data.jobName](job.data);
          done(null);
          break;
        default:
          console.log("No job found");
      }

      done(null);
    });

    WorkerQueue.on("completed", (job, result) => {
      console.log(`Job ${job.id} completed`);
    });

    WorkerQueue.isReady().then(() => {
      console.log("Worker queue is ready");
    });
  };

  return { listenToQueue };
};

module.exports = BackgroundQueue;
