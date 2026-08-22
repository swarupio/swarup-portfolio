import AnimatedSection from "./AnimatedSection";
import { Download } from "lucide-react";

const AboutSection = () => {
  return (
    <AnimatedSection>
      <div className="p-6 md:p-12 border-b">
        <h2 className="font-serif text-3xl md:text-5xl mb-6 leading-tight uppercase">
          Meet Your<br />New Favourite<br />Developer
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-8 max-w-prose">
          A 20-year-old Computer Engineering student at DBIT, Mumbai with a passion for building things
          that live on the internet. Currently in my third year, I'm deeply focused on Data Structures
          & Algorithms and full-stack web development. Beyond coding, I'm an active volunteer and
          open-source contributor.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a
            href="mailto:patilswarup110@gmail.com"
            className="px-6 py-3 text-sm font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Contact Me
          </a>
          <a
            href="https://github.com/swarupio"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-sm font-bold uppercase tracking-wider border hover:bg-secondary transition-colors"
          >
            GitHub
          </a>
          <a
            href="/Resume_Patil.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-sm font-bold uppercase tracking-wider border hover:bg-secondary transition-colors inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </div>
        <div className="mt-8 flex gap-8 text-sm uppercase tracking-wider text-muted-foreground">
          <span>3rd Year</span>
          <span>·</span>
          <span>3 Projects</span>
          <span>·</span>
          <span>3 Communities</span>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutSection;
