
import Sketch from 'sketch/dom'
import UI from 'sketch/ui'

import fs from '@skpm/fs'
import SVGo from 'svgo'

import Utils from './utils.js'
import Plugins from '../config/plugins.json'


class Icon {

  constructor(item = null) {

    this.isValidIcon = true

    this.name = null

    this.item = null
    this.guide = null, this.model = null
    this.icon = null
    this.mask = null, this.color = null

    this.shape = null

    this._init(item)

  }

  clean() {

    // Name
    this.item.setName(this.item.name().split(' / ').join('/'))

    // Hiddens
    this.guide.setIsVisible(false)
    this.model.setIsVisible(false)
    this.color.setIsVisible(false)

    // Mask
    let style = this.mask.style()

    let color = NSColor.colorWithRed_green_blue_alpha(0, 0, 0, 1)
    color = MSImmutableColor.colorWithNSColor(color)
    this.mask.style().fills()[0].setColor(color)

    this.mask.setHasClippingMask(false)

  }

  reset() {

    // Hiddens
    this.color.setIsVisible(true)

    // Mask
    this.mask.setHasClippingMask(true)

  }

  export() {

    // Export
    Sketch.export(this.item, {
      formats: 'svg',
      output: '~/Documents/Resources/TimeflyIcons',
      overwriting: true,
      compact: true
    })

    // File
    let url = '/Users/evanpeuvergne/Documents/Resources/TimeflyIcons/' + this.name.split(' / ').join('/') + '.svg'
    let svgString = fs.readFileSync(url, 'utf8')

    // SVGo
    let compressor = new SVGo({
      full: true,
      js2svg: { pretty: true, indent: 2 },
      plugins: Plugins
    })

    compressor.optimize(svgString)
      .then(result => {
        fs.writeFileSync(url, result.data, 'utf8')
      })
      .catch(error => {
        log('error')
        log(error)
      })

  }


  _init(item) {

    this.item = item
    this.name = this.item.name()
    if (this.item.class() != 'MSSymbolMaster') { this.isValidIcon = false }

    this.item.layers().forEach((layer) => {
      let name = layer.name().toLowerCase()

      if (name == 'guide') { this.guide = layer }
      if (name == 'model') { this.model = layer }

      if (name == 'icon') { this._initIcon(layer) }
    })

  }

  _initIcon(group) {

    this.icon = group

    this.icon.layers().forEach((layer) => {
      let name = layer.name().toLowerCase()

      if (name.includes('mask')) { this.mask = layer }
      if (name.includes('color')) { this.color = layer }
    })

  }

}

export default Icon