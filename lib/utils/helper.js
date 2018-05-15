const parseDate = function (date) {
	const time = new Date(date);
	timeObj = {
    year: time.getFullYear(),
    month: time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1,
    day: time.getDate() < 10 ? '0' + time.getDate() : time.getDate(),
	}
	return `${timeObj.year}-${timeObj.month}-${timeObj.day}`
}

module.exports = { parseDate };