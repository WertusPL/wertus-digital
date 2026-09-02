"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import type { Dictionary } from "@/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { InView } from "@/components/motion/InView";

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Form = Dictionary["contactPage"]["form"];
type FieldKey = "name" | "email" | "company" | "service" | "message";

type Values = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  company_url: string; // honeypot
};

const EMPTY: Values = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  message: "",
  company_url: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  form,
  locale,
  privacyHref,
}: {
  form: Form;
  locale: Locale;
  privacyHref: string;
}) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [values, setValues] = useState<Values>(EMPTY);
  const [touched, setTouched] = useState<Record<FieldKey, boolean>>({
    name: false,
    email: false,
    company: false,
    service: false,
    message: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorKind, setErrorKind] = useState<"send" | "rate">("send");

  function validate(v: Values): Partial<Record<FieldKey, string>> {
    const e: Partial<Record<FieldKey, string>> = {};
    if (!v.name.trim()) e.name = form.errors.name;
    if (!v.email.trim()) e.email = form.errors.email;
    else if (!EMAIL_RE.test(v.email.trim())) e.email = form.errors.emailInvalid;
    if (!v.company.trim()) e.company = form.errors.company;
    if (!v.service) e.service = form.errors.service;
    if (!v.message.trim()) e.message = form.errors.message;
    return e;
  }

  const errors = validate(values);
  const shownError = (key: FieldKey): string | undefined =>
    touched[key] || submitted ? errors[key] : undefined;

  const set = (key: keyof Values, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));
  const markTouched = (key: FieldKey) =>
    setTouched((prev) => ({ ...prev, [key]: true }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "submitting") return; // guard against double submit
    setSubmitted(true);
    const current = validate(values);
    if (Object.keys(current).length > 0) {
      // Focus the first invalid control for keyboard/AT users.
      window.requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus();
      });
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (res.ok) {
        setStatus("success");
        window.requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      // Too many attempts → a specific, readable message; any other non-ok
      // (covers server/SMTP failure) → the neutral "couldn't send" fallback.
      setErrorKind(res.status === 429 ? "rate" : "send");
      setStatus("error");
    } catch {
      setErrorKind("send");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        aria-live="polite"
        className="border-t-2 border-accent bg-[color-mix(in_srgb,var(--color-ink)_2.5%,transparent)] p-8 outline-none lg:p-10"
      >
        <span
          aria-hidden="true"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-[20px] text-white"
        >
          ✓
        </span>
        <h3 className="mt-6 text-[clamp(1.4rem,1.4vw+1rem,1.9rem)] font-medium leading-[1.2] tracking-[-0.02em] text-ink">
          {form.success.heading}
        </h3>
        <p className="mt-3 max-w-[42ch] text-[16px] leading-[1.6] text-muted">
          {form.success.body}
        </p>
      </div>
    );
  }

  return (
    <InView
      as="div"
      variants={container}
      viewOptions={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      <div className="mb-9 lg:mb-12">
        <motion.p
          variants={item}
          className="text-[13px] font-medium uppercase tracking-[0.18em] text-accent"
        >
          {form.label}
        </motion.p>
        <motion.h2 variants={item} className="section-heading mt-3">
          {form.heading}
        </motion.h2>
      </div>

      {/* Form (wide) + subtle editorial guide aside. Guide stacks below on ≤lg. */}
      <div className="grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_248px] xl:gap-x-20 xl:grid-cols-[minmax(0,1fr)_300px]">
        <form ref={formRef} noValidate onSubmit={handleSubmit}>
          <p className="sr-only">{form.requiredHint}</p>

          <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            <motion.div variants={item}>
              <Field
                id={`${uid}-name`}
                label={form.fields.name}
                value={values.name}
                onChange={(v) => set("name", v)}
                onBlur={() => markTouched("name")}
                error={shownError("name")}
                autoComplete="name"
                required
              />
            </motion.div>

            <motion.div variants={item}>
              <Field
                id={`${uid}-email`}
                label={form.fields.email}
                type="email"
                inputMode="email"
                value={values.email}
                onChange={(v) => set("email", v)}
                onBlur={() => markTouched("email")}
                error={shownError("email")}
                autoComplete="email"
                required
              />
            </motion.div>

            <motion.div variants={item}>
              <Field
                id={`${uid}-company`}
                label={form.fields.company}
                value={values.company}
                onChange={(v) => set("company", v)}
                onBlur={() => markTouched("company")}
                error={shownError("company")}
                autoComplete="organization"
                required
              />
            </motion.div>

            <motion.div variants={item}>
              <SelectField
                id={`${uid}-budget`}
                label={form.fields.budget}
                optionalTag={form.optionalTag}
                placeholder={form.budgetPlaceholder}
                options={form.budgetOptions}
                value={values.budget}
                onChange={(v) => set("budget", v)}
              />
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2">
              <ServiceGroup
                idBase={`${uid}-service`}
                legend={form.fields.service}
                options={form.serviceOptions}
                value={values.service}
                onChange={(v) => {
                  set("service", v);
                  markTouched("service");
                }}
                error={shownError("service")}
              />
            </motion.div>

            <motion.div variants={item} className="sm:col-span-2">
              <TextAreaField
                id={`${uid}-message`}
                label={form.fields.message}
                placeholder={form.messagePlaceholder}
                value={values.message}
                onChange={(v) => set("message", v)}
                onBlur={() => markTouched("message")}
                error={shownError("message")}
                required
              />
            </motion.div>
          </div>

          {/* Honeypot — hidden from users and assistive tech. */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor={`${uid}-company-url`}>Company website</label>
            <input
              id={`${uid}-company-url`}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.company_url}
              onChange={(e) => set("company_url", e.target.value)}
            />
          </div>

          <motion.div variants={item} className="mt-10">
            <p className="max-w-[54ch] text-[13px] leading-[1.55] text-muted">
              {form.privacy.pre}
              <Link
                href={privacyHref}
                prefetch={false}
                className="underline decoration-[var(--border-light)] underline-offset-2 transition-colors duration-200 hover:text-ink"
              >
                {form.privacy.linkLabel}
              </Link>
              {form.privacy.post}
            </p>

            {status === "error" && (
              <div
                role="alert"
                className="mt-6 border-l-2 border-[color:var(--danger)] bg-[color-mix(in_srgb,var(--danger)_5%,transparent)] px-5 py-4"
              >
                <p className="text-[14px] leading-[1.55] text-ink">
                  {errorKind === "rate" ? (
                    form.errorRate
                  ) : (
                    <>
                      {form.errorSend.pre}
                      <a
                        href={`mailto:${SITE.email}`}
                        className="font-medium text-accent underline underline-offset-4"
                      >
                        {SITE.email}
                      </a>
                      {form.errorSend.post}
                    </>
                  )}
                </p>
              </div>
            )}

            {/* Announce sending to assistive tech (success/error already announce). */}
            <p role="status" aria-live="polite" className="sr-only">
              {status === "submitting" ? form.submitting : ""}
            </p>

            <button
              type="submit"
              disabled={status === "submitting"}
              aria-busy={status === "submitting"}
              className={cn(
                "group mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[15px] font-medium text-white",
                "transition-[background-color,transform,opacity] duration-200 ease-out",
                "hover:bg-[#0546d0] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70",
              )}
            >
              <span>{status === "submitting" ? form.submitting : form.submit}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "translate-y-px transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-px",
                  status === "submitting" && "animate-pulse",
                )}
              >
                ↗
              </span>
            </button>
          </motion.div>
        </form>

        <motion.aside
          variants={item}
          className="lg:border-l lg:border-[var(--border-light)] lg:pl-10"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
            {form.guide.label}
          </p>
          <p className="mt-4 text-[14px] leading-[1.6] text-ink">
            {form.guide.intro}
          </p>
          <ul className="mt-4 space-y-2.5">
            {form.guide.items.map((entry) => (
              <li key={entry} className="flex gap-2.5 text-[14px] leading-[1.5] text-muted">
                <span aria-hidden="true" className="select-none text-accent/70">
                  —
                </span>
                <span>{entry}</span>
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>
    </InView>
  );
}

/* ------------------------------------------------------------------ *
 * Field primitives — bottom-border, transparent, brand-blue focus
 * underline that scales in (transform-only → reduced-motion safe).
 * ------------------------------------------------------------------ */

function FieldLabel({
  htmlFor,
  children,
  optionalTag,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optionalTag?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[12px] font-medium uppercase tracking-[0.14em] text-muted"
    >
      {children}
      {optionalTag ? (
        <span className="ml-1.5 normal-case tracking-normal text-muted/70">
          {optionalTag}
        </span>
      ) : (
        <span aria-hidden="true" className="ml-0.5 text-accent">
          *
        </span>
      )}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 text-[13px] text-[color:var(--danger)]">
      {children}
    </p>
  );
}

const controlBase =
  "w-full bg-transparent border-b py-2.5 text-[16px] text-ink transition-colors duration-200 placeholder:text-muted/55";

/** Wraps a control with a resting hairline + an accent underline that scales in on focus. */
function ControlShell({
  error,
  children,
}: {
  error?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative mt-3">
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-[scale] duration-300 ease-out group-focus-within:scale-x-100",
          error ? "bg-[color:var(--danger)]" : "bg-accent",
        )}
      />
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  inputMode,
  autoComplete,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  type?: string;
  inputMode?: "email" | "text";
  autoComplete?: string;
  required?: boolean;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <ControlShell error={!!error}>
        <input
          id={id}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            controlBase,
            error ? "border-[color:var(--danger)]" : "border-[var(--border-light)]",
          )}
        />
      </ControlShell>
      {error ? <ErrorText id={errorId}>{error}</ErrorText> : null}
    </div>
  );
}

function TextAreaField({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  required?: boolean;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <ControlShell error={!!error}>
        <textarea
          id={id}
          rows={5}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            controlBase,
            "block resize-y leading-[1.55]",
            error ? "border-[color:var(--danger)]" : "border-[var(--border-light)]",
          )}
        />
      </ControlShell>
      {error ? <ErrorText id={errorId}>{error}</ErrorText> : null}
    </div>
  );
}

function SelectField({
  id,
  label,
  optionalTag,
  placeholder,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  optionalTag: string;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel htmlFor={id} optionalTag={optionalTag}>
        {label}
      </FieldLabel>
      <ControlShell>
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            controlBase,
            "cursor-pointer appearance-none border-[var(--border-light)] pr-8",
            value ? "text-ink" : "text-muted/70",
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-ink">
              {opt.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-1 text-muted"
        >
          ▾
        </span>
      </ControlShell>
    </div>
  );
}

function ServiceGroup({
  idBase,
  legend,
  options,
  value,
  onChange,
  error,
}: {
  idBase: string;
  legend: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const errorId = `${idBase}-error`;
  return (
    <fieldset
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
        {legend}
        <span aria-hidden="true" className="ml-0.5 text-accent">
          *
        </span>
      </legend>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {options.map((opt) => {
          const id = `${idBase}-${opt.value}`;
          const checked = value === opt.value;
          return (
            <label
              key={opt.value}
              htmlFor={id}
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[14px] transition-colors duration-200",
                "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
                checked
                  ? "border-accent bg-[color-mix(in_srgb,var(--color-accent)_7%,transparent)] text-ink"
                  : "border-[var(--border-light)] text-ink hover:border-ink",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-1.5 w-1.5 rounded-full border transition-colors duration-200",
                  checked ? "border-accent bg-accent" : "border-muted/50 bg-transparent",
                )}
              />
              <input
                id={id}
                type="radio"
                name={`${idBase}-radio`}
                value={opt.value}
                checked={checked}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              {opt.label}
            </label>
          );
        })}
      </div>
      {error ? <ErrorText id={errorId}>{error}</ErrorText> : null}
    </fieldset>
  );
}
