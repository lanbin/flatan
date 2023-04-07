import { AxiosInstance } from 'axios';

interface FlatanServiceStoreReturn {
  install: (options: FlatanServiceOption) => void;
  services: {
    [key: string]: () => Promise<any>;
  };
  urls: {
    [key: string]: string;
  };
}

interface FlatanServiceOption {
  $http: AxiosInstance;
  apis: string[];
  appRoot?: string;
  isMini?: boolean;
  debug?: boolean;
}

