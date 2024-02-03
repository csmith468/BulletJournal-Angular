import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Bullet Journal',
  webDir: 'src',
  server: {
    androidScheme: 'https',
    hostname: 'http://localhost:8100',
    cleartext: true,
    allowNavigation: ['*']
  }
};

export default config;
