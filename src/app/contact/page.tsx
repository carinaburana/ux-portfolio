import dynamic from "next/dynamic";
import StaggeredMenu from "@/components/ui/StaggeredMenu";
import Dither from "@/components/ui/Dither";
import { HeroExample } from "@/components/ui/videoBG";
import Noise from "@/components/ui/noise";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Learn about me", link: "/about" },
  { label: "Projects", ariaLabel: "View my projects", link: "/projects" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

function Header({ title }: { title?: string }) {
  return <h1>{title ?? "Default title"}</h1>;
}

export default function Page() {
  return (
    <main className="">
      <div
        style={{
          width: "100vw",
          zIndex: 10,
          height: "100vh",
          position: "fixed",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={10}
        />
      </div>
      <div className="relative w-full h-[600px]">
        {/* background */}

        <HeroExample />

        {/* overlay */}
        <div className="relative z-20">
          <StaggeredMenu
            position="right"
            items={menuItems}
            displaySocials={false}
            displayItemNumbering={true}
            menuButtonColor="#fff"
            openMenuButtonColor="#000000ff"
            changeMenuColorOnOpen={true}
            colors={["#de7db1ff", "#953b6bff"]}
            accentColor="#de7db1ff"
          />
        </div>
      </div>
    </main>
  );
}
