const { defineConfig } = require("cypress");
const Mailosaur = require("mailosaur");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    experimentalModifyObstructiveThirdPartyCode: true,
    setupNodeEvents(on, config) {
      const serverId = config.env.MAILOSAUR_SERVER_ID;
      const mailosaur = new Mailosaur(config.env.MAILOSAUR_API_KEY);
      config.baseUrl = config.env.BASE_URL;

      on("task", {
        async clearInbox() {
          await mailosaur.messages.deleteAll(serverId);
          return null;
        },
        async getOTP() {
          const message = await mailosaur.messages.get(
            serverId,
            { sentTo: `challenge@${serverId}.mailosaur.net` },
            { timeout: 60000 }
          );
          const body = message.html?.body || message.text?.body;
          if (!body) throw new Error("Email body not found");
          const cleanBody = body.replace(/<[^>]*>/g, '');
          const match = cleanBody.match(/\d{3}-\d{3}/);
          if (!match) throw new Error("OTP not found");
          return match[0].replace('-', '');
        }
      });
      return config;
    },
  },
});