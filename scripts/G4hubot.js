// Commands:
//   hubot flip - flip something

module.exports = (robot) => {
  robot.messageRoom(process.env.HUBOT_CHATWORK_ROOMS, "I'm here 8-)")

  robot.hear(/\[To:2506790\]/i, (res) => {
    console.log(res)
    res.send(`[rp aid=${res.message.user.id} to=${res.message.room}-${res.message.id}] What do you want?`)
  })

  robot.respond(/call (.*) for me/i, (res) => {
    let person = res.match[1]
    res.send('Hey, ' + person + ', you have a message.')
  })

  robot.respond('/upgrade/i', (res) => {
    res.send("(roger) I'll deploy myself")
    const shell = require('shelljs');
    if (shell.exec('./upgrade.sh production').code !== 0) {
      res.send("Sorry, upgrade failed :(")
    }
  })
}
