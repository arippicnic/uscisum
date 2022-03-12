import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

export default function ({ ...props }) {
  return (
    <ReactTooltip
      {...props}
      className="toltip-base"
      backgroundColor="#e10098"
      delayShow={250}
    />
  );
}
