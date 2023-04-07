interface FlatanServiceMap {
  [key: string]: (data: any, option: any) => Promise<AxiosResponse<any, any>>;
}

interface FlatanUrlMap {
  [key: string]: string;
}

interface FlatanServiceStoreReturn {
  install: (options: FlatanServiceOption) => void;
  services: FlatanServiceMap;
  urls: FlatanUrlMap;
}

interface FlatanServiceOption {
  $http: AxiosInstance;
  apis: string[];
  appRoot?: string;
  isMini?: boolean;
  debug?: boolean;
}

