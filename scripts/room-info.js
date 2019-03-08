// Commands:
//   hubot tell me something - say what is something if known

yaml = require('js-yaml')
Chatwork = require('hubot-chatwork')
get = require('lodash.get')

module.exports = (robot) => {

  let cw = robot.adapter.bot

  for (let i = 0; i < cw.rooms.length; i++) {
    cw.Room(cw.rooms[i]).show((err, data) => {
      robot.brain.set(`${cw.rooms[i]}-info`, yaml.safeLoad(data.description))
    })
  }

  robot.hear("[info][title][dtext:chatroom_chat_edited]", (res) => {
    let room = res.message.room
    cw.Room(room).show((err, data) => {
      robot.brain.set(`${res.id}-info`, yaml.safeLoad(data.description))
    })
  })

  robot.respond(/tell me (.*)/i, (res) => {
    let query = res.match[1]
    res.reply(get(robot.brain.get(`${res.message.room}-info`), query))
  })
}
