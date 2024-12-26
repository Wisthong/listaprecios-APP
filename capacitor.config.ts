import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'listaprecios-APP',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    cleartext: true, // Permitir tráfico HTTP
    // Puedes especificar la URL de tu backend si es necesario
    // url: 'http://192.168.40.46:3000'
  },
};

export default config;
