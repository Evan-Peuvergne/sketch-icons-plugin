import Icon from '../scripts/icon.js'

import UI from 'sketch/ui'


export default function (context) {

  let selection = context.selection

  // Empty selection
  if (selection.count() <= 0) {
    UI.message('You need to select an icon to run the plugin')
    return false
  }

  // Icons
  let icon = new Icon(selection[0])

  // Format
  if (!icon.isValidIcon) {
    UI.message('Some icons seems to don\'t have a valid format')
    return false
  }

  // Export
  icon.clean()
  icon.export()
  icon.reset()

  // Feedback
  UI.message('Your icon has been successfully exported')

}