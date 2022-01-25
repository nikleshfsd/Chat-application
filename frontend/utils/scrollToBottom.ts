const scrollToBottom = (div: HTMLDivElement): void => {
  if (div && div.scrollTop + div.clientHeight !== div.scrollHeight) {
    div.scrollTop! = div.scrollHeight;
  }
};

export default scrollToBottom;