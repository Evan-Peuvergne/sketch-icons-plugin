var sketch = require('sketch')
var dom = require('sketch/dom')
var UI = require('sketch/ui')

var svgo = require('svgo')


export default function (context) {

  console.log(svgo)

  let selection = context.selection

  // Empty selection
  if (selection.count() == 0) {
    UI.message('You need to select an icon to run the plugin')
    return false
  }

  // Not a valid icon
  let item = selection[0]
  if (item.class() != 'MSSymbolMaster') {
    UI.message('Your selection doesn\'t seem to be a valid icon')
    return false
  }

  // Layers
  let layers = item.layers()
  layers.forEach(function (l) {

    if (l.name() == 'Icon') {
      l.layers().forEach(function (s) {

        // console.log(s.name())

        if (s.name().toLowerCase().indexOf('color') != -1) {
          s.setIsVisible(false)
        }

      })
    }

  })

  sketch.export(item, {
    formats: 'svg',
    output: '~/Documents/Icons',
    overwriting: true,
    compact: false,
  })

  UI.message('Icon successfully exported')

}
