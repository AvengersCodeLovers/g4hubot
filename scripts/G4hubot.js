// Commands:
//   hubot flip - flip something

module.exports = (robot) => {
  robot.messageRoom(process.env.HUBOT_CHATWORK_ROOMS, `I'm here 8-).\nMy name is ${process.env.HUBOT_NAME}`)

  robot.hear(/\[To:2506790\]/i, (res) => {
    console.log(res)
    res.reply("What do you want?")
  })

  robot.respond(/call (.*) for me/i, (res) => {
    let person = res.match[1]
    res.send('Hey, ' + person + ', you have a message.')
  })

  robot.respond('/upgrade/i', (res) => {
    res.reply("(roger) I'll deploy myself")
    setTimeout(() => {
      const shell = require('shelljs');
      if (shell.exec('./upgrade.sh production').code !== 0) {
        res.send("Sorry, upgrade failed :(")
      }
    }, 1000)
  })

  robot.respond(/test script (.*) for me/i, (res) => {
    let script = res.match[1]
    res.send("(roger) Please wait a bit")
    setTimeout(() => {
      const shell = require('shelljs');
      if (shell.exec('./test-script.sh production ' + script).code !== 0) {
        res.send("Sorry, upgrade failed :(")
      }
    }, 1000)
  })

  robot.respond(/add env (\w*) (.*)/i, (res) => {
    let name = res.match[1]
    let value = res.match[2]
    process.env[name] = value;
    res.send(`(roger) Env added with ${name} and ${value}`)
  })
}
