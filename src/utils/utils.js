
let Utils = {}

Utils.createColor = function (string) {
  const color = (typeof string !== 'object') ? string : JSON.parse(string)
  const colorNS = NSColor.colorWithRed_green_blue_alpha(color.r, color.g, color.b, color.a)

  return MSImmutableColor.colorWithNSColor(colorNS)
}


export default Utils