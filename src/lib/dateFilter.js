import moment from 'moment';
const info = {
    currentMonth: moment().month(),
    daysInCurrentMonth: moment().daysInMonth(),
    currentWeek: moment().week(),
}
const dateFilter = (filter, attribute) => {
    switch(filter){
        case 'week':
            return getWeek(attribute);
        case 'month':
            return getMonth(attribute); 
        case 'future':
            return getFuture(attribute);
        default:
            return getWeek(attribute);
    }
}
const getMonth = (attribute) => {
    let dateFilter = {};
    dateFilter.between = {
        attribute,
        'first': moment().month(info.currentMonth).date(1).hour(0).minutes(1).second(0).format(),
        'last': moment().month(info.currentMonth).date(info.daysInCurrentMonth).hour(0).minutes(1).second(0).format()
    };
    return dateFilter;
}
const getWeek = (attribute) => {
    let dateFilter = {};
    dateFilter.between = {
        attribute,
        'first': moment().weekday(1).hour(0).minutes(1).second(0).format(),
        'last': moment().weekday(7).hour(0).minutes(1).second(0).format()
    }
    return dateFilter;
}
const getFuture = (attribute) => {
    let dateFilter = {};
    dateFilter.after = {
        attribute,
        'date': moment().format()
    };
    return dateFilter;
}
export default dateFilter;