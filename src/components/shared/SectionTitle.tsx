type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="text-center">
      {eyebrow ? (
        <p className="text-sm uppercase tracking-[0.35em] text-[#9c7a4d]">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="mt-3 font-serif text-3xl text-[#2f2a25]">{title}</h2>

      {description ? (
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#7a6b5e]">
          {description}
        </p>
      ) : null}
    </div>
  );
}