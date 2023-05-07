import { createGlobalState } from '@vueuse/core';
import { upperFirst } from 'lodash-es';

const DomainReg = /^http(s?):\/\/.*?\//;
const ProtocalReg = /^http(s?)/;
const ParamReg = /\((.+?)\)/g;

export const FlatanServiceStore = createGlobalState<FlatanServiceStoreReturn>(() => {
  const services: FlatanServiceMap = {};
  const urls: FlatanUrlMap = {};

  const install = (options: FlatanServiceOption) => {
    options.apis.forEach((api: string) => {
      let [originURL, method = 'get', alias = ''] = api.split('|');
      const hasUrlParams = originURL.match(ParamReg);

      let name = originURL
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

      if (originURL?.match(ProtocalReg)?.[0]) {
        name = upperFirst(originURL.match(ProtocalReg)?.[0]) + name;
      }

      const keyName: string = alias || name;
      if (!hasUrlParams) {
        urls[keyName] = originURL;
      }

      services[keyName] = (data: any, option: any) => {
        let [url] = api.split('|');

        if (hasUrlParams) {
          hasUrlParams.forEach((key) => {
            const dataKey = key.replace(/^\(|\)$/g, '');
            url = url.replace(key, data?.[dataKey]);

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
    });

    if (options.debug) {
      console.log(services);
      console.log(urls);
    }
  };

  return {
    services,
    urls,
    install,
  };
})();

