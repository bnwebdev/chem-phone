import RootModule from './modules'

const bootstrap = async () => {
  RootModule.createApp()
}

bootstrap().catch(console.error)
