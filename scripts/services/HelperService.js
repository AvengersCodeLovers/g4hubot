function validLink (link) {
    var patternLink = RegExp("^((https|http|ftp|rtsp|mms)?://)"
        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?"
        + "(([0-9]{1,3}\.){3}[0-9]{1,3}"
        + "|"
        + "([0-9a-z_!~*'()-]+\.)*"
        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\."
        + "[a-z]{2,6})"
        + "(:[0-9]{1,5})?"
        + "((/?)|"
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$");

    return patternLink.test(link)
    }

module.exports = {
    validLink
}
