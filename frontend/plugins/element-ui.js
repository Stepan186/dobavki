import Vue from 'vue';
import lang from 'element-ui/lib/locale/lang/ru-RU';
import locale from 'element-ui/lib/locale';

// import ElementUI from 'element-ui';
import DatePicker from 'element-ui/lib/date-picker';
import Skeleton from 'element-ui/lib/skeleton';
import SkeletonItem from 'element-ui/lib/skeleton-item';
import Selects from 'element-ui/lib/select';
import Collapse from 'element-ui/lib/collapse';
import CollapseItem from 'element-ui/lib/collapse-item';

locale.use(lang);
export default () => {
    // Vue.use(ElementUI, { locale });
    Vue.use(DatePicker, { locale });
    Vue.use(Skeleton, { locale });
    Vue.use(SkeletonItem, { locale });
    Vue.use(Selects, { locale });
    Vue.use(Collapse, { locale });
    Vue.use(CollapseItem, { locale });
};
