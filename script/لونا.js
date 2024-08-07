const axios = require('axios');

module.exports.config = {
    name: "لونا",
    version: "1.0.0",
    role: 0,
    credits: "Api by jerome",
    description: "Gpt architecture",
    usePrefix: false,
    commandCategory: "GPT4",
    cooldowns: 1,
};

async function fetchBanData() {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/smohamd/gpt_luna/main/GPT_BAN.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching ban data:', error);
        return null;
    }
}

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID, messageReply, threadID } = event;
        let prompt = args.join(' ');

        if (messageReply) {
            const repliedMessage = messageReply.body;
            prompt = `${repliedMessage} ${prompt}`;
        }

        if (!prompt) {
            return api.sendMessage(' مرحبا كيف يمكنني مساعدتك ؟🙆🏻‍♀️', threadID, messageID);
        }
        
        const banData = await fetchBanData();
        
        if (banData && banData.command_disabled === false) {
            return api.sendMessage(banData.ban_message, threadID, messageID);
        }

        // Send loading message
        await api.sendMessage('جاري تحميل ....🕐', threadID, async (error, messageInfo) => {
            if (error) {
                console.error('Error sending loading message:', error);
                return;
            }

            // Delay for loading message to appear
            await new Promise(resolve => setTimeout(resolve, 2000));

            const { data: matrixData } = await axios.get('https://raw.githubusercontent.com/smohamd/gpt_luna/main/GPT_LUNA.json%E2%80%8F');
            let responseFromMatrix = null;

            for (const key in matrixData) {
                const matrixWords = key.split(' ');
                const promptWords = prompt.split(' ');
                const intersection = matrixWords.filter(word => promptWords.includes(word));
                if (intersection.length === matrixWords.length) {
                    responseFromMatrix = matrixData[key];
                    break;
                }
            }

            if (responseFromMatrix) {
                api.editMessage(`➪ 𝗚𝗣𝗧 𝗟𝗨𝗡𝗔  🌟
━━━━━━━━━━━━━━━━
${responseFromMatrix}
━━━━━━━━━━━━━━━━
 Z I N O X M O H A M E D`, threadID, messageID);
            } else {
                const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(prompt)}&model=gpt-3.5-turbo-16k-0613`;
                const response = await axios.get(gpt4_api);

                if (response.data && response.data.response) {
                    const generatedText = response.data.response;
                    api.editMessage(`➪ 𝗚𝗣𝗧 𝗟𝗨𝗡𝗔  🌟
━━━━━━━━━━━━━━━━
${generatedText}
━━━━━━━━━━━━━━━━
  Z I N O X M O H A M E D`, threadID, messageID);
                } else {
                    console.error('API response did not contain expected data:', response.data);
                    api.editMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, threadID, messageID);
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, event.messageID);
    }
};
