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
  selection.forEach(s => {
    let icon = new Icon(s)

    if (!icon.isValidIcon) {
      UI.message('Some icons seems to don\'t have a valid format')
      return false
    }

    icon.clean()
    icon.export()
    icon.reset()
  })

  // Feedback
  UI.message('Your icons has been successfully exported')

}