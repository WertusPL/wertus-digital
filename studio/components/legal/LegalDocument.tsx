import { Fragment } from "react";
import Link from "next/link";
import type {
  LegalBlock,
  LegalDoc,
  LegalPanel,
  LegalParagraph,
} from "@/lib/legal/types";

/**
 * Editorial legal document — navbar/footer come from RootShell. Readable
 * measure, clear H1, update date, H2 sections with hairline separators.
 * No cards, gradients or heavy motion; readability first.
 */
export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <section aria-labelledby="legal-heading">
      <div className="wd-container pt-14 pb-20 lg:pt-20 lg:pb-28">
        <div className="mx-auto max-w-[760px]">
          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-accent">
            {doc.eyebrow}
          </p>
          <h1
            id="legal-heading"
            className="mt-5 text-[clamp(2.25rem,3.2vw+1rem,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink"
          >
            {doc.title}
          </h1>
          <p className="mt-5 text-[14px] text-muted">
            {doc.updatedLabel}: <span className="text-ink">{doc.updated}</span>
          </p>

          {doc.intro.length > 0 && (
            <div className="mt-8 space-y-4">
              {doc.intro.map((p, i) => (
                <p key={i} className="text-[16px] leading-[1.7] text-ink/85">
                  {p}
                </p>
              ))}
            </div>
          )}

          {doc.contactPanel && <ContactPanel panel={doc.contactPanel} />}

          {doc.sections.map((section) => (
            <section
              key={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="mt-12 border-t border-[var(--border-light)] pt-10"
            >
              <h2
                id={`${section.id}-heading`}
                className="text-[clamp(1.3rem,1.4vw+0.95rem,1.65rem)] font-medium tracking-[-0.01em] text-ink"
              >
                {section.heading}
              </h2>
              <div className="mt-5 space-y-4">
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPanel({ panel }: { panel: LegalPanel }) {
  return (
    <div className="mt-9 border-t border-[var(--border-light)] pt-8">
      <p className="text-label text-muted">{panel.label}</p>
      <dl className="mt-4">
        {panel.rows.map((row, i) => (
          <div
            key={row.label}
            className={
              "flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6" +
              (i > 0 ? " border-t border-[var(--border-light)]" : "")
            }
          >
            <dt className="text-label shrink-0 text-muted sm:w-[140px]">
              {row.label}
            </dt>
            <dd className="text-[15px] text-ink">
              {row.href ? (
                <a
                  href={row.href}
                  className="underline decoration-[var(--border-light)] underline-offset-2 transition-colors duration-200 hover:text-accent hover:decoration-accent"
                >
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const linkClass =
  "text-accent underline decoration-[color-mix(in_srgb,var(--color-accent)_45%,transparent)] underline-offset-2 transition-colors duration-200 hover:decoration-accent";

function Paragraph({ block }: { block: LegalParagraph }) {
  const cls = "text-[15.5px] leading-[1.7] text-muted";
  if (!block.link) {
    return <p className={cls}>{block.text}</p>;
  }
  const [before, after] = block.text.split("{link}");
  const { label, href, external } = block.link;
  const isInternal = href.startsWith("/") && !external;
  return (
    <p className={cls}>
      {before}
      {isInternal ? (
        <Link href={href} prefetch={false} className={linkClass}>
          {label}
        </Link>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {label}
        </a>
      )}
      {after}
    </p>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "p") return <Paragraph block={block} />;

  if (block.type === "ul") {
    return (
      <ul className="space-y-2.5">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 text-[15.5px] leading-[1.65] text-muted"
          >
            <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  // links
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2.5">
      {block.items.map((item) => (
        <Fragment key={item.href}>
          <li>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={"text-[15px] " + linkClass}
            >
              {item.label}
            </a>
          </li>
        </Fragment>
      ))}
    </ul>
  );
}
