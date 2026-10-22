# Gramadach IRS139

Grammar notes, learning techniques and **391 practice drills** covering the two IRS139
worksheets: *Réamhfhocail* (prepositions with nouns, adjectives and verbs) and
*Seachtain 3 — Téarmaí Nua* (gender and the article, the `á` construction, plural
adjectives, proverbs).

Static site, no build step, no dependencies.

## The four tabs

| Tab | What's in it |
|---|---|
| **Nótaí** | The grammar, organised as rules rather than lists: `ar` vs `ag`, the second-preposition table and the only two that don't match English, the full prepositional pronoun grid, the asking quartet, gender and the article, the `á` three-way rule, plural adjectives, the proverbs, a Munster/Ulster/Caighdeán table for the script, and the historical background. |
| **Modhanna** | Twelve learning techniques written for this specific material — the ten-year test, chanting the pronoun rows, substitution drills, making the mutation audible, reading the lenition before the gap, and a spacing schedule for a weekly sheet. |
| **Cleachtaí** | The drill engine. Pick any combination of topics and work through them. Every answer gets an explanation, and anything you get wrong goes into a **Laga** (weak) deck you can drill on its own. Per-topic progress is shown underneath. |
| **Tráth na gCeist** | A scored quiz, 10–30 questions, all topics or one. Misses are listed at the end. |

## The eleven drill topics

| Topic | Items | What it tests |
|---|---|---|
| Ar nó ag? | 44 | Does the feeling sit *on* you or *at* you |
| Ainmfhocal + réamhfhocal | 38 | `bród **as**`, `eagla **roimh**`, `imní **faoi**` … |
| Aidiacht + réamhfhocal | 21 | `bródúil as`, `buíoch de`, `ciontach i` … |
| Briathar + réamhfhocal | 44 | `fiafraigh de`, `iarr ar`, `teip ar` … |
| Forainmneacha réamhfhoclacha | 84 | `ar` + *sí* → `uirthi` — generated from the full grid |
| Bearnaí | 30 | The 30 gapped sentences from Tasc 3 |
| Inscne agus an t-alt | 24 | `an t-urlár` vs `an urlár` vs `an tsúil` |
| An ‘á’ | 16 | `á ól` / `á hól` / `á n-ól` |
| Aidiachtaí iolra | 18 | `fir mhaithe` vs `foclóirí breátha` |
| Aistriúchán | 42 | English → Irish, self-marked |
| Foclóir | 30 | Vocabulary from both sheets |

Preposition questions show the whole twelve-preposition bank rather than four options, so
you can't narrow it down by elimination. Prepositional-pronoun distractors are drawn from
the same preposition's own row, so they test the *person*, not just the preposition.

Progress is kept in the browser's local storage — it persists between visits on the same
device. **Athshocraigh** clears it.

## Running it

- **Locally:** open `index.html`.
- **GitHub Pages:** push these three files to a repo, then Settings → Pages → Deploy from
  a branch → `main` / root. It appears at `https://<user>.github.io/<repo>/`.

Either its own repo, or a subfolder of an existing one — it has no dependency on anything
outside these three files.

## Adding drills

Everything lives in `data.js`. Three item shapes:

```js
// choose from the twelve-preposition bank
{ t:"prep", topic:"verb", q:"fiafraigh ___", en:"ask a question of", a:"de",
  note:"Part of the asking quartet." }

// multiple choice with your own options
{ t:"mc", topic:"gender", q:"Urlár", en:"put the article on it",
  a:"an t-urlár", opts:["an t-urlár","an urlár","an turlár","an hurlár"],
  note:"Masculine. Vowel-initial masculine nouns take <i>t-</i>." }

// reveal and mark yourself
{ t:"rev", topic:"trans", q:"I have a cold.", a:"Tá slaghdán orm.",
  note:"Illnesses take <i>ar</i>, like feelings." }
```

`note` accepts simple HTML (`<b>`, `<i>`). Topic counts, chips, decks and the quiz all
rebuild from the array — nothing else needs touching. To add a topic, add a key to
`TOPICS` at the top of the file.

The prepositional-pronoun drills are **generated** from the `PRONTABLE` object, so
correcting a form there fixes it everywhere at once.

## A note on accuracy

Answers follow the class sheets. Grammar explanations and background were added as a study
aid. Two places where the sheet looks to have a slip are flagged in the drill notes
themselves — `lean sé ___ obair` in Tasc 3 is ambiguous as written, and the Plantation of
Ulster is 17th century, not 19th. Worth confirming either with your lecturer.

## Files

```
index.html   the whole app — markup, styles, logic
data.js      the drill bank
README.md    this file
```
