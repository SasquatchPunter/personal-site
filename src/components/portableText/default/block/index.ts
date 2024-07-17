import AH2 from "./AH2";
import AH3 from "./AH3";
import AH4 from "./AH4";
import AH5 from "./AH5";
import BlockQuote from "./BlockQuote";
import H1 from "./H1";
import H2 from "./H2";
import H3 from "./H3";
import H4 from "./H4";
import H5 from "./H5";
import H6 from "./H6";
import P from "./P";

const block = {
  blockquote: BlockQuote,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  normal: P,
  ah2: AH2,
  ah3: AH3,
  ah4: AH4,
  ah5: AH5,
};

export default block;
