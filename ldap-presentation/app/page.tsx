"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Slide = {
  id: string;
  title: string;
  subtitle?: string;
  highlight?: string;
  variant?: "default" | "split" | "graphic";
  bullets?: string[];
  secondaryBullets?: string[];
};

const slides: Slide[] = [
  {
    id: "slide-1",
    title: "LDAP – Lightweight Directory Access Protocol",
    subtitle: "Einführung & Überblick",
    highlight: "Erstellt von: Dein Name",
    bullets: [
      "Standardprotokoll für den Zugriff auf Verzeichnisdienste",
      "Entwickelt für schnelle, hierarchische Abfragen",
      "Basis vieler Identitäts- und Berechtigungsprozesse",
    ],
  },
  {
    id: "slide-2",
    title: "Was ist LDAP?",
    bullets: [
      "Netzwerkprotokoll zur Abfrage und Verwaltung von Verzeichnisdiensten",
      "Standardisiert (RFC 4510 ff.) – herstellerübergreifende Nutzung möglich",
      "Typische Systeme: OpenLDAP, Microsoft Active Directory, 389 Directory Server",
      "Verzeichnis ist hierarchisch (Baumstruktur mit Distinguished Names)",
    ],
  },
  {
    id: "slide-3",
    title: "Warum LDAP?",
    subtitle: "Schutzziele & betriebliche Notwendigkeit",
    variant: "split",
    bullets: [
      "Verfügbarkeit: zentrale Nutzerverwaltung für zahlreiche Dienste",
      "Integrität: konsistente Daten dank definierter Schemata",
      "Vertraulichkeit: Zugriffskontrollen, LDAPS/TLS-Verschlüsselung",
    ],
    secondaryBullets: [
      "Unternehmensweite Benutzer- und Gruppenverwaltung",
      "Skalierbare Authentifizierung & Autorisierung",
      "Delegierbare Administration und zentrale Policies",
    ],
  },
  {
    id: "slide-4",
    title: "LDAP-Struktur",
    subtitle: "Beispielhafte Baumdarstellung",
    variant: "graphic",
    highlight: "dc=schule,dc=de",
    bullets: [
      "Organizational Units (OUs) strukturieren Bereiche oder Standorte",
      "Entries repräsentieren Benutzer, Gruppen, Geräte und Policies",
      "Distinguished Names bestimmen die eindeutige Position im Baum",
    ],
  },
  {
    id: "slide-5",
    title: "Wie funktioniert LDAP? (Teil 1)",
    bullets: [
      "Client/Server-Modell: Anwendungen binden (bind) sich an einen LDAP-Server",
      "Kernoperationen: Bind (Authentifizierung), Search (Suche), Compare (Attributvergleich)",
      "Weitere Operationen: Add, Modify, Delete, ModifyDN, Extended",
      "Kommunikation über Port 389 (LDAP) bzw. 636 (LDAPS)",
    ],
  },
  {
    id: "slide-6",
    title: "Wie funktioniert LDAP? (Teil 2)",
    bullets: [
      "Suchanfragen nutzen Filter (z. B. (objectClass=person) UND (ou=Lehrer))",
      "Server liefert Einträge mit Attributen (z. B. cn, mail, memberOf)",
      "Schema definiert zulässige ObjectClasses und Attribute",
      "Ergebnisse dienen Authentifizierung, Autorisierung und Provisionierung",
    ],
  },
];

type SlideContentProps = {
  slide: Slide;
  index: number;
  total: number;
};

const DirectoryTree = () => {
  return (
    <div className="mt-10 grid w-full max-w-3xl grid-cols-5 gap-3 text-sm sm:text-base">
      <div className="col-span-5 flex justify-center">
        <div className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-center text-white shadow-lg backdrop-blur">
          Root
          <div className="text-[11px] text-white/80 sm:text-xs">
            dc=schule,dc=de
          </div>
        </div>
      </div>
      <div className="col-span-5 flex justify-center">
        <div className="h-10 w-px bg-white/20" />
      </div>
      <div className="col-span-5 flex flex-wrap justify-center gap-6 sm:gap-10">
        {["ou=users", "ou=groups", "ou=devices", "ou=policies"].map(
          (entry, index) => (
            <div key={entry} className="flex flex-col items-center">
              <div className="rounded-lg border border-white/15 bg-white/10 px-4 py-2 text-white shadow-md backdrop-blur">
                {entry}
              </div>
              <div className="h-8 w-px bg-white/15" />
              <div className="min-w-[160px] rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-white/90 shadow-lg backdrop-blur">
                {index === 0 && (
                  <div>
                    <div className="font-semibold">cn=Max Muster</div>
                    <div className="text-xs text-white/70">
                      uid=mmuster, mail=max.muster@schule.de
                    </div>
                  </div>
                )}
                {index === 1 && (
                  <div>
                    <div className="font-semibold">cn=Admins</div>
                    <div className="text-xs text-white/70">
                      member: cn=Max Muster
                    </div>
                  </div>
                )}
                {index === 2 && (
                  <div>
                    <div className="font-semibold">cn=Notebook-01</div>
                    <div className="text-xs text-white/70">device=Windows</div>
                  </div>
                )}
                {index === 3 && (
                  <div>
                    <div className="font-semibold">cn=PasswordPolicy</div>
                    <div className="text-xs text-white/70">
                      pwdMinLength=12
                    </div>
                  </div>
                )}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

const SlideContent = ({ slide, index, total }: SlideContentProps) => {
  return (
    <article className="flex h-full w-full flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-white shadow-2xl backdrop-blur-xl md:p-12">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
          Folie {index + 1} von {total}
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
          {slide.title}
        </h1>
        {slide.subtitle && (
          <p className="mt-2 text-base text-white/80 md:text-lg">
            {slide.subtitle}
          </p>
        )}
        {slide.highlight && (
          <p className="mt-3 text-sm font-medium text-cyan-300 md:text-base">
            {slide.highlight}
          </p>
        )}
      </header>

      <div className="mt-6 flex grow flex-col justify-center gap-6">
        {slide.variant === "graphic" ? (
          <>
            <ul className="list-disc space-y-3 pl-5 text-base md:text-lg">
              {slide.bullets?.map((item) => (
                <li key={item} className="leading-snug text-white/90">
                  {item}
                </li>
              ))}
            </ul>
            <DirectoryTree />
          </>
        ) : slide.variant === "split" ? (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold text-cyan-200">
                Schutzziele
              </h2>
              <ul className="mt-3 list-disc space-y-3 pl-5 text-base md:text-lg">
                {slide.bullets?.map((item) => (
                  <li key={item} className="leading-snug text-white/90">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-cyan-200">
                Notwendigkeit
              </h2>
              <ul className="mt-3 list-disc space-y-3 pl-5 text-base md:text-lg">
                {slide.secondaryBullets?.map((item) => (
                  <li key={item} className="leading-snug text-white/90">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <ul className="list-disc space-y-4 pl-5 text-base md:text-lg">
            {slide.bullets?.map((item) => (
              <li key={item} className="leading-snug text-white/90">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="mt-8 flex items-center justify-between text-sm text-white/70">
        <p>LDAP Essentials · Präsentation</p>
        <time>{new Date().getFullYear()}</time>
      </footer>
    </article>
  );
};

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = slides.length;
  const slide = useMemo(() => slides[activeIndex], [activeIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        handleNext();
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleNext, handlePrev]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-8 md:py-16">
      <div className="flex w-full max-w-5xl flex-col gap-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-cyan-200/70">
          <span>LDAP Präsentation</span>
          <span>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(totalSlides).padStart(2, "0")}
          </span>
        </div>
        <SlideContent slide={slide} index={activeIndex} total={totalSlides} />
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex gap-2 text-xs text-white/60">
            <span>Navigation:</span>
            <span>←/→ Pfeiltasten</span>
            <span>•</span>
            <span>Klick auf Buttons</span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="rounded-full border border-white/30 bg-white/10 px-6 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Zurück
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full border border-cyan-400/70 bg-cyan-500/80 px-6 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Weiter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
