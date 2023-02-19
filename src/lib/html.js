export const withManifestBundles = ({ title, styles, body }) => {
  return `<html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title || 'preact-island-test-app'}</title>
      <link rel="stylesheet" href="/public/css/normalize.css" />
      <link rel="stylesheet" href="/public/css/pico.min.css" />
      <link rel="stylesheet" href="/public/css/global.css" />
      <style id="_goober">
        ${styles}
      </style>
    </head>

    <body>
      ${body}
    </body>
    <script
      type="module"
      src="/public/js/client.js"
    ></script>
  </html>`
}
