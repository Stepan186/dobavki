export default function limitText(msg, count = 150) {
    if (!msg) {
        return '';
    }
    let res = msg.substr(0, count);
    if (msg.length > count) {
        res += '...';
    }
    return res;
}
