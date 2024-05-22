import { useScramble } from "use-scramble";

const ScrambleText = ({ text }) => {
  // Hook returns a ref
  const { ref, replay } = useScramble({
    text,
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 0,
  });

  // Apply the ref to a node
  return (
    <p ref={ref}>
      {text}
    </p>
  );
};

export default ScrambleText;