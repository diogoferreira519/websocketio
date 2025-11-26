export function setCookie(chave, token) {
 document.cookie = `${chave}=${token};path=/`;
}
export function getCookie(chave) {
    return document.cookie.split("; ")
    .find((cookie)=> cookie.startsWith(`${chave}=`))
    ?.split('=')[1];
}

export function removeCookie(chave) {
    document.cookie = `${chave}=; expires=Thu, 01 Jan 1970 00:00:00`;
}