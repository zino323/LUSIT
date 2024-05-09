module.exports.config = {

    name: "ابتايم",

    version: "1.0.1", 

    role: 0,

    credits: "joshua", 

    description: "عرض وقت تشغيل البوت.",

    usePrefix: false,

    commandCategory: "...",

    cooldowns: 1,

    dependencies: {

        "request":"",

        "fs-extra":"",

        "axios":""

    }

};

module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {

    const time = process.uptime(),

        hours = Math.floor(time / (60 * 60)),

        minutes = Math.floor((time % (60 * 60)) / 60),

        seconds = Math.floor(time % 60);

    const moment = require("moment-timezone");

    var juswa = moment.tz("Europe/Britain").format("『D/MM/YYYY』 【HH:mm:ss】");

    return api.sendMessage(`== معلومات وقت التشغيل   ==\n\nالساعات:${hours}\n الدقائق:${minutes}\n الثواني:${seconds}\n

━━━━━━━━━━━━━━`, event.threadID);

};
