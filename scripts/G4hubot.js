// Commands:
//   hubot flip - flip something

module.exports = (robot) => {
  robot.hear(/\[To:2506790\]/i, (res) => {
    console.log(res)
    res.send(`[rp aid=${res.message.user.id} to=${res.message.room}-${res.message.id}] What do you want?`)
  });

  robot.respond(/call (.*) for me/i, (res) => {
    let person = res.match[1]
    res.send('Hey, ' + person + ', you have a message.')
  })

  robot.respond('/upgrade/i', (res) => {
    res.send("I'll deploy myself")
    const shell = require('shelljs');
    shell.exec('./upgrade.sh')
  })
}
