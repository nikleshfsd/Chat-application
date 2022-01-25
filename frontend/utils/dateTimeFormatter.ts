const dateTimeFormatter = (dateTime: Date) => {
	const localDateTime = new Date(dateTime);
	return localDateTime.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
};

export default dateTimeFormatter;