import { App } from 'vue';
import SearchTableComponent from '../components/index.vue';

const SearchTablePlugin = {
  install: (app: App) => {
    app.component('SearchTable', SearchTableComponent as any);
  },
};

export default SearchTablePlugin;

