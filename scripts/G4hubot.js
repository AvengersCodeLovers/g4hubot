module.exports = (robot) => {
  robot.respond(/help/i, (res) => {
      res.send('I will now respond to this message.');
  });

  robot.hear(/support/i, (res) => {
    res.send('Message hear.')
  });

  robot.hear(/[To:2506790]/i, (res) => {
    res.send('I can identify message that was TO to me.')
  });

  robot.respond(/call (.*) for me/i, (res) => {
    let person = res.match[1];
    res.send('Hey, ' + person + ', you have a message.');
  })
}