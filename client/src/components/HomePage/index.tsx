import React from "react";
import { connect } from "react-redux";
import { GMQ, State } from "../reducers";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section6 from "./Section6";

interface Props {
  breakpoint: GMQ;
}

const _HomePage: React.FC<Props> = ({ breakpoint }) => {
  return (
    <>
      <Section1 />
      <Section2 breakpoint={breakpoint} />
      <Section3 breakpoint={breakpoint} />
      <Section4 breakpoint={breakpoint}/>
      <Section5 breakpoint={breakpoint} />
      <Section6 breakpoint={breakpoint}/>
    </>
  );
};

const mapStateToProps = (state: State) => {
  return {
    breakpoint: state.breakpoint as GMQ,
  };
};

export default connect(mapStateToProps)(_HomePage);
