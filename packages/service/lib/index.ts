import { App } from 'vue';
import { FlatanServiceOption } from '../types';
import { FlatServiceStore } from './store';

export { FlatServiceStore } from './store';

const plugin = (Vue: App, options: FlatanServiceOption) => {
  const { $http } = options;

  if (!$http) {
    return new Error(
      `Missing $http field configuration. Please specify the object responsible for sending the request, such as axios`,
    );
  }

  FlatServiceStore.install(options);
};

export default plugin;

