export const parseQueryString = (string: string) => {
    return string.slice(1).split('&')
        .map((queryParam) => {
            let kvp = queryParam.split('=');
            return { key: kvp[0], value: kvp[1] }
        })
        .reduce((query: any, kvp: any) => {
            query[kvp.key] = kvp.value;
            return query
        }, {})
};

export const parseDate = (iso: string) => {
    var arr = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];
    let date = new Date(iso)
    let month = arr[+date.getMonth()];
    const result = `${date.getDate()} ${month} ${date.getFullYear()}, ${date.toLocaleTimeString().replace(/(.*:.*?):\d+/gs, '$1')}`
    return result
}

export function Time(date: string) {
    var d = new Date(date);
    d.setHours(d.getHours());
    let res = d.toTimeString().substring(0, 5);
    return res;

}


export function formatToHumanTime(date: string) {
    const days: any = {
        0: 'вс',
        1: 'пн',
        2: 'вт',
        3: 'ср',
        4: 'чт',
        5: 'пт',
        6: 'сб'
    }

    let key = parseDate(date).replace(/^(\d+\s.+?)\s.+/gs, '$1');

    return {
        human_date: key,
        day: days[new Date(date).getDay()],
        time: Time(date)
    }
}


export function declOfNum(number: number, titles: any) {  
    let cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}
