import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'ar.com.modatex.app',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;