import { addParameters, configure } from '@storybook/react'
import { themes } from '@storybook/theming'

addParameters({
  options: {
    theme: themes.dark,
    storySort: (a, b) => {
      if (a[1].kind.endsWith('/Readme')) {
        return -1
      }
      if (b[1].kind.endsWith('/Readme')) {
        return 1
      }

      return a[1].id.localeCompare(b[1].id)
    },
    panelPosition: 'right',
  },
})

configure(require.context('../src', true, /\.stories\.(js|mdx)$/), module)
