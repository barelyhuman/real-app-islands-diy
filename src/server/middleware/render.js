import { extractCss } from 'goober'
import { h } from 'preact'
import preactRenderToString from 'preact-render-to-string'
import { withManifestBundles } from '../../lib/html'

function renderFunc(res) {
  return function (component, data, options = {}) {
    res.setHeader('Content-Type', 'text/html')
    res.status(200).write(
      withManifestBundles({
        title: options.title || '',
        body: preactRenderToString(h(component, data)),
        styles: extractCss(),
      })
    )
    res.end()
  }
}

export function withRender(req, res, next) {
  res.render = renderFunc(res)
  next()
}
