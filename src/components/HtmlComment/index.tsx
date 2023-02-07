export const HtmlComment = ({ text }) => (
  <span dangerouslySetInnerHTML={{ __html: `<!-- ${text} -->` }} />
);
