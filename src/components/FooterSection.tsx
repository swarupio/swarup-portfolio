import { Github, Linkedin, Mail } from "lucide-react";

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/swarupio" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/swarup-patil-018663317" },
  { icon: Mail, label: "Email", href: "mailto:patilswarup110@gmail.com" },
];

const FooterSection = () => {
  return (
    <div className="p-6 md:p-12 border-b">
      <h2 className="font-serif text-2xl md:text-4xl italic mb-6">Get In Touch</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        I'm always open to new opportunities, collaborations, or just a friendly chat about tech.
      </p>
      <div className="flex gap-6">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm uppercase tracking-wider hover:text-foreground text-muted-foreground transition-colors"
          >
            <s.icon className="w-4 h-4" />
            {s.label}
          </a>
        ))}
      </div>
      <div className="mt-12 pt-6 border-t text-xs text-muted-foreground uppercase tracking-wider">
        © {new Date().getFullYear()} Swarup Patil · DBIT, Mumbai
      </div>
    </div>
  );
};

export default FooterSection;
