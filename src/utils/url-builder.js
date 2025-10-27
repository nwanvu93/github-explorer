export default function buildUrl(baseUrl, params = {}) {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
    });
    return url.toString().replace('/?', '?');
};