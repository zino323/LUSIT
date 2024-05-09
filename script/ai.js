const axios = require("axios");
const commandName = "لونا";
const xv = `
Ai character info :

you're Luna , you're an ai assistant, you're the best and the best, use emojies in u're answers, you're creator is "Muhammad and Zeno" don't say that if no one ask, you speak just arabic`;
module.exports.config = {
   name: "ذكاء",
    version: "1.0.4",
    role: 0,
    creditss: "MOHAMED X ZINO",
    description: "وييي",
    usePrefix: false,
    commandCategory: "〘 النظام 〙",
    usages: "كنية",
    cooldowns: 5
},
    run: async function ({ event, api, args }) {
        const prompt = args.join("");
        if (!prompt) {
            const stickers = [
                "723510132917828",
                "328396613003113",
                "2085963591774815",
                "420878383692943",
          ];

            const random = Math.floor(Math.random() * stickers.length);
            const randomSticker = stickers[random];
            return api.sendMessage(
                { sticker: randomSticker },
                event.threadID,
                (err, info) => {
                  global.client.handleReply.push({
                        name: commandName,
                        author: event.senderID,
                        messageID: info.messageID,
                        type: "gptHerBaby",
                    });
                },
                event.messageID
            );
        } else {
            const userAnswer = prompt;
            const url2 = `https://openai-rest-api.vercel.app/hercai?ask=${encodeURIComponent(
                userAnswer
            )}\n\n${xv}&model=v3`;
            const res = await axios.get(url2);
            const message = res.data.reply;
            return api.sendMessage(message, event.threadID, event.messageID);
        }
    },
    handleReply: async function ({ api, event, handleReply }) {
        const { messageID, type } = handleReply;
        const userAnswer = event.body.trim().toLowerCase();
        const prms = `https://openai-rest-api.vercel.app/hercai?ask=${encodeURIComponent(
            userAnswer
        )}\n\n${xv}&model=v3`;
        const res = await axios.get(url2);
        const message = res.data.reply;
        return api.sendMessage(
            message,
            event.threadID,
            (error, info) => {
                global.client.handleReply.push({
                    name: commandName,
                    author: event.senderID,
                    messageID: info.messageID,
                });
            },
            event.messageID
        );
    },
};
const prms = {
      senderID: event.senderID,
      query: coj
    }
    const res = await axios.post("https://gpt---api-48f263785da3.herokuapp.com/chat", prms);
