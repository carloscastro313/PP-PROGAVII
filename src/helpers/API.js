export default async (url,param = null) => {
    const res = await fetch(url,param);
    return await res.json();
}