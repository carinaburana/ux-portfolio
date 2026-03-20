import dynamic from "next/dynamic";
import StaggeredMenu from "@/components/ui/StaggeredMenu";
import Dither from "@/components/ui/Dither";
import ScrollReveal from "@/components/ui/scrollreveal";

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
      <Header title="" />
      <p>
        <br></br>
      </p>

      <div className="relative w-[600px]"></div>
      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={0}
        blurStrength={10}
      >
        This is not what you were looking for. Greater meaning comes from
        searching. How does a man know what to do? Well, there's one thing, I
        think you should know. It is not love that makes the flowers grow, but a
        complex electron transfer process known as photosynthesis. This might
        actually be the right place after all. Meaning tends to show up when you
        stop looking so hard. The universe leaves small clues, usually in bad
        handwriting.
      </ScrollReveal>
    </main>
  );
}
