import dynamic from "next/dynamic";

const ReactTooltip = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

export default function ({ ...props }) {
  return <ReactTooltip {...props} className="toltip-base" backgroundColor="#7c2962f2" delayShow={250} />;
}
