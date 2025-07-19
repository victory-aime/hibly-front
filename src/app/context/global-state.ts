'use client';

import { applicationInstance } from 'rise-core-frontend';
import { GlobalApplicationContext } from './applicationContext';

/**
 * Instantiate the GlobalApplicationContext
 * This is where to keep all UI project specific configs and implementation
 * to be used by the underlying layers (StateManagement, Business and Core)
 */

export const applicationContext = new GlobalApplicationContext(
  process.env.BACKEND_URL + '_api/v1',
);
console.log('api backend url', process.env.BACKEND_URL);
applicationInstance.setContext(applicationContext);
