const EducationSection = () => {
  return (
    <div className="p-6 md:p-12 border-b">
      <h2 className="font-serif text-2xl md:text-4xl italic mb-8">Education</h2>
      <div>
        <h3 className="font-semibold text-base uppercase tracking-wide">
          Don Bosco Institute of Technology
        </h3>
        <p className="text-sm italic text-muted-foreground mt-1">
          Aug. 2024 – Expected 2028
        </p>
        <p className="text-sm italic text-muted-foreground mt-1">
          B.E in Computer Engineering
        </p>
        <span className="inline-block mt-3 text-[10px] uppercase tracking-widest border px-3 py-1 font-medium">
          Mumbai, India
        </span>
      </div>
    </div>
  );
};

export default EducationSection;
