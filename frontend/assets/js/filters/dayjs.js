import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import ru from 'dayjs/locale/ru';

dayjs.locale(ru);
dayjs.extend(RelativeTime);

export function formatDateTime(val) {
    return dayjs(val).format('DD.MM.YYYY HH:mm');
}

export function formatDate(val) {
    return dayjs(val).format('DD.MM.YYYY');
}

export function fromNow(val) {
    return dayjs(val).fromNow();
}
