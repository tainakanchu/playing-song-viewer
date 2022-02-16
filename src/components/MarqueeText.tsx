import Marquee from "react-fast-marquee";

type Props = {
  text: string;
};

export const MarqueeText: React.VFC<Props> = (props) => {
  return <Marquee>{props.text}</Marquee>;
};
