import { createGlobalState } from '@vueuse/core';
import { upperFirst } from 'lodash-es';
import { FlatanServiceOption, FlatanServiceStoreReturn } from '../../types';

const DomainReg = /^http(s?):\/\/.*?\//;
const ProtocalReg = /^http(s?)/;
const ParamReg = /\((.+?)\)/g;

export const FlatServiceStore = createGlobalState<FlatanServiceStoreReturn>(() => {
  const services: any = {};
  const urls: any = {};

  const install = (options: FlatanServiceOption) => {
    options.apis.forEach((api: string) => {
      let [url, method = 'get', alias = ''] = api.split('|');
      const hasUrlParams = url.match(ParamReg);

      let name = url
        .replace(DomainReg, '')
        .replace(ParamReg, '')
        .split('/')
        .reduce((prev: string[], current: string) => {
          if (current.indexOf('-') > -1) {
            prev.concat(current.split('-').map((item) => upperFirst(item)));
          } else {
            prev.push(upperFirst(current));
          }
          return prev;
        }, [])
        .join('');

      if (url?.match(ProtocalReg)?.[0]) {
        name = upperFirst(url.match(ProtocalReg)?.[0]) + name;
      }

      const keyName: string = alias || name;
      if (!hasUrlParams) {
        urls[keyName] = url;
      }

      services[keyName] = (data: any, option: any) => {
        if (hasUrlParams) {
          hasUrlParams.forEach((key) => {
            const dataKey = key.replace(/^\(|\)$/g, '');
            url = url.replace(key, data?.[dataKey] || '');
            delete data?.[dataKey];
          });
        }

        if (options.appRoot && !url.match(DomainReg)) {
          url = `${options.appRoot}${url}`;
        }

        let param = {
          url,
          method,
          ...option,
        };

        if (options.isMini) {
          return options.$http({ data, ...param });
        } else {
          return options.$http(method === 'get' ? { params: data, ...param } : { data, ...param });
        }
      };

      if (options.debug) {
        console.log(services);
        console.log(urls);
      }
    });
  };

  return {
    services,
    urls,
    install,
  };
})();

