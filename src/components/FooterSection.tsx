import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/swarupio" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/swarup-patil-018663317" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/patilswarup04" },
  { icon: Mail, label: "Email", href: "mailto:patilswarup110@gmail.com" },
];

const FooterSection = () => {
  return (
    <div className="border-t">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left side */}
        <div className="p-6 md:p-12 lg:border-r flex flex-col justify-between min-h-[200px]">
          <h2 className="font-serif text-2xl md:text-4xl italic leading-snug">
            Let's build something<br />exceptional together.
          </h2>
          <p className="text-3xl md:text-5xl mt-8 text-muted-foreground" style={{ fontFamily: "'UnifrakturMaguntia', cursive" }}>
            swarup patil
          </p>
        </div>

        {/* Right side */}
        <div className="p-6 md:p-12 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-4 mb-8">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border p-4 text-sm font-medium hover:bg-secondary transition-colors"
              >
                <s.icon className="w-5 h-5" />
                {s.label}
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider text-right">
            © {new Date().getFullYear()} Swarup Patil
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
