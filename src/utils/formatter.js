export const cleanHTML = (html) => {
  let formatted = '';
  let reg = /(>)(<)(\/*)/g;
  html = html.replace(reg, '$1\r\n$2$3');
  let pad = 0;
  html.split('\r\n').forEach((node) => {
    let indent = 0;
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indent = 0;
    } else if (node.match(/^<\/\w/)) {
      if (pad !== 0) {
        pad -= 1;
      }
    } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
      indent = 1;
    } else {
      indent = 0;
    }

    formatted += '  '.repeat(pad) + node + '\r\n';
    pad += indent;
  });
  return formatted.trim();
};