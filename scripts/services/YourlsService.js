function shortenLink (robot, url) {
    var data = {
        signature: process.env.YOURLS_SIGNATURE,
        action: 'shorturl',
        format: 'json',
        url: url
    };

    return robot.http(process.env.SUN_SHORTEN_LINK).query(data).get()
}

function expandLink () {

}

module.exports = {
    shortenLink,
    expandLink
}
