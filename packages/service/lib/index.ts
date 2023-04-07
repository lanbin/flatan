import { FlatanServiceStore } from './store';
export { FlatanServiceStore } from './store';

const FlatanService = {
  install: (Vue: any, options: FlatanServiceOption) => {
    const { $http } = options;

    if (!$http) {
      return new Error(
        `Missing $http field configuration. Please specify the object responsible for sending the request, such as axios`,
      );
    }

    FlatanServiceStore.install(options);
  },
};

export default FlatanService;

