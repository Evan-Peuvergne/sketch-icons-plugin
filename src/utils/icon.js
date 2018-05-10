
import Utils from './utils.js'

import UI from 'sketch/ui'
import { Style } from 'sketch/dom'


class Icon {

  constructor(item = null) {

    this.isValidIcon = true

    this._init(item)

  }

  clean() {

  }

  export() {

  }

  reset() {

  }


  _init(item) {

    this.item = item
    if (this.item.class() != 'MSSymbolMaster') { this.isValidIcon = false }

    this.item.layers().forEach((layer) => {
      let name = layer.name().toLowerCase()

      if (name == 'guide') { layer.setIsVisible(false) }
      if (name == 'model') { layer.setIsVisible(false) }

      if (name == 'icon') { this._initIcon(layer) }
    })

  }

  _initIcon(group) {

    this.icon = group

    this.icon.layers().forEach((layer) => {
      let name = layer.name().toLowerCase()

      if (name.includes('mask')) {
        this.mask = layer
        let style = this.mask.style()

        let color = NSColor.colorWithRed_green_blue_alpha(0, 0, 0, 1)
        color = MSImmutableColor.colorWithNSColor(color)
        this.mask.style().fills()[0].setColor(color)

        console.log(this.mask.hasClippingMask())
      }

      if (name.includes('color')) {
        this.color = layer
        this.color.setIsVisible(false)
      }
    })

  }

}

export default Icon