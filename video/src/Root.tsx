import { loadFont } from "@remotion/fonts";
import { Composition, staticFile } from "remotion";
import { DURACION_R2, Reel2Burnout } from "./reels/Reel2Burnout";
import { FPS, H, W } from "./reel/tokens";

loadFont({ family: "Fraunces", url: staticFile("fonts/Fraunces-600.woff2"), weight: "600" });
loadFont({ family: "Inter", url: staticFile("fonts/Inter-500.woff2"), weight: "500" });

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Reel2-Burnout"
        component={Reel2Burnout}
        durationInFrames={Math.round(DURACION_R2 * FPS)}
        fps={FPS}
        width={W}
        height={H}
      />
    </>
  );
};
