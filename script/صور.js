module.exports.config = {
    name: "صور",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Joshua Sy",
    description: "البحث عن الصور",
    usePrefix: true,
    commandCategory: "بحث",
    usages: "[نص]",
    cooldowns: 0,
};
module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const request = require("request");
    const keySearch = args.join(" ");
    if(keySearch.includes("-") == false) return api.sendMessage('الرجاء إدخال النص بالصيغة الصحيحة، مثال: صور ناروتو - 10 (يرتبط بك عدد الصور التي تريد ظهورها في النتيجة)', event.threadID, event.messageID)
    const keySearchs = keySearch.substr(0, keySearch.indexOf('-'))
    const numberSearch = keySearch.split("-").pop() || 6
    const res = await axios.get(`https://api-dien.kira1011.repl.co/pinterest?search=${encodeURIComponent(keySearchs)}`);
    const data = res.data.data;
    var num = 0;
    var imgData = [];
    for (var i = 0; i < parseInt(numberSearch); i++) {
      let path = __dirname + `/cache/${num+=1}.jpg`;
      let getDown = (await axios.get(`${data[i]}`, { responseType: 'arraybuffer' })).data;
      fs.writeFileSync(path, Buffer.from(getDown, 'utf-8'));
      imgData.push(fs.createReadStream(__dirname + `/cache/${num}.jpg`));
    }
    api.sendMessage({
        attachment: imgData,
        body: numberSearch + 'نتائج البحث عن الكلمة: '+ keySearchs
    }, event.threadID, event.messageID)
    for (let ii = 1; ii < parseInt(numberSearch); ii++) {
        fs.unlinkSync(__dirname + `/cache/${ii}.jpg`)
    }
};
