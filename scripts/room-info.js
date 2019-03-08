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
      robot.brain.set(`${room}-info`, yaml.safeLoad(data.description))
    })
  })

  robot.respond(/tell me (.*)/i, (res) => {
    let query = res.match[1]
    let info = get(robot.brain.get(`${res.message.room}-info`), query)
    let message = yaml.safeDump(info, {
      'styles': {
        '!!null': 'canonical' // dump null as ~
      },
      'sortKeys': true        // sort object keys
    });
    res.reply(message)
  })
}
