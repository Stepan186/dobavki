import axios from 'axios';

export default async function downloadFile(url, filename, params) {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'blob', // important,
        params,
        humps: false,
    });

    const linkUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = linkUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
}
