import Code from "./Code";
import Em from "./Em";
import Highlight from "./Highlight";
import StrikeThrough from "./StrikeThrough";
import Strong from "./Strong";
import Underline from "./Underline";

const decorators = {
  code: Code,
  em: Em,
  highlight: Highlight,
  "strike-through": StrikeThrough,
  strong: Strong,
  underline: Underline,
};

export default decorators;
