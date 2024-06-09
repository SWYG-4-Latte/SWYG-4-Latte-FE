// 공백 미포함 글자 수 maxLength까지만 노출하고 뒤에 말줄임표 표시
export const ellipsisText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;

  let slicedText = '';
  let len = 0;

  for (const ch of text) {
    if (len === maxLength) break;
    if (ch !== ' ') {
      len += 1;
    }
    slicedText += ch;
  }

  return text === slicedText ? slicedText : slicedText + '...';
};
