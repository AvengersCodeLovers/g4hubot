// Commands:
//   hubot tell me something - say what is something if known

yaml = require('js-yaml')
Chatwork = require('hubot-chatwork')

Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

module.exports = (robot) => {

  let cw = robot.adapter.bot
  console.log(cw.rooms)

  for (let i = 0; i < cw.rooms.length; i++) {
    // robot.brain.set 'description', yaml.safeLoad()
    cw.Room(cw.rooms[i]).show((err, data) => {
      robot.brain.set(`${cw.rooms[i]}-info`, yaml.safeLoad(data.description))
    })
  }

  robot.respond(/tell me (.*)/i, (res) => {
    let query = res.match[1]
    console.log(res.message.room)
    console.log(robot.brain.get(`${res.message.room}-info`))
    res.reply(Object.byString(robot.brain.get(`${res.message.room}-info`), query))
  })
}
