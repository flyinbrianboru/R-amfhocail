/* ------------------------------------------------------------------
   Gramadach IRS139 — drill data
   ------------------------------------------------------------------
   Covers the two worksheets: Réamhfhocail (prepositions with nouns,
   adjectives and verbs) and Seachtain 3 Téarmaí Nua (gender, the 'á'
   construction, plural adjectives, proverbs).

   Item shapes:
     {t:"prep",  topic, q, en, a, note}   choose from the preposition bank
     {t:"mc",    topic, q, en, a, opts, note}   multiple choice
     {t:"rev",   topic, q, a, note}       reveal and self-mark

   Add items by pushing more objects onto ITEMS. Topic counts, decks
   and the quiz all rebuild themselves.
   ------------------------------------------------------------------ */

const TOPICS = {
  arag:   { name: "Ar nó ag?",              en: "Does it sit on you or at you?" },
  noun:   { name: "Ainmfhocal + réamhfhocal", en: "Noun + preposition" },
  adj:    { name: "Aidiacht + réamhfhocal",   en: "Adjective + preposition" },
  verb:   { name: "Briathar + réamhfhocal",   en: "Verb + preposition" },
  pron:   { name: "Forainmneacha réamhfhoclacha", en: "Prepositional pronouns" },
  gap:    { name: "Bearnaí",                en: "Gapped sentences (Tasc 3)" },
  gender: { name: "Inscne agus an t-alt",   en: "Gender and the article" },
  aa:     { name: "An ‘á’",                 en: "The á construction" },
  pladj:  { name: "Aidiachtaí iolra",       en: "Plural adjectives" },
  trans:  { name: "Aistriúchán",            en: "Translation (self-marked)" },
  vocab:  { name: "Foclóir",                en: "Vocabulary" },
};

const PREPBANK = ["ag", "ar", "le", "do", "de", "ó", "faoi", "i", "as", "roimh", "chuig", "thar"];

/* Prepositional pronoun table — drills are generated from this */
const PRONTABLE = {
  ag:    ["agam", "agat", "aige", "aici", "againn", "agaibh", "acu"],
  ar:    ["orm", "ort", "air", "uirthi", "orainn", "oraibh", "orthu"],
  le:    ["liom", "leat", "leis", "léi", "linn", "libh", "leo"],
  do:    ["dom", "duit", "dó", "di", "dúinn", "daoibh", "dóibh"],
  de:    ["díom", "díot", "de", "di", "dínn", "díbh", "díobh"],
  "ó":   ["uaim", "uait", "uaidh", "uaithi", "uainn", "uaibh", "uathu"],
  faoi:  ["fúm", "fút", "faoi", "fúithi", "fúinn", "fúibh", "fúthu"],
  i:     ["ionam", "ionat", "ann", "inti", "ionainn", "ionaibh", "iontu"],
  as:    ["asam", "asat", "as", "aisti", "asainn", "asaibh", "astu"],
  roimh: ["romham", "romhat", "roimhe", "roimpi", "romhainn", "romhaibh", "rompu"],
  chuig: ["chugam", "chugat", "chuige", "chuici", "chugainn", "chugaibh", "chucu"],
  thar:  ["tharam", "tharat", "thairis", "thairsti", "tharainn", "tharaibh", "tharstu"],
};
const PERSONS = ["mé", "tú", "sé", "sí", "muid", "sibh", "siad"];

const ITEMS = [];

/* ============ AR NÓ AG? ============ */
[
  ["ocras", "hungry", "ar"], ["tart", "thirsty", "ar"], ["tuirse", "tired", "ar"],
  ["codladh", "sleepy", "ar"], ["deifir", "in a hurry", "ar"], ["eagla", "afraid", "ar"],
  ["fearg", "angry", "ar"], ["náire", "ashamed", "ar"], ["brón", "sorry", "ar"],
  ["áthas", "happy", "ar"], ["imní", "worried", "ar"], ["ionadh", "surprised", "ar"],
  ["lúcháir", "delighted", "ar"], ["bród", "proud", "ar"], ["éad", "jealous", "ar"],
  ["faitíos", "afraid, nervous", "ar"], ["fonn", "in the mood", "ar"],
  ["slaghdán", "a cold", "ar"], ["tinneas", "illness", "ar"], ["biseach", "recovery", "ar"],
  ["meas", "respect", "ag"], ["cion", "affection", "ag"], ["gean", "affection", "ag"],
  ["grá", "love", "ag"], ["gráin", "hatred", "ag"], ["fuath", "hatred", "ag"],
  ["dúil", "fondness", "ag"], ["suim", "interest", "ag"], ["spéis", "interest", "ag"],
  ["muinín", "trust", "ag"], ["iontaoibh", "trust", "ag"], ["dóchas", "hope", "ag"],
  ["aithne", "acquaintance", "ag"], ["eolas", "knowledge", "ag"], ["cuimhne", "memory", "ag"],
  ["gaol", "kinship", "ag"], ["trua", "pity", "ag"], ["coinne", "an appointment", "ag"],
  ["súil", "expectation", "ag"], ["beann", "regard", "ag"], ["ceist", "a question", "ag"],
  ["punt", "a pound owed", "ag"], ["teacht", "access", "ag"], ["bá", "sympathy", "ag"],
].forEach(([w, en, a]) => ITEMS.push({
  t: "mc", topic: "arag", q: "Tá " + w + " ___ …", en,
  a: a === "ar" ? "ar (orm, ort, air…)" : "ag (agam, agat, aige…)",
  opts: ["ar (orm, ort, air…)", "ag (agam, agat, aige…)"],
  note: a === "ar"
    ? "Weather. It comes over you and it passes, so it sits <b>on</b> you."
    : "A possession. You hold it steadily, so it is <b>at</b> you. The ten-year test: could this be true of you for ten years?",
}));

/* ============ AINMFHOCAL + RÉAMHFHOCAL ============ */
[
  ["aithne ag X ___ Y", "to know a person", "ar", "Tá aithne agam <b>ar</b> Sheán. Knowing a <i>person</i>; <i>eolas ar</i> is knowing a subject."],
  ["amhras ar X ___ Y", "doubtful about", "faoi", "Tá amhras orm <b>faoi</b> sin. The <i>ag … ar</i> version instead means suspecting a person."],
  ["amhras ag X ___ Y", "to suspect someone", "ar", "Tá amhras agam <b>air</b>."],
  ["áthas ar X ___ Y", "happy about", "faoi", "<i>Faoi</i> = about. English matches."],
  ["bá ag X ___ Y", "sympathy for", "do", "Tá bá agam <b>dóibh</b>. <i>Bá le</i> is also widely used."],
  ["beann ag X ___ Y", "regard for, heed of", "ar", "Almost always negative: <i>níl beann agam <b>air</b></i> = I have no time for him."],
  ["bród ar X ___ Y", "proud of", "as", "One of the two that don’t match English. Think “<i>out of</i>” — the pride is made out of the thing."],
  ["brón ar X ___ Y", "sorry about", "faoi", "<i>Faoi</i> = about."],
  ["ceist ag X ___ Y", "to have a question for", "ar", "Tá ceist agam <b>ort</b>."],
  ["cion ag X ___ Y", "fond of", "ar", "Tá cion agam <b>air</b>. Affection is aimed onto a person."],
  ["coinne ag X ___ Y", "an appointment with", "le", "Tá coinne agam <b>leis</b> ar a trí. Also <i>gan choinne</i> = unexpectedly."],
  ["cuimhne ag X ___ Y", "to remember", "ar", "Tá cuimhne agam <b>air</b>."],
  ["dóchas ag X ___ Y", "hope in", "as", "Same <i>as</i> as the trust words — <i>muinín as, iontaoibh as</i>."],
  ["dúil ag X ___ Y", "fond of, keen on", "i", "Tá dúil agam <b>ann</b>. <i>I</i> = in, matching English “keen on / into”."],
  ["éad ar X ___ Y", "jealous of", "le", "<i>Le</i> because jealousy needs a second party."],
  ["eagla ar X ___ Y", "afraid of", "roimh", "The second of the two that don’t match English. <i>Roimh</i> = before, in front of — you face what’s coming."],
  ["eolas ag X ___ Y", "knowledge of a subject", "ar", "Tá eolas aige <b>ar</b> an stair."],
  ["fáilte ___ X", "welcome", "roimh", "Tá fáilte <b>romhat</b>. Same posture as fear: facing something arriving, but greeting it."],
  ["fearg ar X ___ Y", "angry with", "le", "<i>Le</i> = with. English matches."],
  ["faitíos ar X ___ Y", "afraid, nervous of", "roimh", "Milder than <i>eagla</i> — nervousness as much as fear."],
  ["fuath ag X ___ Y", "hatred of", "do", "Tá fuath agam <b>dó</b>. Also the copula: <i>is fuath liom é</i>."],
  ["gaol ag X ___ Y", "related to", "le", "Tá gaol agam <b>leis</b>."],
  ["gean ag X ___ Y", "affection for", "ar", "Tá gean agam <b>air</b>."],
  ["grá ag X ___ Y", "love for", "do", "Tá grá agam <b>duit</b>. A held disposition (<i>ag</i>) pointed at a person (<i>do</i>)."],
  ["gráin ag X ___ Y", "hatred of", "ar", "Tá an ghráin agam <b>air</b>. Same shape as <i>meas ag … ar</i> — both are held and aimed."],
  ["imní ar X ___ Y", "worried about", "faoi", "<i>Faoi</i> = about."],
  ["ionadh ar X ___ Y", "surprised at", "faoi", "<i>Iontas</i> is the Ulster-leaning variant, same preposition."],
  ["iontaoibh ag X ___ Y", "trust in", "as", "Níl iontaoibh ar bith agam <b>as</b>."],
  ["lúcháir ar X ___ Y", "delighted at", "faoi", "Stronger than <i>áthas</i>."],
  ["meas ag X ___ Y", "respect for", "ar", "Tá meas agam <b>uirthi</b>. Respect is directed onto someone."],
  ["muinín ag X ___ Y", "trust in", "as", "Also <i>dul i muinín ruda</i> = to fall back on something, which turns up in the Téarmaí Nua passage."],
  ["náire ar X ___ Y", "ashamed of (a person)", "le", "Tá náire orm <b>leat</b>. For a <i>deed</i> it is <i>as</i>: <i>náire as an rud a rinne sé</i>."],
  ["punt ag X ___ Y", "to be owed a pound", "ar", "Tá punt agam <b>ort</b> — a debt sits on the debtor."],
  ["spéis ag X ___ Y", "interest in", "i", "English matches: interested <i>in</i>."],
  ["súil ag X ___ Y", "to expect, hope for", "le", "Tá súil agam <b>leis</b>. <i>Súil</i> is an eye — you have your eye on it."],
  ["suim ag X ___ Y", "interest in", "i", "<i>Suim</i> also means a sum."],
  ["trua ag X ___ Y", "pity for", "do", "Tá trua agam <b>duit</b>. Note <i>do</i>, not <i>ar</i>."],
  ["teacht ag X ___ Y", "access to", "ar", "Tá teacht againn <b>orthu</b> go héasca — straight out of the Téarmaí Nua script."],
].forEach(([q, en, a, note]) => ITEMS.push({ t: "prep", topic: "noun", q, en, a, note }));

/* ============ AIDIACHT + RÉAMHFHOCAL ============ */
[
  ["bréan ___", "sick of, fed up with", "de", "Tá mé bréan <b>den</b> ghramadach. <i>Bréan</i> on its own = rotten, foul-smelling."],
  ["bródúil ___", "proud of", "as", "Keeps the preposition of its noun, <i>bród as</i>. Learn one, get both."],
  ["buíoch ___", "grateful to", "de", "Tá mé buíoch <b>díot</b>."],
  ["buartha ___", "worried about", "faoi", "From <i>imní faoi</i>."],
  ["ceanúil ___", "fond of", "ar", "From <i>cion ar</i>."],
  ["ciontach ___", "guilty of", "i", "Bhí sé ciontach <b>sa</b> choir — <i>i</i> + <i>an</i> = <i>sa</i>, which lenites."],
  ["cleachta ___", "used to, accustomed to", "le", "From <i>cleachtadh</i>, practice."],
  ["cothrom ___", "level with", "le", "Also <i>cothrom na Féinne</i> = fair play."],
  ["dílis ___", "loyal to", "do", "<i>Dílseacht</i> = loyalty; <i>Dílseoir</i> = Loyalist."],
  ["eolach ___", "knowledgeable about", "ar", "From <i>eolas ar</i>."],
  ["fóirsteanach ___", "suitable for", "do", "Ulster; the standard word is <i>oiriúnach</i>, same preposition."],
  ["geallmhar ___", "fond of, addicted to", "ar", "Tá sé geallmhar <b>ar</b> an ól."],
  ["lán ___", "full of", "de", "<i>De</i> lenites: <i>lán de dhathanna áille</i>."],
  ["mórálach ___", "proud of", "as", "Carries a hint of boastfulness that <i>bródúil</i> doesn’t."],
  ["oiriúnach ___", "suitable for", "do", "The standard counterpart of <i>fóirsteanach</i>."],
  ["réidh ___", "finished with", "le", "<i>Réidh</i> also means ready, and smooth."],
  ["riachtanach ___", "necessary for", "do", "<i>Riachtanas</i> = a requirement."],
  ["saor ___", "free from", "ó", "Níl duine ar bith saor <b>ón</b> mhilleán. Also <i>saor in aisce</i> = free of charge."],
  ["sásta ___", "happy with", "le", "English matches."],
  ["tugtha ___", "given to, addicted to", "do", "Literally “given over to”."],
  ["tuirseach ___", "tired of, sick of", "de", "Careful: <i>tuirseach de</i> = sick of it; <i>tuirse orm</i> = physically tired."],
].forEach(([q, en, a, note]) => ITEMS.push({ t: "prep", topic: "adj", q, en, a, note }));

/* ============ BRIATHAR + RÉAMHFHOCAL ============ */
[
  ["abair ___", "say to", "le", "You <i>say to</i> with <i>le</i>; you <i>tell</i> with <i>inis do</i>."],
  ["áitigh ___", "urge, persuade", "ar", "D’áitigh sí <b>orm</b> fanacht."],
  ["bain ___", "take off, take from", "de", "Bhain sé <b>de</b> a chóta."],
  ["bain ___", "to concern, to happen to", "do", "Ní bhaineann sé <b>duit</b> = it’s none of your business."],
  ["bain ___", "to settle, to stay", "faoi", "Bhain sé <b>faoi</b> i mBéal Feirste."],
  ["beannaigh ___", "greet", "do", "Bheannaigh sé <b>dom</b> ar an tsráid."],
  ["beir ___", "catch, grab", "ar", "Rug sí <b>ar</b> an liathróid. <i>Beir</i> never takes a bare object."],
  ["buaigh ___", "defeat, beat", "ar", "Bhuaigh siad <b>orainn</b>."],
  ["buail ___", "meet", "le", "Ulster prefers <i>cas ar</i>."],
  ["caith ___", "throw to", "chuig", "Chaith sé an liathróid <b>chugam</b>."],
  ["caith ___", "treat (in a way)", "le", "Caitheadh go holc <b>leo</b>."],
  ["cas ___", "meet by chance", "ar", "Casadh <b>orm</b> é sa tsiopa — Ulster. Literally “he was turned onto me”."],
  ["crom ___", "set about, start on", "ar", "<i>Crom</i> = to bend, so you bend to the task."],
  ["cuidigh / cabhraigh ___", "help", "le", "Ulster <i>cuidigh</i>; standard <i>cabhraigh</i>."],
  ["cuimhnigh ___", "remember, think of", "ar", "Cuimhnigh <b>ar</b> an lá sin."],
  ["cuir ___", "put on (clothes)", "ar", "Chuir sí a hata <b>uirthi</b> — Irish puts the clothes on the wearer."],
  ["éirigh ___", "succeed", "le", "D’éirigh go maith <b>leis</b>. Literally “it rose with him”."],
  ["éist ___", "listen to", "le", "English matches."],
  ["fan ___", "wait for", "le", "Ní fhanann trá <b>le</b> fear mall."],
  ["féach / amharc ___", "look at", "ar", "Ulster <i>amharc ar</i>, Connacht <i>breathnaigh ar</i>, Munster <i>féach ar</i>."],
  ["fiafraigh ___", "ask a question of", "de", "D’fhiafraigh mé <b>den</b> bhean … Part of the asking quartet."],
  ["fóir ___", "suit; help, relieve", "ar", "Ní fhóireann an dath sin <b>duit</b> — also found with <i>do</i>."],
  ["geall ___", "promise to", "do", "Gheall mé <b>do</b> Shíle — <i>do</i> lenites the name."],
  ["géill ___", "yield to, submit to", "do", "Caithfidh tú géilleadh uaireanta — the line the Téarmaí Nua script turns on."],
  ["glaoigh ___", "call, phone", "ar", "Ulster <i>scairt ar</i>."],
  ["iarr ___", "ask someone to do something", "ar", "D’iarr mé <b>air</b> teacht."],
  ["impigh ___", "implore", "ar", "D’impigh sí <b>orm</b> fanacht."],
  ["inis ___", "tell", "do", "D’inis sé scéal <b>don</b> rang."],
  ["íoc ___", "pay for", "as", "Ar íoc tú <b>as</b> na ticéid?"],
  ["lean ___", "continue with, persist in", "de", "Lean sé <b>den</b> obair. Also <i>lean le</i>."],
  ["lig ___", "allow, let", "do", "Ligeadh <b>dom</b> dul amach."],
  ["mol ___", "advise, recommend to", "do", "Without <i>do</i>, <i>mol</i> means praise: <i>mhol sí mé</i> vs <i>mhol sí dom</i>."],
  ["scairt ___", "call, shout to", "ar", "Ulster."],
  ["scríobh ___", "write to", "chuig", "<i>Chuig</i> is the preposition of sending."],
  ["taispeáin ___", "show to", "do", "Taispeáin <b>dom</b> é."],
  ["taitin ___", "to please, to be liked by", "le", "Taitníonn sé <b>liom</b> = I like it. The thing is the subject, not you."],
  ["tar ___", "come upon, find", "ar", "Tháinig mé <b>ar</b> an leabhar."],
  ["tar ___", "to suit (of clothes)", "do", "Tagann an gúna sin <b>duit</b>."],
  ["tar ___", "agree with, get on with", "le", "Ní thagaim <b>leat</b> = I don’t agree with you."],
  ["teastaigh ___", "to be wanted by, to need", "ó", "Cad é atá ag teastáil <b>uait</b>? Ulster often prefers <i>de dhíth ar</i>."],
  ["teip ___", "to fail", "ar", "Theip <b>orm</b> sa scrúdú — the failure lands on you."],
  ["tit ___", "fall off", "de", "Thit sé <b>den</b> chrann."],
  ["tosaigh ___", "begin", "ar", "Ulster <i>toisigh</i>."],
  ["tuirling ___", "alight from, get off", "de", "Thuirling sí <b>den</b> bhus."],
].forEach(([q, en, a, note]) => ITEMS.push({ t: "prep", topic: "verb", q, en, a, note }));

/* ============ FORAINMNEACHA RÉAMHFHOCLACHA (generated) ============ */
Object.keys(PRONTABLE).forEach((prep) => {
  PRONTABLE[prep].forEach((form, i) => {
    const same = PRONTABLE[prep].filter((f) => f !== form);
    const other = Object.keys(PRONTABLE).filter((p) => p !== prep)
      .map((p) => PRONTABLE[p][i]).filter((f) => f !== form);
    const opts = [form, same[(i + 1) % same.length], same[(i + 3) % same.length], other[i % other.length]];
    ITEMS.push({
      t: "mc", topic: "pron",
      q: "<b>" + prep + "</b> + <i>" + PERSONS[i] + "</i>",
      en: "prepositional pronoun",
      a: form, opts,
      note: "Full row: " + PRONTABLE[prep].join(", ") + ". Emphatic forms add <i>-sa / -se / -san / -sean</i>.",
    });
  });
});

/* ============ BEARNAÍ (Tasc 3) ============ */
[
  ["Nuair a tháinig sé abhaile ón scoil chrom sé ___ a chuid oibre.", "ar", ["ar", "le", "do", "de"], "<i>crom ar</i> = set about."],
  ["Mhol an múinteoir ___ na páistí gan rith.", "do", ["do", "ar", "le", "as"], "<i>mol do</i> = advise. Without <i>do</i> it would mean the teacher praised them."],
  ["Taitníonn spórt ___ Pól agus ___ Tómas.", "le", ["le", "ar", "do", "ó"], "<i>taitin le</i>. The sport is the subject; the people are the ones pleased."],
  ["Níor éirigh ___ na buachaillí an ceacht a chríochnú.", "leis", ["leis", "le", "orthu", "díobh"], "<i>éirigh le</i>; <i>le</i> + <i>na</i> = <i>leis na</i>."],
  ["Chuir Máire a hata ___ agus d’imigh sí amach.", "uirthi", ["uirthi", "uirthe", "aici", "léi"], "<i>cuir ar</i> = put on. Irish puts the clothes on the wearer."],
  ["Iarr ___ na cailíní an teachtaireacht a dhéanamh.", "ar", ["ar", "do", "de", "le"], "<i>iarr ar</i> = ask someone to do something."],
  ["Rug Siún ___ an liathróid.", "ar", ["ar", "le", "as", "chuig"], "<i>beir ar</i> = catch."],
  ["An raibh tú ag amharc ___ an teilifís aréir?", "ar", ["ar", "le", "chuig", "i"], "<i>amharc ar</i> (Ulster) / <i>féach ar</i>."],
  ["Cad é mar a d’éirigh ___ sa scrúdú, a Thómais?", "leat", ["leat", "ort", "duit", "díot"], "<i>éirigh le</i>, 2nd singular."],
  ["D’fhiafraigh mé ___ bhean an bhfaca sí mo mhála.", "den", ["den", "ón", "leis an", "ar an"], "<i>fiafraigh de</i>. The lenition on <i>bhean</i> is the giveaway."],
  ["Bhain siad ___ a ngeansaithe.", "díobh", ["díobh", "dóibh", "orthu", "astu"], "<i>bain de</i> = take off. <i>De</i> + siad = <i>díobh</i>."],
  ["Thit na buachaillí ___ chrann.", "den", ["den", "ón", "ar an", "as an"], "<i>tit de</i>. The lenition on <i>chrann</i> points to <i>den</i>."],
  ["Bhí mé ag éisteacht ___ an raidió ar maidin.", "leis", ["leis", "le", "ar", "chuig"], "<i>éist le</i>; <i>le</i> + <i>an</i> = <i>leis an</i>."],
  ["Cuidím ___ seandaoine gach deireadh seachtaine.", "le", ["le", "ar", "do", "as"], "<i>cuidigh le</i> (Ulster) / <i>cabhraigh le</i>."],
  ["“Buailfidh mé ___ anocht, a Phóil” arsa Seán.", "leat", ["leat", "ort", "duit", "chugat"], "<i>buail le</i> = meet."],
  ["D’inis an múinteoir scéal ___ rang.", "don", ["don", "ar an", "leis an", "chuig an"], "<i>inis do</i>; <i>do</i> + <i>an</i> = <i>don</i>."],
  ["Thug an t-athair airgead ___ na páistí.", "do", ["do", "ar", "chuig", "le"], "<i>tabhair do</i>."],
  ["“Taispeáin ___ an leabhar” arsa an múinteoir.", "dom", ["dom", "orm", "liom", "chugam"], "<i>taispeáin do</i>."],
  ["Scríobh sé litir ___ na buachaillí.", "chuig", ["chuig", "do", "le", "ar"], "<i>scríobh chuig</i> — the preposition of sending."],
  ["Chaith sé an liathróid ___ an mhadadh.", "chuig", ["chuig", "ar", "le", "do"], "<i>caith chuig</i> = throw to. Standard: <i>chuig an madadh</i> — d and t never mutate after <i>an</i>."],
  ["Cad é atá ag teastáil ___, a bhuachaillí?", "uaibh", ["uaibh", "uait", "oraibh", "daoibh"], "<i>teastaigh ó</i>; <i>ó</i> + sibh = <i>uaibh</i>. Plural address."],
  ["Ar íoc tú ___ na ticéid go fóill?", "as", ["as", "ar", "le", "faoi"], "<i>íoc as</i> = pay for."],
  ["Fuair mé cárta ___ Roibéard.", "ó", ["ó", "as", "de", "chuig"], "<i>faigh ó</i> = get from."],
  ["Tháinig tuirse ___ Sheán.", "ar", ["ar", "ag", "le", "do"], "<i>tuirse ar</i>, with <i>tháinig</i> for “came over / became”."],
  ["Dúirt sé ___ an mhúinteoir go raibh tinneas air.", "leis", ["leis", "le", "don", "ar an"], "<i>abair le</i>. The sheet already lenites <i>mhúinteoir</i>, marking it as Ulster."],
  ["Gheall mé ___ Shíle go mbeinn ann.", "do", ["do", "ar", "le", "chuig"], "<i>geall do</i>; <i>do</i> lenites the name."],
  ["Sílim go dtagann an gúna sin ___, a Dheirdre.", "duit", ["duit", "leat", "ort", "chugat"], "<i>tar do</i> = to suit. Nothing to do with coming."],
  ["“Theip ___ sa scrúdú,” arsa Liam.", "orm", ["orm", "liom", "dom", "agam"], "<i>teip ar</i>. The failure lands on you, which is kinder than the English."],
  ["Ligeadh ___ dul amach nuair a bhí mo chuid oibre críochnaithe agam.", "dom", ["dom", "orm", "liom", "agam"], "<i>lig do</i> = allow. <i>Ligeadh</i> is the past autonomous — unlenited, with no <i>d’</i>."],
  ["Cé go raibh tuirse ar Sheán lean sé ___ obair.", "ag", ["ag", "de", "le", "ar"], "<i>lean ag</i> + verbal noun = kept working. If the listed <i>lean de / le</i> was intended, it needs an article: <i>lean sé den obair</i>."],
].forEach(([q, a, opts, note]) => ITEMS.push({ t: "mc", topic: "gap", q, en: "fill the gap", a, opts, note }));

/* ============ INSCNE AGUS AN T-ALT ============ */
[
  ["Urlár", "an t-urlár", ["an t-urlár", "an urlár", "an turlár", "an hurlár"], "Masculine. Vowel-initial masculine nouns take <i>t-</i>."],
  ["Paróiste", "an paróiste", ["an paróiste", "an pharóiste", "an bparóiste", "an tparóiste"], "Masculine. Ends in a vowel, so nothing shows — a dictionary word."],
  ["Leabharlann", "an leabharlann", ["an leabharlann", "an lleabharlann", "an tleabharlann", "an bhleabharlann"], "Feminine (the <i>-lann</i> suffix). <i>L</i> never lenites, so nothing shows. The genitive gives it away: <i>na leabharlainne</i>."],
  ["Anlann", "an t-anlann", ["an t-anlann", "an anlann", "an hanlann", "an nanlann"], "Masculine — the trap. The <i>-lann</i> here is not the suffix, it is <i>an</i> + <i>lann</i>. Compare <i>leabharlann</i>."],
  ["Laige", "an laige", ["an laige", "an lage", "an tlaige", "an bhlaige"], "Feminine, an abstract noun in <i>-e</i> from <i>lag</i>. Feminine + vowel-free <i>l</i> = no change."],
  ["Guthán", "an guthán", ["an guthán", "an ghuthán", "an nguthán", "an t-guthán"], "Masculine (<i>-án</i>). From <i>guth</i>, a voice."],
  ["Altra", "an t-altra", ["an t-altra", "an altra", "an haltra", "an naltra"], "Masculine, and stays masculine whatever the nurse’s sex. Grammatical gender is not biological."],
  ["Sliabh", "an sliabh", ["an sliabh", "an tsliabh", "an shliabh", "an t-sliabh"], "Masculine — and masculine <i>s-</i> words take no <i>ts</i> in the nominative. That rule is for feminine nouns."],
  ["Muinín", "an mhuinín", ["an mhuinín", "an muinín", "an t-muinín", "an bhmuinín"], "Feminine, so lenition. Turns up again in the passage: <i>dul i muinín an chódmheasctha</i>."],
  ["Ultais", "an Ultais", ["an Ultais", "an tUltais", "an hUltais", "an nUltais"], "Feminine, like other language names in <i>-is</i>. Feminine + vowel = no change."],
  ["Aiste", "an aiste", ["an aiste", "an t-aiste", "an haiste", "an naiste"], "Feminine in the Caighdeán — the whole point of the Téarmaí Nua script. Mícheál says <i>an t-aiste</i>, which is the dialect form."],
  ["Súil", "an tsúil", ["an tsúil", "an súil", "an shúil", "an t-súil"], "Feminine + <i>s</i> before a vowel = <i>ts</i>, pronounced as a plain t."],
  ["Slí", "an tslí", ["an tslí", "an slí", "an shlí", "an t-slí"], "Feminine + <i>sl</i> = <i>ts</i>. The <i>ts</i> rule covers s + vowel, sl, sn, sr."],
  ["Scoil", "an scoil", ["an scoil", "an tscoil", "an schoil", "an bhscoil"], "Feminine, but <i>sc-</i> is not in the <i>ts</i> list. Only s + vowel, sl, sn, sr take it."],
  ["Gramadach", "an ghramadach", ["an ghramadach", "an gramadach", "an ngramadach", "an t-gramadach"], "Feminine (<i>-ach</i> abstract). Lenition."],
  ["Canúint", "an chanúint", ["an chanúint", "an canúint", "an gcanúint", "an tcanúint"], "Feminine (<i>-úint</i>)."],
  ["Caighdeán", "an caighdeán", ["an caighdeán", "an chaighdeán", "an gcaighdeán", "an t-caighdeán"], "Masculine (<i>-án</i>). No change after <i>an</i>."],
  ["Foclóir", "an foclóir", ["an foclóir", "an fhoclóir", "an bhfoclóir", "an t-foclóir"], "Masculine (<i>-óir</i> agent-type ending)."],
  ["Téarma", "an téarma", ["an téarma", "an théarma", "an dtéarma", "an t-téarma"], "Masculine. <i>T</i> never changes after <i>an</i> anyway."],
  ["Deoch", "an deoch", ["an deoch", "an dheoch", "an ndeoch", "an t-deoch"], "Feminine — but <i>d</i> never mutates after <i>an</i>, so nothing shows. You need <i>á hól</i> to prove it."],
  ["Obair", "an obair", ["an obair", "an t-obair", "an hobair", "an nobair"], "Feminine + vowel = no change. Compare <i>an t-urlár</i>, masculine."],
  ["Bruitíneach", "an bhruitíneach", ["an bhruitíneach", "an bruitíneach", "an mbruitíneach", "an t-bruitíneach"], "Feminine — diseases generally are. <i>Chuala mé go bhfuil an bhruitíneach ort.</i>"],
  ["Seanfhocal", "an seanfhocal", ["an seanfhocal", "an tseanfhocal", "an sheanfhocal", "an t-seanfhocal"], "Masculine. But in the <i>genitive</i> it does take <i>ts</i>: <i>úsáid an tseanfhocail</i>, as in the script."],
  ["Mír", "an mhír", ["an mhír", "an mír", "an mbír", "an t-mír"], "Feminine. <i>Éist leis an mhír fuaime</i> — Ulster lenites after <i>leis an</i> too."],
].forEach(([q, a, opts, note]) => ITEMS.push({ t: "mc", topic: "gender", q, en: "put the article on it", a, opts, note }));

/* ============ AN 'Á' ============ */
[
  ["Tá rialacha ___ (foghlaim).", "á bhfoghlaim", ["á bhfoghlaim", "á foghlaim", "á fhoghlaim", "á n-foghlaim"], "Plural → eclipsis. <i>f</i> → <i>bhf</i>."],
  ["Tá an obair ___ (déanamh).", "á déanamh", ["á déanamh", "á dhéanamh", "á ndéanamh", "á hdéanamh"], "<i>Obair</i> is <b>feminine</b> → no mutation. Writing <i>á dhéanamh</i> here would make the work masculine."],
  ["Bhí an teach ___ (péinteáil).", "á phéinteáil", ["á phéinteáil", "á péinteáil", "á bpéinteáil", "á fhéinteáil"], "<i>Teach</i> is masculine → lenition. The tense is in the <i>bhí</i>."],
  ["Tá na curiarrachtaí ___ (briseadh).", "á mbriseadh", ["á mbriseadh", "á bhriseadh", "á briseadh", "á n-briseadh"], "Plural → eclipsis."],
  ["Tá na geataí ___ (oscailt).", "á n-oscailt", ["á n-oscailt", "á hoscailt", "á oscailt", "á t-oscailt"], "Plural + vowel-initial verbal noun → <i>n-</i>."],
  ["Tá deoch ___ (ól).", "á hól", ["á hól", "á ól", "á n-ól", "á thól"], "<i>Deoch</i> is <b>feminine</b> + vowel-initial → <i>h</i>. The textbook demonstration."],
  ["Tá airgead agus am ___ (caitheamh).", "á gcaitheamh", ["á gcaitheamh", "á chaitheamh", "á caitheamh", "á n-caitheamh"], "Two things → plural → eclipsis, even though each noun is singular."],
  ["Tá an ghramadach ___ (foghlaim) ag cách.", "á foghlaim", ["á foghlaim", "á fhoghlaim", "á bhfoghlaim", "á hfoghlaim"], "<i>Gramadach</i> is feminine → no mutation. The agent is named with <i>ag</i>."],
  ["Tá an t-arán ___ (ithe).", "á ithe", ["á ithe", "á hithe", "á n-ithe", "á thithe"], "<i>Arán</i> is masculine + vowel-initial → no change at all."],
  ["Tá an eaglais ___ (tógáil).", "á tógáil", ["á tógáil", "á thógáil", "á dtógáil", "á htógáil"], "<i>Eaglais</i> is feminine → no mutation."],
  ["Tá na tithe ___ (tógáil).", "á dtógáil", ["á dtógáil", "á thógáil", "á tógáil", "á n-tógáil"], "Plural → eclipsis: <i>t</i> → <i>dt</i>."],
  ["Tá an carr ___ (glanadh).", "á ghlanadh", ["á ghlanadh", "á glanadh", "á nglanadh", "á n-glanadh"], "<i>Carr</i> is masculine → lenition."],
  ["Tá an fhuinneog ___ (briseadh).", "á briseadh", ["á briseadh", "á bhriseadh", "á mbriseadh", "á hbriseadh"], "<i>Fuinneog</i> is feminine (<i>-eog</i>) → no mutation."],
  ["Tá an aiste ___ (scríobh) agat.", "á scríobh", ["á scríobh", "á scríobh (lenited)", "á sscríobh", "á dscríobh"], "<i>Aiste</i> is feminine → no mutation; and <i>s</i> has no eclipsis anyway. Straight from the script."],
  ["Tá an pressure cooker ___ (lorg) aici.", "á lorg", ["á lorg", "á lorg (lenited)", "á nlorg", "á hlorg"], "Masculine here, and <i>l</i> never lenites. From Tasc 5 of the Téarmaí Nua sheet."],
  ["Níor chuala aon rud eile ___ (tabhairt) air.", "á thabhairt", ["á thabhairt", "á tabhairt", "á dtabhairt", "á n-tabhairt"], "Masculine singular → lenition. The first <i>á</i> in the script."],
].forEach(([q, a, opts, note]) => ITEMS.push({ t: "mc", topic: "aa", q, en: "being done — pick the right form", a, opts, note }));

/* ============ AIDIACHTAÍ IOLRA ============ */
[
  ["fir + maith", "fir mhaithe", ["fir mhaithe", "fir maithe", "fir mhaith", "fir maith"], "<i>Fir</i> ends in a slender <i>r</i> → lenition. <i>Maith</i> → <i>maithe</i>."],
  ["oícheanta + fada", "oícheanta fada", ["oícheanta fada", "oícheanta fhada", "oícheanta fadaí", "oícheanta fadtha"], "Vowel ending → no lenition. <i>Fada</i> ends in a vowel, so the plural is unchanged."],
  ["múinteoirí + deas", "múinteoirí deasa", ["múinteoirí deasa", "múinteoirí dheasa", "múinteoirí deas", "múinteoirí deise"], "Vowel ending → no lenition."],
  ["ranganna + suimiúil", "ranganna suimiúla", ["ranganna suimiúla", "ranganna shuimiúla", "ranganna suimiúil", "ranganna suimiúile"], "<i>-úil</i> → <i>-úla</i>. Vowel ending → no lenition."],
  ["focail + deacair", "focail dheacra", ["focail dheacra", "focail deacra", "focail dheacair", "focail deacaire"], "Slender <i>l</i> → lenition, and <i>deacair</i> syncopates → <i>deacra</i>."],
  ["daoine + saibhir", "daoine saibhre", ["daoine saibhre", "daoine shaibhre", "daoine saibhir", "daoine saibhira"], "Syncope: <i>saibhir</i> → <i>saibhre</i>. Vowel ending → no lenition."],
  ["laethanta + álainn", "laethanta áille", ["laethanta áille", "laethanta háille", "laethanta álainne", "laethanta áilleacha"], "<i>Álainn</i> → <i>áille</i>, irregular."],
  ["oícheanta + te", "oícheanta teo", ["oícheanta teo", "oícheanta te", "oícheanta tea", "oícheanta teacha"], "<i>Te</i> → <i>teo</i>, irregular."],
  ["amhráin + brónach", "amhráin bhrónacha", ["amhráin bhrónacha", "amhráin brónacha", "amhráin bhrónach", "amhráin brónaigh"], "<i>Amhrán</i> → <i>amhráin</i>, slender <i>n</i> → lenition. <i>-ach</i> → <i>-acha</i>."],
  ["caoirigh + beag", "caoirigh bheaga", ["caoirigh bheaga", "caoirigh beaga", "caoirigh bheag", "caoirigh bige"], "<i>Caora</i> → <i>caoirigh</i>, slender ending → lenition."],
  ["foclóirí + breá", "foclóirí breátha", ["foclóirí breátha", "foclóirí bhreátha", "foclóirí breá", "foclóirí bríomhara"], "Straight from the script. <i>Breá</i> → <i>breátha</i>; <i>foclóirí</i> ends in a vowel → no lenition."],
  ["focail + ceart", "focail chearta", ["focail chearta", "focail cearta", "focail cheart", "focail cirte"], "Also from the script, a few lines from <i>foclóirí breátha</i> — and this one lenites because <i>focail</i> ends slender."],
  ["ceantair + cúng", "ceantair chúnga", ["ceantair chúnga", "ceantair cúnga", "ceantair chúng", "ceantair caola"], "From the Tasc 4 passage. <i>Ceantair</i> ends in a slender <i>r</i> → lenition."],
  ["téarmaí + úr", "téarmaí úra", ["téarmaí úra", "téarmaí húra", "téarmaí úr", "téarmaí nua"], "From the passage. Vowel ending → no lenition. Ulster <i>úr</i> for <i>nua</i>."],
  ["dathanna + álainn", "dathanna áille", ["dathanna áille", "dathanna háille", "dathanna álainn", "dathanna áilne"], "From Tasc 2: <i>lán de dhathanna áille</i>."],
  ["tithe + mór", "tithe móra", ["tithe móra", "tithe mhóra", "tithe mór", "tithe móire"], "Vowel ending → no lenition."],
  ["buachaillí + ard", "buachaillí arda", ["buachaillí arda", "buachaillí harda", "buachaillí ard", "buachaillí airde"], "Vowel ending → no lenition."],
  ["leabhair + maith", "leabhair mhaithe", ["leabhair mhaithe", "leabhair maithe", "leabhair mhaith", "leabhair fearr"], "<i>Leabhar</i> → <i>leabhair</i>, slender <i>r</i> → lenition."],
].forEach(([q, a, opts, note]) => ITEMS.push({ t: "mc", topic: "pladj", q, en: "make the adjective agree", a, opts, note }));

/* ============ AISTRIÚCHÁN (self-marked) ============ */
[
  ["I have a cold.", "Tá slaghdán orm.", "Illnesses take <i>ar</i>, like feelings."],
  ["He has a toothache.", "Tá tinneas fiacaile air.", "<i>Tinneas</i> + genitive: <i>fiacail</i> → <i>fiacaile</i>."],
  ["They both have chickenpox.", "Tá an deilgneach ar an bheirt acu.", "Named diseases take the article. <i>Deilgneach</i> from <i>dealg</i>, a thorn."],
  ["She has a sore head.", "Tá tinneas cinn uirthi.", "<i>Ceann</i> → genitive <i>cinn</i>."],
  ["Seán is feeling better.", "Tá biseach ar Sheán.", "<i>Biseach</i> is specifically recovery after illness."],
  ["The children are sleepy.", "Tá codladh ar na páistí.", "Not <i>tá siad codlatach</i> — the state sits on them."],
  ["I heard you have measles.", "Chuala mé go bhfuil an bhruitíneach ort.", "<i>Bruitíneach</i> is feminine."],
  ["I am doubtful of that.", "Tá amhras orm faoi sin.", "<i>amhras ar … faoi</i>."],
  ["He is happy about the result.", "Tá áthas air faoin toradh.", "<i>áthas ar … faoi</i>."],
  ["She is proud of us.", "Tá bród uirthi asainn.", "<i>as</i> + sinn = <i>asainn</i>."],
  ["Síle is in a hurry.", "Tá deifir ar Shíle.", "<i>Ar</i> lenites the name."],
  ["I am jealous of them.", "Tá éad orm leo.", "Also <i>tá mé in éad leo</i>."],
  ["Caoimhín is afraid of dogs.", "Tá eagla ar Chaoimhín roimh mhadaí.", "<i>Roimh</i> lenites."],
  ["You are welcome.", "Tá fáilte romhat.", "Literally “a welcome before you”."],
  ["He is angry at you.", "Tá fearg air leat.", "Ulster also <i>tá olc air leat</i>."],
  ["I am in the mood for a cigarette.", "Tá fonn toitín orm.", "<i>Fonn</i> + genitive + <i>ar</i>."],
  ["I am worried about you.", "Tá imní orm fút.", "<i>faoi</i> + tú = <i>fút</i>."],
  ["Seán is surprised about that.", "Tá ionadh ar Sheán faoi sin.", "<i>Iontas</i> is the Ulster variant."],
  ["I became ashamed of them.", "Tháinig náire orm leo.", "<i>Tháinig … ar</i> = became."],
  ["I think you are tired.", "Sílim go bhfuil tuirse ort.", "Ulster: <i>Tá mé ag déanamh go bhfuil tuirse ort</i>."],
  ["I am sick of grammar.", "Tá mé bréan den ghramadach.", "<i>De</i> + <i>an</i> = <i>den</i>, which lenites."],
  ["I am grateful to you all.", "Tá mé buíoch díbh uilig.", "<i>De</i> + sibh = <i>díbh</i>."],
  ["Who was guilty of the crime?", "Cé a bhí ciontach sa choir?", "<i>i</i> + <i>an</i> = <i>sa</i>, which lenites."],
  ["I am getting used to your handwriting.", "Tá mé ag éirí cleachta le do lámhscríbhneoireacht.", "<i>Ag éirí</i> + adjective = becoming."],
  ["It is level with the ground.", "Tá sé cothrom leis an talamh.", "<i>Le</i> + <i>an</i> = <i>leis an</i>."],
  ["I hope you are loyal to them.", "Tá súil agam go bhfuil tú dílis dóibh.", "<i>súil ag … le</i>, here with a <i>go</i> clause."],
  ["Is this material appropriate for this class?", "An bhfuil an t-ábhar seo fóirsteanach don rang seo?", "Ulster <i>fóirsteanach</i>; standard <i>oiriúnach</i>."],
  ["The room was full of lovely colours.", "Bhí an seomra lán de dhathanna áille.", "<i>De</i> lenites. Plural adjective <i>áille</i>, unlenited after a vowel-final plural."],
  ["We are finished with them.", "Tá muid réidh leo.", "<i>réidh le</i> = done with."],
  ["No one is free from blame.", "Níl duine ar bith saor ón mhilleán.", "<i>Ó</i> + <i>an</i> = <i>ón</i>. Standard: <i>ón milleán</i>."],
  ["Aren’t you happy with yourself?", "Nach bhfuil tú sásta leat féin?", "Negative question."],
  ["My friend is addicted to drinking.", "Tá mo chara tugtha don ól.", "Also <i>geallmhar ar an ól</i>."],
  ["The words need to be put into circulation.", "Ní mór na focail a chur i gcúrsaíocht.", "<i>Ní mór</i> = it is necessary. Object + <i>a</i> + lenited verbal noun."],
  ["The creation of terminology falls on the terminology committee.", "Titeann cumadh na téarmaíochta ar an Choiste Téarmaíochta.", "<i>tit ar</i>. Standard: <i>ar an gCoiste</i>."],
  ["The world is changing too quickly.", "Tá an domhan ag athrú róghasta.", "<i>Ró-</i> lenites. Ulster <i>gasta</i>."],
  ["Broken Irish is better than clever English.", "Is fearr Gaeilge bhriste ná Béarla cliste.", "A set proverb. <i>Gaeilge</i> is feminine, so <i>bhriste</i>."],
  ["Everyone has their own opinion.", "Tá a bharúil féin ag achan duine.", "<i>Achan</i> = Ulster for <i>gach aon</i>."],
  ["Necessity is the mother of invention.", "Múineann gá seift.", "The real Irish proverb: “need teaches a stratagem”."],
  ["Practice makes perfect.", "Cleachtadh a dhéanann máistreacht.", "Fronted: “it’s practice that makes mastery”."],
  ["Rome wasn’t built in a day.", "Is de réir a chéile a thógtar na caisleáin.", "The native version, using the autonomous <i>thógtar</i>."],
  ["Necessity knows no law.", "Ní bhíonn dlí ar an riachtanas.", "Literally “there is no law on necessity”."],
  ["Time and tide wait for no man.", "Ní fhanann trá le fear mall.", "“The ebb tide doesn’t wait for a slow man.” A sharper image than the English."],
].forEach(([q, a, note]) => ITEMS.push({ t: "rev", topic: "trans", q, a, note }));

/* ============ FOCLÓIR ============ */
[
  ["téarmaíocht", "terminology", "<i>Téarma</i> + <i>-íocht</i>. <i>An Coiste Téarmaíochta</i> has been coining official terms since 1927."],
  ["códmheascadh", "code-mixing, code-switching", "<i>Cód</i> + <i>meascadh</i>. What Gaeltacht speakers do when no traditional term exists."],
  ["canúint / caighdeán", "dialect / the standard", "The argument the whole Téarmaí Nua script is about."],
  ["stór focal", "vocabulary", "Literally a “store of words”."],
  ["sriantacht", "restrictedness, narrowness", "From <i>srian</i>, a bridle or restraint."],
  ["cum / cumadh", "to coin, compose / coining", "Same verb for writing a tune and making up a word."],
  ["nuachumtha", "newly coined", "<i>Focal deas nuachumtha é ‘brúbhruthaire’.</i>"],
  ["deoranta", "strange, outlandish", "From <i>deoraí</i>, an exile or stranger."],
  ["ait", "odd, strange", "Not <i>áit</i>, a place. The fada is the whole difference."],
  ["rúndiamhair", "cryptic, mysterious", "“So cryptic the Sphinx would be proud of it.”"],
  ["gnáthóg nádúrtha", "natural habitat", "A biologist’s metaphor for a language’s range."],
  ["lucht na Gaeilge", "Irish speakers", "<i>Lucht</i> + genitive: <i>lucht féachana</i> (viewers), <i>lucht oibre</i> (workers)."],
  ["i réim", "dominant, in force", "<i>Réim</i> = a reign, a sphere."],
  ["Imeacht na nIarlaí", "the Flight of the Earls (1607)", "The hinge of the whole passage: lose the patrons and the language stops being built."],
  ["gorta / bochtanas / leatrom", "famine / poverty / oppression", "<i>Leatrom</i> is literally “half-weight”, an imbalance."],
  ["neamhshuim", "indifference, neglect", "<i>Neamh-</i> is the negative prefix."],
  ["dul i muinín", "to fall back on, resort to", "Literally “to go into trust in”."],
  ["géilleadh", "yielding, submission", "<i>Géill do</i> from the prepositions sheet."],
  ["dul amú", "going astray, being mistaken", "<i>Bheadh dul amú ar mo léitheoirí.</i>"],
  ["achoimre", "a summary", "<i>Achoimre a dhéanamh ar</i> = to summarise."],
  ["seanfhocal", "a proverb", "Genitive <i>an tseanfhocail</i> — masculine <i>s-</i> takes <i>ts</i> in the genitive."],
  ["gránach bricfeasta", "breakfast cereal", "The official term the whole dialogue hangs on."],
  ["brúbhruthaire", "pressure cooker", "<i>Brú</i> + <i>bruthaire</i>. Perfectly formed, and nobody says it."],
  ["réad eitilte gan aithint", "UFO", "“Flying object without recognition.” The Sphinx gag."],
  ["nuashonrú / uasdátú", "update (official / spoken)", "The correct coinage losing to the ugly calque."],
  ["biachlár", "a menu", "Where <i>gearg i bhfuidreamh</i> would be out of place."],
  ["ar deireadh thiar thall", "at long last", "Three words all meaning “at the far end”, piled up."],
  ["cogar i leith chugam", "come here till I tell you", "The source of the Hiberno-English “c’mere to me”."],
  ["ní miste / níor mhiste", "it’s no harm / it would be no harm", "<i>Níor mhiste a rá go…</i> is a very useful soft opener."],
  ["ar aon tslí", "anyway", "Munster. Ulster <i>ar scor ar bith</i>; Connacht <i>ar aon nós</i>."],
].forEach(([q, a, note]) => ITEMS.push({ t: "rev", topic: "vocab", q, a, note }));

window.TOPICS = TOPICS;
window.ITEMS = ITEMS;
window.PREPBANK = PREPBANK;
window.PRONTABLE = PRONTABLE;
window.PERSONS = PERSONS;
