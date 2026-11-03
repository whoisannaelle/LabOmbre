import React, { useState } from "react";

// ================= DONNÉES =================
const AILES = [
  { id: 0, nom: "Aile de la Chaudière", theme: "Matière", icon: "🧊", progression: 1, salles: 3 },
  { id: 1, nom: "Aile du Générateur", theme: "Énergie", icon: "⚡", progression: 1, salles: 3 },
  { id: 2, nom: "Aile de l'Observatoire", theme: "Mouvements", icon: "🌍", progression: 0, salles: 3 },
  { id: 3, nom: "Aile du Son & Lumière", theme: "Signaux", icon: "📡", progression: 0, salles: 3 },
];

const EXOS_SALLE1 = [
  { n: 1, titre: "L'énigme du glaçon", type: "🔥 Manipulation · matière", ecran: "glacon", xp: 40 },
  { n: 2, titre: "Atome, molécule ou ion ?", type: "🧩 Mini-jeu · matière", ecran: "atome", xp: 25 },
  { n: 3, titre: "Le curseur pH", type: "🧪 Manipulation · matière", ecran: "ph", xp: 25 },
  { n: 4, titre: "Réillumine le Générateur", type: "🔌 Circuit vidéo · énergie", ecran: "circuit", xp: 30 },
];

const EXOS_APERCU = [
  { titre: "La balance des planètes", type: "🌍 Mouvements · poids & gravitation", ecran: "planetes", xp: 30 },
  { titre: "L'orage du LabOmbre", type: "📡 Signaux · vitesse du son", ecran: "orage", xp: 35 },
];

const INTRO = [
  { icon: "😵", texte: "Tu ouvres les yeux. Un mal de tête terrible. Un laboratoire souterrain, plongé dans la pénombre… et des écrans qui clignotent." },
  { icon: "🤖", texte: "« Bonjour, cobaye », dit une voix désincarnée. « Je suis V.I.T.R.I.N.E., l'intelligence artificielle de ce laboratoire. Tu as perdu la mémoire. Enfin… tu as perdu TA mémoire. »" },
  { icon: "🚪", texte: "« Ce laboratoire est divisé en 4 ailes, verrouillées l'une après l'autre. Chaque épreuve scientifique résolue te rend un fragment de mémoire. Tu veux savoir qui tu es ? Prouve que tu comprends le monde. »" },
  { icon: "🧠", texte: "Sur l'écran principal, un nom clignote : PROFESSEUR A… Le reste est effacé. À toi de le retrouver." },
];

const PLANETES = [
  { nom: "Terre", g: 10, poids: "≈ 500 N" },
  { nom: "Lune", g: 1.6, poids: "≈ 80 N" },
  { nom: "Mars", g: 3.7, poids: "≈ 185 N" },
  { nom: "Jupiter", g: 25, poids: "≈ 1 250 N" },
];

// ================= UI DE BASE =================
function Chip({ children, className = "" }) {
  return <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>;
}

function Barre({ v, max, couleur = "bg-cyan-400" }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div className={`h-full rounded-full ${couleur}`} style={{ width: `${Math.min(100, (v / max) * 100)}%` }} />
    </div>
  );
}

function Titre({ eyebrow, children }) {
  return (
    <div className="mb-4">
      <p className="mb-1 text-xs uppercase tracking-widest text-cyan-400">{eyebrow}</p>
      <h2 className="text-2xl font-black text-white">{children}</h2>
    </div>
  );
}

function Retour({ onBack }) {
  return <button onClick={onBack} className="mb-4 text-sm text-slate-400 hover:text-white">← Retour au palier</button>;
}

// ================= INTRO (première connexion) =================
function Intro({ onFinish }) {
  const [i, setI] = useState(0);
  const dernier = i === INTRO.length - 1;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-6 text-center">
      <div className="mb-8 text-7xl">{INTRO[i].icon}</div>
      <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-300">{INTRO[i].texte}</p>
      <div className="flex items-center gap-3">
        {INTRO.map((_, k) => (
          <span key={k} className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-cyan-400" : "w-2 bg-white/20"}`} />
        ))}
      </div>
      <button
        onClick={() => (dernier ? onFinish() : setI(i + 1))}
        className="mt-10 rounded-xl bg-cyan-400 px-8 py-3 font-bold text-slate-950 hover:scale-105"
      >
        {dernier ? " Entrer dans le LabOmbre →" : "Suivant"}
      </button>
      <button onClick={onFinish} className="mt-4 text-xs text-slate-500 hover:text-slate-300">Passer l'introduction</button>
    </div>
  );
}

// ================= NAVIGATION =================
const PAGES = [
  { id: "accueil", label: "🏠 Accueil" },
  { id: "carte", label: "🗺️ LabOmbre" },
  { id: "palier", label: "🧊 Épreuves" },
  { id: "carnet", label: "📖 Carnet" },
  { id: "conformite", label: "🏛️ Conformité" },
];

function Nav({ page, go, xp, frags, niveau }) {
  return (
    <div className="sticky top-0 z-20 flex flex-wrap items-center gap-2 border-b border-white/10 bg-slate-950/95 p-3 backdrop-blur">
      <span className="mr-2 font-black text-white">🔬 Prof. Atome</span>
      {PAGES.map((p) => (
        <button
          key={p.id}
          onClick={() => go(p.id)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            page === p.id ? "bg-cyan-400 text-slate-950" : "bg-white/5 text-slate-300 hover:bg-white/10"
          }`}
        >
          {p.label}
        </button>
      ))}
      <span className="ml-auto flex items-center gap-2">
        <Chip className="bg-cyan-400/15 text-cyan-300">⭐ {xp} XP · Niv. {niveau}</Chip>
        <Chip className="bg-white/10 text-slate-300">🧠 {frags}/12</Chip>
      </span>
    </div>
  );
}

// ================= ÉCRAN ACCUEIL =================
function Accueil({ onStart, xp, frags, fiches }) {
  const niveau = Math.floor(xp / 300) + 1;
  return (
    <div className="flex flex-col items-center p-8 text-center">
      <div className="mb-6 text-6xl">🔬</div>
      <p className="mb-2 text-xs uppercase tracking-[0.4em] text-cyan-400">Escape game scientifique · 4e</p>
      <h1 className="mb-3 text-5xl font-black text-white">PROFESSEUR ATOME</h1>
      <p className="mb-8 max-w-xl text-slate-400">
        Amnésique, enfermé dans le LabOmbre, vous récupérez votre mémoire en résolvant des épreuves de physique-chimie de 4e.
      </p>
      <button onClick={onStart} className="rounded-xl bg-cyan-400 px-8 py-4 text-lg font-bold text-slate-950 shadow-lg shadow-cyan-400/30 hover:scale-105">
        ▶ Reprendre l'enquête
      </button>

      {/* Carte de progression du joueur */}
      <div className="mt-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-white">🕵️ Niveau {niveau} · {["Inconnu", "Stagiaire", "Chercheur", "Docteur", "Professeur Atome"][niveau - 1] || "Professeur Atome"}</span>
          <span className="text-cyan-300">{xp} XP</span>
        </div>
        <Barre v={xp % 300} max={300} />
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-white/5 p-2">
            <p className="text-lg font-black text-cyan-300">{frags}/12</p>
            <p className="text-[10px] text-slate-400">Fragments 🧠</p>
          </div>
          <div className="rounded-lg bg-white/5 p-2">
            <p className="text-lg font-black text-cyan-300">{fiches.length}/12</p>
            <p className="text-[10px] text-slate-400">Fiches 📄</p>
          </div>
          <div className="rounded-lg bg-white/5 p-2">
            <p className="text-lg font-black text-cyan-300">0/5</p>
            <p className="text-[10px] text-slate-400">Badges 🏅</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= ÉCRAN CARTE =================
function Carte({ onEnter }) {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-1 text-3xl font-black text-white">🗺️ Le LabOmbre</h2>
        <p className="mb-8 text-slate-400">4 ailes = les 4 thèmes officiels du cycle 4. 12 salles · 60 épreuves · 55 à 80 h.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {AILES.map((a) => {
            const locked = a.progression === 0;
            return (
              <button
                key={a.id}
                onClick={() => !locked && onEnter(a.id)}
                disabled={locked}
                className={`rounded-2xl border p-5 text-left transition ${
                  locked ? "cursor-not-allowed border-white/5 bg-white/[0.02] opacity-50"
                    : "border-cyan-400/40 bg-gradient-to-br from-cyan-400/10 to-transparent hover:scale-[1.02]"
                }`}
              >
                <div className="mb-3 flex items-start justify-between">
                  <span className="text-4xl">{a.icon}</span>
                  {locked ? <Chip className="bg-white/10 text-slate-300">🔒 Fermée</Chip> : <Chip className="bg-cyan-400/20 text-cyan-300">Disponible</Chip>}
                </div>
                <h3 className="text-lg font-bold text-white">{a.nom}</h3>
                <p className="mb-4 text-sm text-slate-400">Thème : {a.theme} · {a.salles} salles</p>
                <Barre v={a.progression} max={a.salles} couleur={locked ? "bg-slate-600" : "bg-cyan-400"} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ================= ÉCRAN PALIER =================
function Palier({ onExo }) {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-2 flex items-center gap-3">
          <span className="text-4xl">🧊</span>
          <div>
            <h2 className="text-2xl font-black text-white">Salle 1 — La Chaudière</h2>
            <p className="text-sm text-slate-400">Palier de 5 épreuves · chaque épreuve validée = un fragment de mémoire + une fiche de révision</p>
          </div>
        </div>
        <p className="mb-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm italic text-slate-300">
          « V.I.T.R.I.N.E. : Montre-moi que tu comprends la matière, et je te rends un morceau de toi. »
        </p>
        <div className="space-y-3">
          {EXOS_SALLE1.map((e) => (
            <div key={e.n} className="flex items-center gap-4 rounded-xl border border-cyan-400/60 bg-cyan-400/10 p-4 ring-1 ring-cyan-400/40">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 font-bold text-white">{e.n}</div>
              <div className="flex-1">
                <p className="font-semibold text-white">{e.titre}</p>
                <p className="text-xs text-slate-400">{e.type}</p>
              </div>
              <button onClick={() => onExo(e.ecran)} className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 hover:scale-105">
                Commencer
              </button>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-slate-500">
          ⚠️ Règle du palier : un exercice raté ne bloque pas la suite — il se rejoue à la fin du palier, après l'exercice 5.
        </p>

        <h3 className="mb-3 mt-10 text-lg font-bold text-white">🚪 Aperçu des salles suivantes</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {EXOS_APERCU.map((e) => (
            <button key={e.ecran} onClick={() => onExo(e.ecran)} className="rounded-xl border border-white/10 bg-white/5 p-4 text-left hover:border-cyan-400/40 hover:bg-cyan-400/5">
              <p className="font-semibold text-white">{e.titre}</p>
              <p className="text-xs text-slate-400">{e.type}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ================= ÉPREUVE : GLAÇON =================
function ExoGlacon({ onBack, onWin }) {
  const [fontdu, setFontdu] = useState(false);
  const [reponse, setReponse] = useState(null);
  const valider = (choix) => {
    const ok = choix === "non";
    setReponse(ok ? "bon" : "mauvais");
    if (ok) setTimeout(() => onWin({ xp: 40, fragment: "Ton premier souvenir de cours…", fiche: "Changements d'état & conservation de la masse" }), 2400);
  };
  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl">
        <Retour onBack={onBack} />
        <Titre eyebrow="Épreuve 1 · Manipulation">L'énigme du glaçon 🧊🔥</Titre>
        <div className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-6 text-center">
          <div className="mb-4 text-7xl">{fontdu ? "💧" : "🧊"}</div>
          <p className="mb-1 text-sm text-slate-300">{fontdu ? "1 L de glace a fondu → volume mesuré : 0,92 L" : "Volume initial : 1 L (glace solide)"}</p>
          <p className="text-sm text-slate-300">Masse affichée : <span className="font-bold text-cyan-300">0,92 kg</span> (avant et après)</p>
          {!fontdu ? (
            <button onClick={() => setFontdu(true)} className="mt-5 rounded-xl bg-orange-500 px-6 py-3 text-lg font-bold text-white shadow-lg shadow-orange-500/30 hover:scale-105">
              🔥 Faire fondre le glaçon
            </button>
          ) : (
            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 text-left">
              <p className="mb-3 font-semibold text-white">Quiz : 1 L de glace fondue donne-t-il 1 L d'eau liquide ?</p>
              <div className="flex gap-3">
                <button onClick={() => valider("oui")} className="flex-1 rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 font-semibold text-white hover:bg-cyan-400/20">Oui</button>
                <button onClick={() => valider("non")} className="flex-1 rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 font-semibold text-white hover:bg-cyan-400/20">Non</button>
              </div>
            </div>
          )}
        </div>
        {reponse === "bon" && (
          <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-4 text-sm text-emerald-300">
            ✅ Exact ! La <b>masse se conserve</b> au changement d'état, mais le <b>volume diminue</b>. La vanne s'ouvre…
          </div>
        )}
        {reponse === "mauvais" && (
          <div className="rounded-xl border border-amber-400/40 bg-amber-400/10 p-4 text-sm text-amber-300">
            ❌ Regarde la balance : la masse est restée 0,92 kg, mais le volume a changé. Cette épreuve sera à rejouer en fin de palier.
          </div>
        )}
      </div>
    </div>
  );
}

// ================= ÉPREUVE : ATOME =================
const MOLECULES = [
  { nom: "Atome de carbone", dessin: "⚪", bonne: "atome" },
  { nom: "Molécule d'eau (H₂O)", dessin: "⚪⚪⚪", bonne: "molecule" },
  { nom: "Ion H⁺", dessin: "➕", bonne: "ion" },
  { nom: "Molécule de dioxygène (O₂)", dessin: "⚪⚪", bonne: "molecule" },
];

function ExoAtome({ onBack, onWin }) {
  const [zones, setZones] = useState({});
  const [msg, setMsg] = useState(null);
  const verif = () => {
    const ok = MOLECULES.every((m, i) => zones[i] === m.bonne);
    setMsg(ok ? "ok" : "ko");
    if (ok) setTimeout(() => onWin({ xp: 25, fragment: "Des formules griffonnées… les tiennes.", fiche: "Atomes, molécules et ions" }), 1600);
    return ok;
  };
  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl">
        <Retour onBack={onBack} />
        <Titre eyebrow="Épreuve 2 · Mini-jeu">Atome, molécule ou ion ? 🧩</Titre>
        <p className="mb-6 text-slate-400">Range chaque spécimen dans la bonne boîte. V.I.T.R.I.N.E. vérifie ta classification…</p>
        <div className="space-y-3">
          {MOLECULES.map((m, i) => (
            <div key={m.nom} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
              <span className="text-2xl">{m.dessin}</span>
              <p className="flex-1 text-sm font-semibold text-white">{m.nom}</p>
              {["atome", "molecule", "ion"].map((z) => (
                <button
                  key={z}
                  onClick={() => setZones({ ...zones, [i]: z })}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${zones[i] === z ? "bg-cyan-400 text-slate-950" : "bg-white/10 text-slate-300 hover:bg-white/20"}`}
                >
                  {z === "molecule" ? "Molécule" : z === "atome" ? "Atome" : "Ion"}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3">
          <button onClick={verif} className="rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 hover:scale-105">Valider le tri</button>
          {msg === "ok" && <Chip className="bg-emerald-400/20 text-emerald-300">✅ Tri parfait !</Chip>}
          {msg === "ko" && <Chip className="bg-amber-400/20 text-amber-300">⚠️ Une erreur — rejoué en fin de palier</Chip>}
        </div>
      </div>
    </div>
  );
}

// ================= ÉPREUVE : pH =================
function ExoPh({ onBack, onWin }) {
  const [ph, setPh] = useState(7);
  const [gagne, setGagne] = useState(false);
  const couleur = (v) => (v < 4 ? "#EF4444" : v < 6.5 ? "#FB923C" : v <= 7.5 ? "#34D399" : v <= 10 ? "#22D3EE" : "#8B5CF6");
  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl">
        <Retour onBack={onBack} />
        <Titre eyebrow="Épreuve 3 · Manipulation">Le curseur pH 🧪</Titre>
        <p className="mb-6 text-slate-400">La porte de la réserve ne s'ouvre qu'en solution <b className="text-white">basique</b>.</p>
        <div className="mb-6 rounded-2xl border border-white/10 bg-slate-900 p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-6xl">🧫</span>
            <div className="text-right">
              <p className="text-4xl font-black" style={{ color: couleur(ph) }}>pH {ph}</p>
              <p className="text-xs uppercase tracking-widest text-slate-400">{ph < 7 ? "Acide" : ph === 7 ? "Neutre" : "Basique"}</p>
            </div>
          </div>
          <input type="range" min="0" max="14" step="1" value={ph} onChange={(e) => { setPh(+e.target.value); setGagne(false); }} className="w-full accent-cyan-400" />
          <div className="mt-1 flex justify-between text-[10px] text-slate-500"><span>0 acide</span><span>7 neutre</span><span>14 basique</span></div>
          {ph >= 8 && (
            <button
              onClick={() => { setGagne(true); setTimeout(() => onWin({ xp: 25, fragment: "Une réserve de produits chimiques… tu la connaissais par cœur.", fiche: "Acidité, basicité et mesure du pH" }), 2200); }}
              className="mt-5 w-full rounded-xl bg-cyan-400 py-3 font-bold text-slate-950 hover:scale-[1.02]"
            >
              Verser la solution dans la serrure
            </button>
          )}
          {gagne && <p className="mt-3 text-center text-sm font-semibold text-emerald-300">✅ La serrure neutralisée s'ouvre !</p>}
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">Bonus classé — produits du quotidien</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[{ n: "Jus de citron", p: 2 }, { n: "Eau pure", p: 7 }, { n: "Savon", p: 9 }, { n: "Vinaigre", p: 3 }].map((x) => (
              <div key={x.n} className="rounded-lg bg-white/5 p-3 text-center">
                <p className="text-sm font-semibold text-white">{x.n}</p>
                <p className="text-lg font-black" style={{ color: couleur(x.p) }}>{x.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= ÉPREUVE : CIRCUIT =================
function ExoCircuit({ onBack, onWin }) {
  const [pos, setPos] = useState(0);
  const [branche, setBranche] = useState(null);
  const etapes = [
    "🎬 Étape 1 — V.I.T.R.I.N.E. montre le schéma : pile, interrupteur, lampe, en série.",
    "🎬 Étape 2 — La vidéo monte le circuit pas à pas… mais coupe au moment de brancher.",
    "🛠️ À toi : sélectionne le bon dipôle pour fermer le circuit de la salle du Générateur.",
  ];
  const allume = branche === "lampe";
  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl">
        <Retour onBack={onBack} />
        <Titre eyebrow="Épreuve 4 · Circuit vidéo interactive">Réillumine le Générateur 🔌💡</Titre>
        <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
          <div className={`flex h-40 items-center justify-center text-7xl transition-all ${allume ? "bg-amber-300/20" : "bg-slate-950"}`}>{allume ? "💡" : "🌑"}</div>
          <div className="border-t border-white/10 p-4">
            <p className="mb-3 text-sm text-slate-300">{etapes[pos]}</p>
            <div className="flex flex-wrap gap-2">
              {pos < 2 && (
                <button onClick={() => setPos(pos + 1)} className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20">▶ Suite de la vidéo</button>
              )}
              {pos === 2 && branche === null && (
                <>
                  <button onClick={() => setBranche("lampe")} className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:scale-105">🔗 Brancher la lampe en série</button>
                  <button onClick={() => setBranche("fil")} className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/20">🔗 Brancher un fil nu (danger ?)</button>
                </>
              )}
              {branche === "lampe" && (
                <button onClick={() => onWin({ xp: 30, fragment: "La salle s'éclaire… tu revois un visage d'assistant. Qui est-il ?", fiche: "Circuits série & sécurité électrique" })} className="rounded-lg bg-cyan-400 px-6 py-2.5 font-bold text-slate-950 hover:scale-105">
                  Ouvrir la porte → +30 XP
                </button>
              )}
            </div>
            {branche === "lampe" && <p className="mt-3 text-sm font-semibold text-emerald-300">✅ Circuit fermé : le courant passe, la lampe éclaire la salle !</p>}
            {branche === "fil" && <p className="mt-3 text-sm font-semibold text-amber-300">⚠️ Court-circuit : le fusible a grillé ! Relis le mémo sécurité et retente — rejoué en fin de palier.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= ÉPREUVE : PLANÈTES (mouvements) =================
function ExoPlanetes({ onBack, onWin }) {
  const [i, setI] = useState(0);
  const [msg, setMsg] = useState(null);
  const p = PLANETES[i];
  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl">
        <Retour onBack={onBack} />
        <Titre eyebrow="Salle aperçu · Mouvements et interactions">La balance des planètes 🌍⚖️</Titre>
        <p className="mb-6 text-slate-400">
          Le LabOmbre simule la gravité de plusieurs astres. V.I.T.R.I.N.E. te demande : le <b className="text-white">masse</b> ou le <b className="text-white">poids</b> — lequel change selon la planète ?
        </p>
        <div className="mb-6 rounded-2xl border border-white/10 bg-slate-900 p-6 text-center">
          <div className="mb-3 flex justify-center gap-2">
            {PLANETES.map((pl, k) => (
              <button key={pl.nom} onClick={() => setI(k)} className={`rounded-full px-3 py-1 text-xs font-bold ${k === i ? "bg-cyan-400 text-slate-950" : "bg-white/10 text-slate-300 hover:bg-white/20"}`}>
                {pl.nom}
              </button>
            ))}
          </div>
          <div className="mb-2 text-6xl">{["🌍", "🌕", "🔴", "🪐"][i]}</div>
          <p className="text-sm text-slate-300">Colis de <b className="text-white">50 kg</b> sur {p.nom} :</p>
          <p className="text-3xl font-black text-cyan-300">Poids : {p.poids}</p>
          <p className="text-xs text-slate-500">g = {String(p.g).replace(".", ",")} N/kg · masse inchangée : 50 kg</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="mb-3 font-semibold text-white">Quiz : quand on change de planète, qu'est-ce qui change ?</p>
          <div className="flex flex-col gap-2">
            <button onClick={() => setMsg("ko")} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10">La masse uniquement</button>
            <button onClick={() => setMsg("ko")} className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10">La masse et le poids</button>
            <button
              onClick={() => { setMsg("ok"); setTimeout(() => onWin({ xp: 30, fragment: "Un télescope brisé… tu l'avais réparé mille fois.", fiche: "Masse, poids et gravitation" }), 2400); }}
              className="rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-400/20"
            >
              Le poids uniquement
            </button>
          </div>
          {msg === "ok" && <p className="mt-3 text-sm font-semibold text-emerald-300">✅ Exact ! Le poids dépend de g (P = m × g), la masse ne change jamais.</p>}
          {msg === "ko" && <p className="mt-3 text-sm font-semibold text-amber-300">❌ Regarde la balance : le colis pèse toujours 50 kg. Rejoué en fin de palier.</p>}
        </div>
      </div>
    </div>
  );
}

// ================= ÉPREUVE : ORAGE (signaux) =================
function ExoOrage({ onBack, onWin }) {
  const [etape, setEtape] = useState(0);
  const [distance, setDistance] = useState(null);
  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl">
        <Retour onBack={onBack} />
        <Titre eyebrow="Salle aperçu · Des signaux pour observer et communiquer">L'orage du LabOmbre ⛈️⚡</Titre>
        <p className="mb-6 text-slate-400">
          Un orage éclate au-dessus du LabOmbre. La porte de l'aile s'ouvre seulement si tu estimes la distance de la foudre : la lumière arrive instantanément, le son voyage à <b className="text-white">340 m/s</b>.
        </p>
        <div className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-6 text-center">
          <div className="mb-4 text-7xl">{etape === 0 ? "🌩️" : etape === 1 ? "⚡" : "🔊"}</div>
          {etape === 0 && (
            <button onClick={() => setEtape(1)} className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white hover:scale-105">👁️ Attendre le prochain éclair</button>
          )}
          {etape === 1 && (
            <button onClick={() => { setEtape(2); setDistance(340 * 5); }} className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white hover:scale-105">
              ⏱️ Tu comptes : 5 secondes plus tard… le tonnerre !
            </button>
          )}
          {etape === 2 && (
            <div>
              <p className="mb-2 text-sm text-slate-300">d = v × t = 340 m/s × 5 s</p>
              <p className="text-3xl font-black text-cyan-300">Distance ≈ 1 700 m</p>
              <p className="mt-1 text-xs text-slate-500">V.I.T.R.I.N.E. confirme : l'orage est à 1,7 km — la porte s'ouvre.</p>
              <button
                onClick={() => onWin({ xp: 35, fragment: "Un carnet plein de calculs de vitesse du son… écrits de ta main.", fiche: "Signaux sonores : vitesse et propagation" })}
                className="mt-5 rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 hover:scale-105"
              >
                Ouvrir l'aile du Son & Lumière →
              </button>
            </div>
          )}
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-400">
          💡 Le savais-tu ? On peut estimer la distance d'un orage en comptant les secondes entre l'éclair et le tonnerre, puis en multipliant par 340. Risques auditifs abordés dans le mémo de la salle.
        </div>
      </div>
    </div>
  );
}

// ================= ÉCRAN RÉCOMPENSE =================
function Recompense({ gain, onFiche, onNext }) {
  return (
    <div className="flex flex-col items-center p-8 text-center">
      <div className="mb-4 animate-bounce text-6xl">🧠</div>
      <h2 className="mb-2 text-3xl font-black text-white">Fragment de mémoire récupéré !</h2>
      <p className="mb-8 max-w-lg text-slate-400 italic">« {gain.fragment} »</p>
      <div className="mb-8 w-full max-w-md space-y-3">
        <div className="rounded-xl border border-cyan-400/40 bg-cyan-400/10 p-4 text-left">
          <p className="mb-1 text-sm font-bold text-white">📄 Fiche de révision débloquée</p>
          <p className="mb-3 text-sm text-slate-400">{gain.fiche} — conforme au programme, prête pour le brevet</p>
          <button onClick={onFiche} className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 hover:scale-105">📖 Ouvrir la fiche</button>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-left">
          <p className="text-sm text-slate-300">+{gain.xp} XP · Fragment ajouté au carnet · Prochain objectif : finir le palier</p>
        </div>
      </div>
      <button onClick={onNext} className="rounded-xl bg-cyan-400 px-8 py-3 font-bold text-slate-950 hover:scale-105">Épreuve suivante →</button>
    </div>
  );
}

// ================= ÉCRAN FICHE DE RÉVISION ==========
function Fiche({ ficheNom, onBack }) {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl">
        <button onClick={onBack} className="mb-4 text-sm text-slate-400 hover:text-white">← Retour</button>
        <div className="rounded-2xl bg-slate-100 p-8 text-slate-900 shadow-2xl">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-cyan-700">Fiche de révision · 4e · Physique-Chimie</p>
          <h2 className="mb-4 text-2xl font-black">{ficheNom || "Changements d'état & conservation de la masse"}</h2>
          <ul className="mb-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            <li>Les trois états de la matière : <b>solide, liquide, gaz</b>. Les changements d'état : fusion, solidification, vaporisation, liquéfaction.</li>
            <li>Lors d'un changement d'état, la <b>masse se conserve</b> : 0,92 kg de glace donnent 0,92 kg d'eau liquide.</li>
            <li>Le <b>volume, lui, change</b> : 1 L de glace fondue ne donne pas exactement 1 L d'eau liquide (0,92 L).</li>
            <li>Relation de la masse volumique (4e) : <b>m = ρ × V</b> — la masse volumique dépend de la température.</li>
            <li>La température de changement d'état est <b>constante</b> pour un corps pur (fusion de la glace : 0 °C).</li>
          </ul>
          <div className="rounded-lg border-l-4 border-cyan-600 bg-cyan-50 p-3 text-sm">
            <b>🧠 À retenir pour le brevet :</b> « Rien ne se perd, rien ne se crée » — lors d'une transformation, la masse totale se conserve.
          </div>
          <p className="mt-4 text-[10px] text-slate-400">Conforme au programme Cycle 4 — BOEN n° 31 du 30-07-2020 · Professeur Atome</p>
        </div>
      </div>
    </div>
  );
}

// ================= ÉCRAN CARNET DE PROGRESSION =================
function Carnet({ xp, frags, fiches, go }) {
  const niveau = Math.floor(xp / 300) + 1;
  const titres = ["Inconnu", "Stagiaire", "Chercheur", "Docteur", "Professeur Atome"];
  return (
    <div className="p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h2 className="mb-1 text-3xl font-black text-white">📖 Mon carnet de laboratoire</h2>
          <p className="text-slate-400">Ta progression, tes fragments et tes fiches de révision — tout au même endroit.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-bold text-white">Niveau {niveau} · {titres[niveau - 1] || "Professeur Atome"}</span>
            <span className="text-cyan-300">{xp} XP</span>
          </div>
          <Barre v={xp % 300} max={300} />
          <p className="mt-2 text-xs text-slate-500">{300 - (xp % 300)} XP avant le niveau suivant</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-3xl">🧠</p>
            <p className="text-xl font-black text-white">{frags}/12</p>
            <p className="text-xs text-slate-400">Fragments de mémoire</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-3xl">📄</p>
            <p className="text-xl font-black text-white">{fiches.length}/12</p>
            <p className="text-xs text-slate-400">Fiches de révision</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <p className="text-3xl">🏅</p>
            <p className="text-xl font-black text-white">0/5</p>
            <p className="text-xs text-slate-400">Badges d'aile</p>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-bold text-white">Fiches de révision débloquées</h3>
          {fiches.length === 0 ? (
            <p className="rounded-xl border border-dashed border-white/15 p-6 text-center text-sm text-slate-500">
              Aucune fiche pour l'instant. Termine une épreuve pour en débloquer une !
            </p>
          ) : (
            <div className="space-y-2">
              {fiches.map((f, i) => (
                <button key={i} onClick={() => go("fiche")} className="flex w-full items-center gap-3 rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-4 text-left hover:bg-cyan-400/10">
                  <span className="text-2xl">📄</span>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{f}</p>
                    <p className="text-xs text-slate-400">Conforme BOEN · prête pour le brevet</p>
                  </div>
                  <span className="text-cyan-300">→</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="mb-3 text-lg font-bold text-white">Fragments de mémoire collectés</h3>
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={`flex h-14 items-center justify-center rounded-xl border text-xl ${i < frags ? "border-cyan-400/40 bg-cyan-400/10" : "border-white/10 bg-white/[0.02] opacity-40"}`}>
                {i < frags ? "🧠" : "❔"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= ÉCRAN CONFORMITÉ =================
function Conformite() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h2 className="mb-1 text-3xl font-black text-white">🏛️ Conformité & reconnaissance État</h2>
          <p className="text-slate-400">Comment le site prouve son authenticité pédagogique.</p>
        </div>
        <div className="rounded-2xl border border-emerald-400/40 bg-emerald-400/5 p-6">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-emerald-400/50 bg-emerald-400/10 text-3xl">🏛️</div>
            <div>
              <p className="text-lg font-black text-white">« Conforme au programme officiel »</p>
              <p className="text-sm text-slate-400">Badge en pied de page : <b className="text-white">Cycle 4 · BOEN n° 31 du 30-07-2020</b>. Chaque épreuve renvoie à l'attendu exact du programme.</p>
            </div>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { t: "RGPD mineurs", d: "Pseudo sans données personnelles, pas de chat libre." },
            { t: "Zéro publicité", d: "Pas de monétisation par l'attention. Licences établissements." },
            { t: "Accessibilité", d: "Sous-titres, mode daltonien, temps réglable." },
          ].map((x) => (
            <div key={x.t} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-bold text-white">{x.t}</p>
              <p className="mt-1 text-xs text-slate-400">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ================= APP =================
export default function App() {
  const [ecran, setEcran] = useState("intro");
  const [xp, setXp] = useState(120);
  const [frags, setFrags] = useState(0);
  const [fiches, setFiches] = useState([]);
  const [gain, setGain] = useState(null);
  const go = (e) => setEcran(e);
  const niveau = Math.floor(xp / 300) + 1;

  const onWin = (g) => {
    setXp(xp + g.xp);
    setFrags(frags + 1);
    if (!fiches.includes(g.fiche)) setFiches([...fiches, g.fiche]);
    setGain(g);
    setEcran("recompense");
  };

  const exercices = {
    glacon: ExoGlacon, atome: ExoAtome, ph: ExoPh, circuit: ExoCircuit, planetes: ExoPlanetes, orage: ExoOrage,
  };
  const ExoActif = exercices[ecran];

  if (ecran === "intro") return <Intro onFinish={() => setEcran("accueil")} />;

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Nav page={ecran} go={go} xp={xp} frags={frags} niveau={niveau} />
      {ecran === "accueil" && <Accueil onStart={() => go("carte")} xp={xp} frags={frags} fiches={fiches} />}
      {ecran === "carte" && <Carte onEnter={() => go("palier")} />}
      {ecran === "palier" && <Palier onExo={go} />}
      {ecran === "carnet" && <Carnet xp={xp} frags={frags} fiches={fiches} go={go} />}
      {ecran === "conformite" && <Conformite />}
      {ecran === "recompense" && <Recompense gain={gain} onFiche={() => go("fiche")} onNext={() => go("palier")} />}
      {ecran === "fiche" && <Fiche ficheNom={gain?.fiche} onBack={() => go("recompense")} />}
      {ExoActif && <ExoActif onBack={() => go("palier")} onWin={onWin} />}
      <footer className="border-t border-white/10 p-6 text-center text-xs text-slate-500">
        Professeur Atome — maquette v3 · 🧪 60 épreuves · 55–80 h · ✅ Conforme au programme Cycle 4 (BOEN n° 31 du 30-07-2020) · 🔒 RGPD mineurs
      </footer>
    </div>
  );
}