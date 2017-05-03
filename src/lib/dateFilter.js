import moment from 'moment';
const dateFilter = {
    getWeek: () => {
        let date = {};
        date.first  = moment().weekday(1).format();
        date.last   = moment().weekday(7).format();
        return date;
    }
}
export default dateFilter;