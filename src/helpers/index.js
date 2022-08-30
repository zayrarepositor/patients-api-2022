/* yyyy/mm/dd */
export const ageCalculator = (birthday) => {
    const now = new Date();

    const nowYear = parseInt(now.getFullYear());
    const nowMonth = parseInt(now.getMonth() + 1);
    const nowDay = parseInt(now.getDate());

    const birthYear = parseInt(String(birthday).substring(0, 4));
    const birthMonth = parseInt(String(birthday).substring(5, 7));
    const birthDay = parseInt(String(birthday).substring(8, 10));

    let age = nowYear - birthYear;
    if (nowMonth < birthMonth) age--;
    if (nowMonth === birthMonth && nowDay < birthDay) age--;

    return age;
};

export const dateFormatter = (date) => {
    const dateFormated = new Date(date);
    const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    };
    return dateFormated.toUTCString('en-US', options).slice(0, -12);
};

export const nameFormatter = (name) => {
    return name
        .split(' ')
        .map((ch) => ch[0].toUpperCase() + ch.slice(1))
        .join(' ');
};
