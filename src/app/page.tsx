import dynamic from "next/dynamic";
import Dither from "@/components/ui/Dither";
import StaggeredMenu from "@/components/ui/StaggeredMenu";

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
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];

  return (
    <main className="p-6 space-y-8">
      <div className="relative w-full h-[600px]">
        {/* background */}

        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />

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
      <Header title="Make. Ideas. Matter." />

      <p className="font-courier text-base">
        This paragraph will use Courier New instead of Geist Mono.
      </p>
    </main>
  );
}
