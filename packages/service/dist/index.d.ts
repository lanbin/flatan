import { App } from 'vue';
import { FlatanServiceOption } from '../types';
export { FlatServiceStore } from './store';
declare const plugin: (Vue: App, options: FlatanServiceOption) => Error;
export default plugin;
