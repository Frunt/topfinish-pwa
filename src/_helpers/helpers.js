export function getToken() {
    return localStorage.getItem('user');
}

export function getDate(dates, year) {
    const date = new Date(dates);
    const mm = date.getMonth() + 1; // getMonth() is zero-based
    const dd = date.getDate();
    const yea = year ? date.getFullYear() + 2 : date.getFullYear();
    return [(dd > 9 ? '' : '0') + dd,
        (mm > 9 ? '' : '0') + mm,
        yea
    ].join('-');
}
