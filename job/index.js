import AWS from "aws-sdk";
import kue from "kue";
import path from "path";
import { redis } from "../config";

AWS.config.loadFromPath(path.join(__dirname, "..", "/config.json"));
const ses = new AWS.SES();

const ForgotPassword = "ForgotPassword";
class JobQueue {
  constructor() {
    this.queue = kue.createQueue(redis);
  }
  async startProcess() {
    this.queue.process(ForgotPassword, 10, async function (job, done) {
      const { name, email, link } = job.data;
      try {
        const params = {
          Source: `Tapply <user1@yopmail.com>` /* required */,
          Destination: {
            ToAddresses: [email],
          },
          Template: "ForgotPasswordTapply" /* required */,
          TemplateData: `{ \"name\":\"${name}\", \"link\":\"${link}\" }` /* eslint-disable-line no-useless-escape */,
        };
        const sendMail = await ses.sendTemplatedEmail(params).promise();
        console.log(sendMail);
      } catch (error) {
        console.error(error);
      }
      done();
    });
  }

  async createForgotPasswordMail(user) {
    try {
      const link = `https://app.tapply.vn/reset-password?uid=${user.uid}&verifyToken=${user.resetToken}`;
      await this.queue
        .create(ForgotPassword, {
          name: user.fullname,
          link,
          email: user.email,
        })
        .save();
    } catch (error) {
      console.error(error);
    }
  }
}

const QueueService = new JobQueue();

export default QueueService;
