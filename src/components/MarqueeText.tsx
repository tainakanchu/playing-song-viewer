type Props = {
  text: string;
};

export const MarqueeText: React.VFC<Props> = (props) => {
  return <div>{props.text}</div>;
};
