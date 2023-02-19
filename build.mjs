import * as esbuild from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'
import fs from 'fs/promises'
import path from 'path'
import glob from 'tiny-glob'
import * as url from 'url'
import Watcher from 'watcher'
import { preactIslandPlugin } from './utils/esbuild.mjs'

const watch = process.argv.slice(2).includes('-w')

const commonConfig = {
  bundle: true,
  logLevel: 'info',
  jsx: 'automatic',
  loader: {
    '.js': 'jsx',
  },
  target: 'node14',
  format: 'cjs',
  jsxImportSource: 'preact',
}

async function main() {
  await cleanUp()
  await copyAssets()
  await server()
  await generateManifest()
  await client()
}

async function generateManifest() {
  const entryPoints = await glob('./**/*.client.js', {
    absolute: false,
    cwd: './.generated',
  })
  await fs.writeFile(
    './.generated/client.js',
    entryPoints.map(x => `import "./${x}";`).join('\n'),
    'utf8'
  )
}

async function client() {
  esbuild.build({
    ...commonConfig,
    entryPoints: ['./.generated/client.js'],
    minify: true,
    splitting: true,
    // because of this, it's right now limited to esm
    // https://github.com/evanw/esbuild/issues/16
    format: 'esm',
    platform: 'browser',
    outdir: 'dist/js',
  })
}

async function server() {
  return esbuild.build({
    ...commonConfig,
    platform: 'node',
    entryPoints: ['src/server/app.js'],
    plugins: [
      nodeExternalsPlugin(),
      preactIslandPlugin({
        cwd: url.fileURLToPath(new URL('.', import.meta.url)),
      }),
    ],
    outfile: 'dist/server.js',
  })
}

async function copyAssets() {
  await copy('./src/public', './dist')
}

async function copy(source, target) {
  const files = await glob(source + '/**/*', {
    absolute: true,
  })
  for (let file of files) {
    if ((await fs.lstat(file)).isDirectory(file)) {
      continue
    }
    let targetDir = path.dirname(file)
    targetDir = targetDir.replace(path.resolve(source), path.resolve(target))
    const filename = path.basename(file)
    await fs.mkdir(targetDir, { recursive: true })
    const fdata = await fs.readFile(file, 'utf8')
    await fs.writeFile(path.join(targetDir, filename), fdata)
  }
}

async function cleanUp() {
  await fs.rmdir('./.generated', { recursive: true })
  await fs.rmdir('./dist', { recursive: true })
}

// if watching, watcher will execute an
// initial build
!watch && (await main())

if (watch) {
  const toWatch = await glob('./src/**/*', { absolute: true })
  const watcher = new Watcher(toWatch)

  watcher.on('error', error => {
    console.error(error)
  })

  watcher.on('close', () => {
    process.exit(0)
  })

  watcher.on('all', async () => {
    await main()
  })
}
