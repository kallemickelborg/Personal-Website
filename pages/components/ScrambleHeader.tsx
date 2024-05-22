import { useScramble } from "use-scramble";

const ScrambleHeader = ({ text }) => {
  const { ref, replay } = useScramble({
    text,
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
  });

  return (
    <h2 ref={ref}>
      {text}
    </h2>
  );
};

export default ScrambleHeader;