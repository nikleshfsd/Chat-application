//Format message to display on chat window
export const formatMessage = (userName, textMsg) => {
  const date = new Date();
  const hrs = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hrs >= 12 ? 'PM' : 'AM';
  const time = `${hrs}:${minutes} ${ampm}`;

  return {
    userName,
    textMsg,
    time,
  };
};
