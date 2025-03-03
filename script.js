/*************************************************************
script.js - 
 - Fix 'questions sometimes don't load' by ensuring 
   1) we have a question array properly set 
   2) we handle DOMContentLoaded 
   3) we check array length 
   4) we reset states consistently
 - 15 rung logic, final rung confetti, 
 - white highlight rung, speech bubble pinned above #prize
 - 30s timer, random question order, explanation overlay
**************************************************************/

// 1) DOM references
let speechBubble, chartContainer, audienceCanvas;
let questionEl, prizeEl, timerEl, ladderDisplay;
let optBtns = [];
let explanationOverlay, explanationContent;

// 2) We'll store the quiz state in these variables
let currentQuestionIndex = 0;
let usedFifty = false;
let usedPhone = false;
let usedAudience = false;
let timer = null;
let timeLeft = 30;
let audienceChart = null;

// The 15 rung ladder for million-dollar style
const prizeLadder = [
  01, 02, 03, 04, 05,
  06, 07, 08, 09, 10,
  11, 12, 13, 14, 15
];

// Full question set
// Make sure you paste all 100 Atonement questions, each with explanation
// For brevity, only a small sample here:
const questions = [
  {
    question: "In which year does the novel Atonement begin?",
    options: ["A. 1935", "B. 1940", "C. 1929", "D. 1951"],
    correctAnswer: 0,
    explanation: "1935 is correct because the novel starts in that hot summer at the Tallis estate, where Briony first misinterprets Robbie and Cecilia."
  },
  {
    question: "Why does Briony falsely accuse Robbie?",
    options: ["A. She wants revenge on him.", "B. She misinterprets a scene between him and Cecilia.", "C. Lola convinced her to do it.", "D. She found incriminating evidence."],
    correctAnswer: 1,
    explanation: "She misinterprets a scene between Robbie and Cecilia due to her overactive imagination, believing Robbie is a threat."
  },
  {
    question: "Where does the first part of the novel take place?",
    options: ["A. In London", "B. In Paris", "C. At the Tallis estate", "D. In a boarding school"],
    correctAnswer: 2,
    explanation: "The story begins on the Tallis family's estate, where the pivotal fountain and library scenes unfold."
  },
  {
    question: "What happens to Robbie after he is accused?",
    options: ["A. He flees to France.", "B. He joins the army immediately.", "C. He goes into exile in America.", "D. He is arrested and sent to prison."],
    correctAnswer: 3,
    explanation: "Robbie is arrested and imprisoned largely on Briony's false testimony and class prejudices."
  },
  {
    question: "During which war does Robbie serve?",
    options: ["A. World War II", "B. World War I", "C. Falklands War", "D. Vietnam War"],
    correctAnswer: 0,
    explanation: "He serves in World War II, specifically during the retreat to Dunkirk in 1940, hoping for early release."
  },
  {
    question: "How does Robbie die?",
    options: ["A. He is shot in battle.", "B. He drowns during the evacuation.", "C. He dies in an explosion.", "D. He dies of an infection in France."],
    correctAnswer: 3,
    explanation: "Robbie succumbs to an infection in France before evacuation, highlighting war's cruelty and randomness."
  },
  {
    question: "What happens to Cecilia?",
    options: ["A. She becomes a nurse in France.", "B. She moves to America.", "C. She marries Paul Marshall.", "D. She dies in a bombing raid in London."],
    correctAnswer: 3,
    explanation: "Cecilia dies tragically in a bombing raid, never reuniting with Robbie in real life."
  },
  {
    question: "What does Briony reveal in the epilogue?",
    options: ["A. That Robbie actually survived.", "B. That she withdrew her accusation in court.", "C. That the reunion never happened.", "D. That Paul Marshall was arrested."],
    correctAnswer: 2,
    explanation: "Briony confesses that her novel’s reunion was fabricated; Robbie and Cecilia never reconnected."
  },
  {
    question: "How does Briony attempt to atone for her mistake?",
    options: ["A. She moves to France to work as a nurse.", "B. She donates money to Robbie’s family.", "C. She travels to Canada to prove Robbie’s innocence.", "D. She writes a novel about the events."],
    correctAnswer: 3,
    explanation: "She seeks absolution by writing a novel that reconstructs the truth, though she can’t truly fix the past."
  },
  {
    question: "What does the title Atonement mean?",
    options: ["A. Truth", "B. Reconciliation", "C. Deception", "D. Redemption"],
    correctAnswer: 1,
    explanation: "Atonement signifies a quest for reconciliation or moral reparation, which Briony desperately seeks."
  },
  {
    question: "What literary device is heavily used in Atonement?",
    options: ["A. Unreliable Narration", "B. Epistolary Format", "C. First-Person Narrative", "D. Omniscient Narration"],
    correctAnswer: 0,
    explanation: "The novel’s events are colored by Briony’s subjective (and flawed) perspective, making her narration unreliable."
  },
  {
    question: "What symbolizes broken relationships in the novel?",
    options: ["A. The library", "B. The Tallis mansion", "C. Briony's notebook", "D. The broken vase"],
    correctAnswer: 3,
    explanation: "The broken vase at the fountain foreshadows the fracture in Robbie and Cecilia’s future caused by Briony’s misunderstanding."
  },
  {
    question: "How does Briony’s character develop?",
    options: ["A. From timid to aggressive", "B. From self-righteous to remorseful", "C. From indifferent to passionate", "D. From naive to vengeful"],
    correctAnswer: 1,
    explanation: "She evolves from a headstrong, naive girl certain of her accusation to a remorseful adult weighed by guilt."
  },
  {
    question: "Why is Paul Marshall important?",
    options: ["A. He is Briony's tutor", "B. He helps Robbie join the army", "C. He is the actual perpetrator", "D. He fights alongside Robbie"],
    correctAnswer: 2,
    explanation: "Paul Marshall is the real rapist of Lola, yet he escapes punishment due to his wealth and societal status."
  },
  {
    question: "Which war event is depicted in Atonement?",
    options: ["A. D-Day landings", "B. Dunkirk evacuation", "C. The Battle of Britain", "D. The Battle of the Somme"],
    correctAnswer: 1,
    explanation: "Robbie experiences the brutal Dunkirk evacuation, highlighting the chaos and futility of war."
  },
  {
    question: "Why is Briony considered an unreliable narrator?",
    options: ["A. She was never present at key events.", "B. She is too young to understand.", "C. She is influenced by her parents.", "D. She rewrites history in her novel."],
    correctAnswer: 3,
    explanation: "She literally revises the story’s ending in her manuscript, demonstrating her power (and willingness) to alter facts."
  },
  {
    question: "Which object does Cecilia break near the fountain?",
    options: ["A. A mirror", "B. A glass", "C. A vase", "D. A lamp"],
    correctAnswer: 2,
    explanation: "Cecilia accidentally breaks a vase at the fountain, sparking the pivotal misunderstanding Briony witnesses."
  },
  {
    question: "Which character is actually responsible for assaulting Lola?",
    options: ["A. Robbie Turner", "B. Leon Tallis", "C. Paul Marshall", "D. Danny Hardman"],
    correctAnswer: 2,
    explanation: "Paul Marshall assaults Lola, but Robbie is wrongly accused, reflecting class biases and Briony’s error."
  },
  {
    question: "How does Briony first misinterpret Robbie’s intentions?",
    options: ["A. She reads his private letter", "B. She sees him at the fountain", "C. She catches him stealing money", "D. She overhears a phone call"],
    correctAnswer: 1,
    explanation: "Briony misconstrues the tension between Cecilia and Robbie at the fountain, seeing it as coercion instead of attraction."
  },
  {
    question: "What is the central theme of Atonement?",
    options: ["A. Class conflict", "B. Justice vs. injustice", "C. Guilt and redemption", "D. War and peace"],
    correctAnswer: 2,
    explanation: "Guilt and redemption drive the narrative, as Briony spends her life trying to atone for her false accusation."
  },

  // 21
  {
    question: "Who is the eldest sibling in the Tallis family?",
    options: ["A. Briony", "B. Lola", "C. Cecilia", "D. Leon"],
    correctAnswer: 3,
    explanation: "Leon is the oldest Tallis child, though less central to the plot than Cecilia or Briony."
  },
  {
    question: "Which character profits from war manufacturing?",
    options: ["A. Robbie Turner", "B. Emily Tallis", "C. Paul Marshall", "D. Leon Tallis"],
    correctAnswer: 2,
    explanation: "Wealthy Paul Marshall makes money from the war effort, contrasting starkly with Robbie’s conscription."
  },
  {
    question: "What triggers Briony’s deep guilt?",
    options: ["A. Realizing Paul was the real attacker", "B. Seeing Cecilia’s heartbreak", "C. Reading Robbie’s letters", "D. Lola’s direct confession"],
    correctAnswer: 0,
    explanation: "She grasps that Paul, not Robbie, committed the crime, forcing her to face her devastating role in Robbie’s downfall."
  },
  {
    question: "What is Emily Tallis’s notable trait?",
    options: ["A. She is overprotective", "B. She is distant and ineffective", "C. She is a nurse in the war", "D. She helps Robbie escape"],
    correctAnswer: 1,
    explanation: "She often retreats due to migraines, remaining aloof and failing to guide or protect her children."
  },
  {
    question: "Why does Briony choose to become a nurse?",
    options: ["A. To find a new career path", "B. To atone for her false accusation", "C. Because Cecilia forces her", "D. To earn money after the war"],
    correctAnswer: 1,
    explanation: "Briony sees nursing as a penance, punishing herself with hard work to partially redeem her wrongdoing."
  },
  {
    question: "How is social class a major factor in Robbie’s conviction?",
    options: ["A. He is wealthy and influential", "B. His mother is the Tallis housekeeper", "C. He went to Oxford with Leon", "D. He was already a known criminal"],
    correctAnswer: 1,
    explanation: "Being the housekeeper’s son, Robbie becomes an easy scapegoat, overshadowed by Paul’s higher social standing."
  },
  {
    question: "Which writing style does Ian McEwan employ in Atonement?",
    options: ["A. Strict first-person ", "B. Non-linear, multiple perspectives", "C. Pure dialogue", "D. Epistolary novel"],
    correctAnswer: 1,
    explanation: "McEwan jumps through various timelines and characters’ points of view, emphasizing subjective reality."
  },
  {
    question: "What does Briony’s final manuscript reveal about her?",
    options: ["A. She profited from telling lies", "B. She wanted to hide the truth forever", "C. She tried to give Robbie and Cecilia a happy ending", "D. She despised the Tallis family"],
    correctAnswer: 2,
    explanation: "Briony’s postscript shows she fabricated a joyous reunion, seeking to offer them at least a fictional resolution."
  },
  {
    question: "Why is Briony’s version of events not fully reliable?",
    options: ["A. She heard everything second-hand", "B. She was influenced by Paul Marshall", "C. She was only 13 when she witnessed key moments", "D. She never read Robbie’s letters"],
    correctAnswer: 2,
    explanation: "Briony’s youth and active imagination cause her to misread adult relationships and sexual nuances."
  },
  {
    question: "Which best describes Robbie’s background?",
    options: ["A. Aristocratic son of a noble", "B. A middle-class student at Cambridge", "C. Son of the family’s housekeeper", "D. Childhood friend of Lola"],
    correctAnswer: 2,
    explanation: "He’s the housekeeper’s son, educated through the Tallis family’s support, but still socially vulnerable."
  },
  {
    question: "Which city does Briony move to for her nurse training?",
    options: ["A. Manchester", "B. Edinburgh", "C. London", "D. Cambridge"],
    correctAnswer: 2,
    explanation: "Briony goes to London, where she follows in Cecilia’s footsteps by working in the wartime hospital environment."
  },
  {
    question: "How does the war setting affect Robbie’s hopes?",
    options: ["A. It gives him a quick path to wealth", "B. It forces him to remain at home", "C. It allows him to prove his innocence", "D. It prevents him from reuniting with Cecilia"],
    correctAnswer: 3,
    explanation: "The war strands Robbie in France and eventually leads to his untimely death, thwarting any chance of reunion."
  },
  {
    question: "What is Lola’s ultimate fate in the novel?",
    options: ["A. She marries Paul Marshall", "B. She confesses Robbie’s innocence", "C. She becomes Briony’s ally", "D. She dies in the war"],
    correctAnswer: 0,
    explanation: "Lola ultimately marries her rapist Paul, sealing her silence and solidifying the tragic injustice."
  },
  {
    question: "Which metaphor is used for Briony’s attempt at rewriting reality?",
    options: ["A. Playing God as a novelist", "B. Fixing a broken mirror", "C. Sailing a ship in a storm", "D. Counting stars in daylight"],
    correctAnswer: 0,
    explanation: "She effectively ‘plays God,’ shaping characters’ fates in her writing to create a happier ending for them."
  },
  {
    question: "What role does the library scene play?",
    options: ["A. It is where Cecilia reads letters to Briony", "B. It is where Robbie and Cecilia’s intimacy is discovered", "C. It is where Paul assaults Lola", "D. It is where Briony confesses her lie"],
    correctAnswer: 1,
    explanation: "The library scene cements Cecilia and Robbie’s relationship but also shocks Briony and feeds her misconceptions."
  },
  {
    question: "Which statement about Emily Tallis is true?",
    options: ["A. She strongly supports Robbie", "B. She often suspects Paul Marshall", "C. She suffers from chronic migraines", "D. She becomes a war nurse"],
    correctAnswer: 2,
    explanation: "Emily frequently withdraws from family matters due to her migraines, inadvertently leaving Briony unchecked."
  },
  {
    question: "How does the novel highlight class prejudice?",
    options: ["A. By showing Robbie is disbelieved due to his status", "B. By depicting Cecilia as poor", "C. By Lola receiving money from Briony", "D. By Briony being forced to do chores"],
    correctAnswer: 0,
    explanation: "Being the housekeeper’s son makes Robbie an easy suspect, whereas wealthy Paul remains unquestioned."
  },
  {
    question: "Which style does McEwan use to depict Robbie’s war experience?",
    options: ["A. Humorous anecdotes", "B. Detailed realism", "C. Stream-of-consciousness poetry", "D. Epic fantasy imagery"],
    correctAnswer: 1,
    explanation: "McEwan employs starkly realistic descriptions to convey the horror and exhaustion of Dunkirk."
  },
  {
    question: "Why is Lola reluctant to name her attacker?",
    options: ["A. She genuinely doesn’t remember", "B. She fears nobody will believe her", "C. She is intimidated by Paul Marshall’s status", "D. She wants to protect Robbie"],
    correctAnswer: 2,
    explanation: "Paul Marshall’s social power and wealth keep Lola from speaking openly, and she later marries him."
  },
  {
    question: "How does Briony find out the truth about Lola’s assault?",
    options: ["A. Lola confesses years later", "B. Paul Marshall admits it", "C. She reads Lola’s diary", "D. She deduces it from small clues"],
    correctAnswer: 3,
    explanation: "Briony pieces together subtle signs to realize Paul was the real perpetrator, not Robbie."
  },
  {
    question: "Which location is central to the early conflict?",
    options: ["A. The fountain", "B. The nursery", "C. The basement", "D. The attic"],
    correctAnswer: 0,
    explanation: "The fountain scene is where Cecilia and Robbie’s tension is misunderstood by Briony, triggering the false accusations."
  },
  {
    question: "What is Briony’s biggest regret?",
    options: ["A. Not spending enough time with Lola", "B. Not becoming a writer sooner", "C. Falsely condemning Robbie", "D. Disagreeing with her mother"],
    correctAnswer: 2,
    explanation: "Her entire life is consumed by regret that she wrongly accused Robbie of a crime he didn’t commit."
  },
  {
    question: "What does the Dunkirk retreat symbolize for Robbie?",
    options: ["A. A chance to be a war hero", "B. A hopeless journey away from Cecilia", "C. An opportunity to prove his innocence", "D. A triumphant moment of survival"],
    correctAnswer: 1,
    explanation: "Robbie’s retreat from Dunkirk is rife with hardship and despair, distancing him further from Cecilia."
  },
  {
    question: "Who eventually marries Lola?",
    options: ["A. Leon Tallis", "B. Robbie Turner", "C. Paul Marshall", "D. Danny Hardman"],
    correctAnswer: 2,
    explanation: "Lola marries her attacker Paul, compounding the tragedy and ensuring Robbie’s vindication never comes."
  },
  {
    question: "How does Cecilia react to her family’s treatment of Robbie?",
    options: ["A. She sides with them and denounces Robbie", "B. She breaks ties with her family", "C. She tries to bribe the court", "D. She believes Briony’s story fully"],
    correctAnswer: 1,
    explanation: "Cecilia wholeheartedly supports Robbie, cutting off her family for believing Briony’s accusations."
  },
  {
    question: "Why does Robbie write an explicit letter to Cecilia?",
    options: ["A. He wants to threaten her", "B. He mistakes it for a different draft", "C. He intends to share it with her parents", "D. He tries to prove his innocence"],
    correctAnswer: 1,
    explanation: "Robbie accidentally sends the wrong draft, shocking Briony when she intercepts it."
  },
  {
    question: "What narrative twist is revealed at the novel’s end?",
    options: ["A. Robbie survived the war", "B. Cecilia married someone else", "C. Briony invented a happier ending in her book", "D. Lola confessed in court"],
    correctAnswer: 2,
    explanation: "In the epilogue, Briony admits she fictionalized Robbie and Cecilia’s reunion to cope with her guilt."
  },
  {
    question: "How does Briony’s nursing experience affect her?",
    options: ["A. She forgets about her past", "B. She becomes more detached", "C. She feels more guilt seeing real suffering", "D. She decides to become a doctor"],
    correctAnswer: 2,
    explanation: "Confronted with wounded soldiers, Briony’s guilt deepens, and she fully grasps the impact of real tragedy."
  },
  {
    question: "Which of these is a recurring motif in Atonement?",
    options: ["A. Letters and writing", "B. Swords and shields", "C. Musical performances", "D. Masks and costumes"],
    correctAnswer: 0,
    explanation: "From Robbie’s mistaken letter to Briony’s manuscript, letters and writing propel the plot."
  },
  {
    question: "How does Ian McEwan portray the British class system?",
    options: ["A. He shows it as fair and equal", "B. He ignores it entirely", "C. He highlights how it fuels injustice", "D. He glamorizes upper-class life"],
    correctAnswer: 2,
    explanation: "Robbie’s downfall exemplifies the destructive power of class prejudice, while Paul uses wealth to hide his crime."
  },
  {
    question: "What do Robbie’s letters from prison represent?",
    options: ["A. His desperate hope", "B. His anger at Briony", "C. His financial ruin", "D. His plan for revenge"],
    correctAnswer: 0,
    explanation: "Robbie clings to these letters and Cecilia’s love as emotional sustenance amid unjust incarceration."
  },
  {
    question: "Why does Briony question her memory of the assault?",
    options: ["A. She reads conflicting testimonies", "B. She was half asleep", "C. She never actually saw the attacker’s face", "D. She had a fever that night"],
    correctAnswer: 2,
    explanation: "Briony never got a clear look but insisted upon her own version, realizing later how flawed it was."
  },
  {
    question: "Which emotion primarily drives Briony’s actions at 13?",
    options: ["A. Jealousy", "B. Compassion", "C. Curiosity", "D. Imaginative overreach"],
    correctAnswer: 3,
    explanation: "Her overactive imagination and desire for drama lead her to transform Robbie into a villain."
  },
  {
    question: "Where does Briony finally confront Cecilia and Robbie?",
    options: ["A. At the Tallis estate", "B. In a London apartment", "C. During the Dunkirk evacuation", "D. Inside a hospital ward"],
    correctAnswer: 1,
    explanation: "She meets them in London, seeking forgiveness, though her attempt at reconciliation is strained and incomplete."
  },
  {
    question: "Which best describes Ian McEwan’s prose style in Atonement?",
    options: ["A. Stark and minimalistic", "B. Poetic and detailed", "C. Fragmented and incoherent", "D. Simplistic and plain"],
    correctAnswer: 1,
    explanation: "He employs richly descriptive, almost lyrical language to depict both the estate’s idyll and the war’s horror."
  },
  {
    question: "How does the novel handle the concept of truth?",
    options: ["A. Truth is absolute and objective", "B. Truth is shaped by perception and memory", "C. Truth is irrelevant to the plot", "D. Truth is quickly revealed"],
    correctAnswer: 1,
    explanation: "Throughout the novel, truth hinges on Briony’s biased or evolving perspectives, highlighting subjectivity."
  },
  {
    question: "Which detail reveals Paul Marshall’s guilt?",
    options: ["A. A scratch on his face", "B. A hidden letter", "C. His footprints by the fountain", "D. A watch found in Lola’s room"],
    correctAnswer: 0,
    explanation: "He bears a scratch from Lola’s resistance, hinting that he, not Robbie, was the attacker."
  },
  {
    question: "What motif highlights Briony’s desire to create stories?",
    options: ["A. Her toy soldiers", "B. Her constant playwriting", "C. Her interest in photography", "D. Her obsession with painting"],
    correctAnswer: 1,
    explanation: "Briony’s devotion to theatrical scripts and narrative invention extends to her misinterpretation of real events."
  },
  {
    question: "How does Robbie’s Cambridge education affect his standing?",
    options: ["A. He is seen as a social climber", "B. He gains full acceptance by the Tallis family", "C. He refuses to return home", "D. He rejects Cecilia’s affection"],
    correctAnswer: 0,
    explanation: "Despite academic achievement, he is resented by some for ‘rising above’ his working-class origins."
  },
  {
    question: "What is the outcome of Lola’s marriage to Paul Marshall?",
    options: ["A. She exposes him years later", "B. She divorces him in public scandal", "C. They remain silent about the assault", "D. They donate to Robbie’s memorial"],
    correctAnswer: 2,
    explanation: "By marrying Paul, Lola keeps the truth concealed and Robbie’s innocence forever unrecognized."
  },
  {
    question: "Why does Cecilia refuse to see her family?",
    options: ["A. They sold the family estate", "B. They stood by Briony’s accusation", "C. They moved abroad", "D. They forcibly enlisted Robbie"],
    correctAnswer: 1,
    explanation: "Cecilia cuts ties because her family believed Briony’s lie, choosing Robbie’s side instead."
  },
  {
    question: "Which emotion does Briony struggle with most as an adult?",
    options: ["A. Indifference", "B. Pride", "C. Guilt", "D. Rage"],
    correctAnswer: 2,
    explanation: "She is consumed by guilt, unable to rectify the tragedy she initiated through her false testimony."
  },
  {
    question: "What does Briony hope her novel will achieve?",
    options: ["A. Legal exoneration of Robbie", "B. A posthumous pardon from Cecilia", "C. A sense of personal redemption", "D. Monetary success and fame"],
    correctAnswer: 2,
    explanation: "She seeks personal catharsis, if not real forgiveness, by documenting her confession in literary form."
  },
  {
    question: "How does McEwan portray the hospital environment?",
    options: ["A. Chaotic but revealing of character growth", "B. Peaceful and comforting", "C. Negligent and abusive", "D. Comical and light-hearted"],
    correctAnswer: 0,
    explanation: "The war hospital is harrowing, but it forces Briony to confront genuine suffering and reflect on her own guilt."
  },
  {
    question: "Which statement about Robbie and Cecilia’s relationship is true?",
    options: ["A. They are distant cousins", "B. They met during the war", "C. Their love is cut short by false accusations", "D. They marry in secret"],
    correctAnswer: 2,
    explanation: "Their tragic separation begins the night Robbie is wrongly accused, and they never truly reunite in life."
  },
  {
    question: "Which form of narrative is used in the final section?",
    options: ["A. Briony as an elderly first-person narrator", "B. Pure dialogue with no narrator", "C. An omniscient narrator describing Briony’s future", "D. A police report about Lola’s case"],
    correctAnswer: 0,
    explanation: "Elderly Briony reveals she authored the story, embedding a metafictional twist in the epilogue."
  },
  {
    question: "How does the novel comment on the power of imagination?",
    options: ["A. It creates unity among characters", "B. It leads to misunderstanding and tragedy", "C. It helps Robbie survive the war", "D. It is trivial and dismissed"],
    correctAnswer: 1,
    explanation: "Briony’s imagination morphs harmless events into a false crime, ruining lives in the process."
  },
  {
    question: "What aspect of British society is most critiqued?",
    options: ["A. The monarchy", "B. The judicial system", "C. The class divide", "D. The educational system"],
    correctAnswer: 2,
    explanation: "McEwan underscores the class divide, with Robbie as a victim and Paul Marshall exploiting his privilege."
  },
  {
    question: "What does Briony realize when she witnesses the war’s brutality?",
    options: ["A. Her lie is insignificant compared to war", "B. She must travel to France to find Robbie", "C. Paul Marshall is also at war", "D. Cecilia died in Dunkirk"],
    correctAnswer: 0,
    explanation: "Though her lie is monumental for Robbie’s fate, war’s vast suffering dwarfs any single personal tragedy."
  },
  {
    question: "How does the reader learn that Robbie and Cecilia never reunited?",
    options: ["A. From a newspaper article", "B. From Briony’s final revelation", "C. From Emily Tallis’s confession", "D. From letters found in Dunkirk"],
    correctAnswer: 1,
    explanation: "Briony admits in the epilogue that she invented their reunion for the novel’s sake, revealing the painful truth."
  },
  {
    question: "Which character do many blame for Lola’s assault?",
    options: ["A. Danny Hardman", "B. Leon Tallis", "C. Robbie Turner", "D. Briony herself"],
    correctAnswer: 2,
    explanation: "In the novel’s immediate aftermath, Robbie is scapegoated for Lola’s attack based on Briony’s claims."
  },
  {
    question: "What does the scene by the fountain represent thematically?",
    options: ["A. Innocence restored", "B. The moment that triggers Briony’s false narrative", "C. Cecilia rejecting Robbie", "D. Briony’s first act of heroism"],
    correctAnswer: 1,
    explanation: "Briony’s misreading at the fountain ignites the tragic chain of events culminating in Robbie’s conviction."
  },
  {
    question: "Which object best symbolizes false evidence in the novel?",
    options: ["A. Robbie’s explicit letter", "B. Lola’s torn dress", "C. The broken vase", "D. Cecilia’s necklace"],
    correctAnswer: 0,
    explanation: "The letter Robbie meant intimately for Cecilia is misconstrued by Briony as proof of his depravity."
  },
  {
    question: "What is the relationship between Briony and Lola?",
    options: ["A. They are siblings", "B. They are cousins", "C. They are best friends", "D. They never meet"],
    correctAnswer: 1,
    explanation: "Briony and Lola are cousins, with Lola staying at the Tallis estate when the assault takes place."
  },
  {
    question: "How does Leon react to the family conflict?",
    options: ["A. He ignores it, focusing on social events", "B. He defends Robbie fiercely", "C. He tries to mediate a reunion", "D. He confesses the crime himself"],
    correctAnswer: 0,
    explanation: "Leon remains largely uninterested and avoids challenging Briony or investigating the truth."
  },
  {
    question: "Which best describes the tone of Atonement?",
    options: ["A. Lighthearted and comedic", "B. Dark, suspenseful, and reflective", "C. Fast-paced action", "D. Primarily satirical"],
    correctAnswer: 1,
    explanation: "Its atmosphere is haunting and contemplative, emphasizing guilt, class friction, and wartime tragedy."
  },
  {
    question: "Which location becomes a symbol of Briony’s isolation?",
    options: ["A. The attic", "B. The hospital ward", "C. The greenhouse", "D. The nursery"],
    correctAnswer: 1,
    explanation: "She toils in the wartime hospital ward, emotionally and physically distant from her former home life."
  },
  {
    question: "Which theme is highlighted by Lola’s marriage to her attacker?",
    options: ["A. Forgiveness", "B. The complexity of trauma", "C. Briony’s redemption", "D. True love conquers all"],
    correctAnswer: 1,
    explanation: "Lola’s decision to marry Paul exposes the dark intricacies of victimhood, power, and silent complicity."
  },
  {
    question: "Which format does the novel’s final reveal take?",
    options: ["A. A letter to Robbie", "B. An elderly Briony’s narration", "C. A court document", "D. Cecilia’s diary"],
    correctAnswer: 1,
    explanation: "Older Briony speaks directly to the reader, unveiling how she fabricated crucial aspects of the story."
  },
  {
    question: "What does the Dunkirk setting convey?",
    options: ["A. Briony’s childhood innocence", "B. The chaos and tragedy of war", "C. Cecilia’s deep regrets", "D. Paul Marshall’s redemption"],
    correctAnswer: 1,
    explanation: "Robbie’s struggle at Dunkirk showcases the brutal, disordered reality overshadowing personal hopes."
  },
  {
    question: "Which detail proves Robbie’s innocence was never legally established?",
    options: ["A. A hidden witness was never found", "B. The police refused to reopen the case", "C. Briony never retracted her statement in time", "D. Lola testified against him in court"],
    correctAnswer: 2,
    explanation: "Briony admits too late that she lied; she never officially reversed her testimony when it could have helped."
  },
  {
    question: "How does the older Briony view her younger self?",
    options: ["A. She sees her as heroic", "B. She thinks she was courageous", "C. She considers her naive and destructive", "D. She admires her determination"],
    correctAnswer: 2,
    explanation: "Elderly Briony deems her younger self dangerously naive, acknowledging the far-reaching harm she caused."
  },
  {
    question: "Which character is described as a war profiteer?",
    options: ["A. Robbie Turner", "B. Paul Marshall", "C. Leon Tallis", "D. Danny Hardman"],
    correctAnswer: 1,
    explanation: "Paul Marshall expands his chocolate empire amid wartime, enriching himself while Robbie suffers in uniform."
  },
  {
    question: "How does Atonement address the notion of forgiveness?",
    options: ["A. It is immediate and unconditional", "B. It is partial and comes only after war", "C. It never fully materializes for Briony", "D. It is enforced by the Tallis family"],
    correctAnswer: 2,
    explanation: "Briony never truly achieves forgiveness from Robbie or Cecilia, burdened by her guilt indefinitely."
  },
  {
    question: "Why does Briony fail to correct her lie sooner?",
    options: ["A. She fears legal consequences", "B. She moves overseas before telling anyone", "C. She forgets what happened", "D. She is manipulated by Lola"],
    correctAnswer: 0,
    explanation: "She hesitates to face the legal and familial fallout, thus perpetuating Robbie’s wrongful condemnation."
  },
  {
    question: "Which best describes the novel's structure?",
    options: ["A. Strictly chronological", "B. Multiple time frames leading to an epilogue", "C. Told entirely through letters", "D. A single day retold from various angles"],
    correctAnswer: 1,
    explanation: "Atonement jumps between 1935, wartime, and Briony’s later life, culminating in the final revelation."
  },
  {
    question: "How does Emily Tallis react to Robbie’s situation?",
    options: ["A. She staunchly defends him", "B. She blames Briony for exaggerating", "C. She believes Robbie is guilty", "D. She tries to reconcile them"],
    correctAnswer: 2,
    explanation: "She sides with Briony’s version and never challenges the assumption of Robbie’s guilt."
  },
  {
    question: "Why is the library scene shocking to Briony?",
    options: ["A. She witnesses Cecilia and Robbie’s intimacy", "B. She sees Lola’s assault there", "C. She finds her mother unconscious", "D. She reads secret letters"],
    correctAnswer: 0,
    explanation: "Cecilia and Robbie’s passionate moment in the library rattles Briony’s immature view of adult relationships."
  },
  {
    question: "What does Briony’s change of heart signify?",
    options: ["A. She stops believing in war", "B. She regrets becoming a nurse", "C. She realizes the magnitude of her lie", "D. She decides to blame Lola instead"],
    correctAnswer: 2,
    explanation: "At last, Briony grasps the irreparable damage she inflicted on Robbie and Cecilia’s lives."
  },
  {
    question: "Which word best describes Robbie’s character?",
    options: ["A. Vindictive", "B. Ambitious", "C. Cowardly", "D. Manipulative"],
    correctAnswer: 1,
    explanation: "He is ambitious and capable, aiming for further studies and a better life despite class barriers."
  },
  {
    question: "How does McEwan portray childhood imagination?",
    options: ["A. As a harmless pastime", "B. As the cause of the entire tragedy", "C. As necessary for survival", "D. As irrelevant to the plot"],
    correctAnswer: 1,
    explanation: "Briony’s imaginative leaps transform innocent events into a devastating false accusation."
  },
  {
    question: "Which evidence do the police primarily rely on to arrest Robbie?",
    options: ["A. Briony’s eyewitness claim", "B. Physical clues at the crime scene", "C. A signed confession", "D. Cecilia’s statement"],
    correctAnswer: 0,
    explanation: "Authorities trust Briony’s testimony without investigating thoroughly, fueling the miscarriage of justice."
  },
  {
    question: "What do we learn about the final reunion scene between Briony, Cecilia, and Robbie?",
    options: ["A. It was a legal proceeding", "B. It was Briony’s dream", "C. It never actually happened", "D. It ended with forgiveness"],
    correctAnswer: 2,
    explanation: "In the epilogue, Briony reveals that she fabricated the reunion after discovering Robbie and Cecilia were already dead."
  },
  {
    question: "Why does the older Briony fear vascular dementia?",
    options: ["A. She worries she will forget to publish her novel", "B. She wants to move to America before it worsens", "C. She fears she can't maintain the lie about Paul", "D. She dreads losing her memories of guilt and atonement"],
    correctAnswer: 3,
    explanation: "Her memories of wrongdoing (and attempts at atonement) are the only penance she can truly cling to."
  },
  {
    question: "How does Atonement end for Briony?",
    options: ["A. In total ignorance of her past", "B. In peace after Robbie forgives her", "C. In regret over her inability to fully atone", "D. In legal trouble for perjury"],
    correctAnswer: 2,
    explanation: "She remains haunted by regret, acknowledging she can never truly fix the harm she caused."
  },
  {
    question: "Which best describes Cecilia’s stance toward her family post-accusation?",
    options: ["A. She defends their decision", "B. She demands Robbie apologize", "C. She severs ties and supports Robbie", "D. She remains neutral"],
    correctAnswer: 2,
    explanation: "Cecilia cuts off her family to stand by Robbie, rejecting their willingness to believe Briony."
  },
  {
    question: "What does Briony’s writing ultimately fail to achieve?",
    options: ["A. Critical acclaim", "B. A new trial for Robbie", "C. A marriage between Lola and Robbie", "D. True redemption for her guilt"],
    correctAnswer: 3,
    explanation: "Despite recording the truth, Briony can’t resurrect Robbie or Cecilia, leaving her redemption incomplete."
  },
  {
    question: "Which factor most strongly motivated Briony to lie?",
    options: ["A. Desire for revenge", "B. Mistaken sense of protecting Cecilia", "C. Pressure from her parents", "D. Greed for inheritance"],
    correctAnswer: 1,
    explanation: "Briony believes she’s safeguarding Cecilia from Robbie, guided by a warped, childlike sense of righteousness."
  },
  {
    question: "How does the war highlight the fragility of human plans?",
    options: ["A. Robbie and Cecilia never fulfill their hopes", "B. Briony’s illusions are validated by war", "C. Lola ascends in wealth by war profiteering", "D. Emily becomes a patriot"],
    correctAnswer: 0,
    explanation: "Their dreams collapse under the harsh realities of conflict, with both losing any chance at normalcy."
  },
  {
    question: "Which statement sums up the message of Atonement?",
    options: ["A. Love always conquers injustice", "B. War is glorified for personal gain", "C. Guilt can linger when mistakes are never righted", "D. Childhood illusions are harmless"],
    correctAnswer: 2,
    explanation: "Briony’s guilt endures, demonstrating that some mistakes remain uncorrectable and forgiveness unattainable."
  }
];

// 3) Shuffle for random question order
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// 4) We'll define all our game logic
function initDOMReferences() {
  speechBubble = document.getElementById("speech-bubble");
  chartContainer = document.getElementById("audience-chart-container");
  audienceCanvas = document.getElementById("audience-chart");

  questionEl = document.getElementById("question");
  prizeEl = document.getElementById("prize");
  timerEl = document.getElementById("timer");
  ladderDisplay = document.getElementById("ladder-display");

  for (let i = 0; i < 4; i++) {
    optBtns[i] = document.getElementById("opt" + i);
  }

  // Explanation overlay
  explanationOverlay = document.createElement("div");
  explanationOverlay.id = "explanation-overlay";
  Object.assign(explanationOverlay.style, {
    display: "none",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.9)",
    color: "white",
    zIndex: "9999",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px"
  });
  document.body.appendChild(explanationOverlay);

  explanationContent = document.createElement("div");
  explanationOverlay.appendChild(explanationContent);
}

function showExplanationOverlay(htmlText) {
  explanationContent.innerHTML = htmlText;
  explanationOverlay.style.display = "flex";
}
function hideExplanationOverlay() {
  explanationOverlay.style.display = "none";
}

function hideSpeechBubble(){
  if (speechBubble) {
    speechBubble.style.display = "none";
    speechBubble.style.pointerEvents = "none";
  }
}
function hideAudienceChart(){
  if (chartContainer) chartContainer.style.display="none";
  if (audienceChart) {
    audienceChart.destroy();
    audienceChart=null;
  }
}

// Timer
function startTimer(){
  timeLeft=30;
  if (timerEl) timerEl.innerText = "Time left: 30s";
  if(timer) clearInterval(timer);

  timer = setInterval(()=>{
    timeLeft--;
    if(timerEl) timerEl.innerText = "Time left: " + timeLeft + "s";
    if(timeLeft<=0){
      clearInterval(timer);
      onLose("Time's up! You ran out of time.");
    }
  },1000);
}
function stopTimer(){
  if(timer) clearInterval(timer);
}

// Lifelines
function useFiftyFifty() {
  if(usedFifty) return;
  usedFifty=true;

  if(currentQuestionIndex<0 || currentQuestionIndex>= questions.length) return;
  const qObj= questions[currentQuestionIndex];
  const correct = qObj.correctAnswer;

  let hidden=0;
  for(let i=0; i<4; i++){
    if(i!==correct && hidden<2){
      fadeOutWrongOption(optBtns[i]);
      hidden++;
    }
  }
}
function phoneAFriend() {
  if(usedPhone) return;
  usedPhone=true;

  const guess = guessCorrectLetter();
  positionSpeechBubble("Herr Hesse thinks it's " + guess);
}
function askTheAudience() {
  if(usedAudience) return;
  usedAudience=true;

  if(!chartContainer || !audienceCanvas) return;
  const qObj= questions[currentQuestionIndex];
  const correct= qObj.correctAnswer;
  let distribution = [0,0,0,0];
  distribution[correct] = Math.floor(Math.random()*50)+25;
  let sum= distribution[correct];
  for(let i=0;i<4;i++){
    if(i!== correct){
      distribution[i]= Math.floor(Math.random()*(100-sum));
      sum+= distribution[i];
      if(sum>99) break;
    }
  }
  let remainder=100-sum;
  while(remainder>0){
    const idx= Math.floor(Math.random()*4);
    distribution[idx]++;
    remainder--;
  }
  chartContainer.style.display="block";
  if(audienceChart){
    audienceChart.destroy();
    audienceChart=null;
  }
  const ctx= audienceCanvas.getContext('2d');
  audienceChart = new Chart(ctx,{
    type:'bar',
    data:{
      labels:["A","B","C","D"],
      datasets:[{
        label:"% of audience votes",
        data:distribution,
        backgroundColor:["red","blue","green","orange"]
      }]
    },
    options:{
      scales:{ y:{beginAtZero:true, max:100} }
    }
  });
}

// fade-out for 50:50
function fadeOutWrongOption(btn){
  btn.style.transition="opacity 0.5s";
  btn.style.opacity="0";
  setTimeout(()=>{
    btn.style.display="none";
  },500);
}
function guessCorrectLetter(){
  const qObj= questions[currentQuestionIndex] || {};
  const correct= qObj.correctAnswer || 0;
  return ["A","B","C","D"][correct];
}

// Position speech bubble absolutely near #prize
function positionSpeechBubble(message) {
  if (!speechBubble || !prizeEl) return;
  speechBubble.innerText = message;
  speechBubble.style.pointerEvents = "none";
  speechBubble.style.display = "block";

  setTimeout(() => {
    const bubbleRect = speechBubble.getBoundingClientRect();
    const prizeRect = prizeEl.getBoundingClientRect();
    
    // E.g. center horizontally above the #prize
    const left = (prizeRect.left + (prizeRect.width / 2)) - (bubbleRect.width / 2);
    const top  = prizeRect.top - bubbleRect.height - 20; 
    // 20px vertical offset above

    
  }, 50);
}


// Ladder highlight with white background
function highlightLadder(idx){
  // idx= 0..14 => rung #1..15
  // we produce lines from rung 15..1
  // if rungNum== idx+1 => highlight
  if(!ladderDisplay) return;
  let lines=[];
  for(let i=prizeLadder.length-1; i>=0; i--){
    let rungNum= i+1; // 15..1
    let val= prizeLadder[i].toLocaleString();
    if(rungNum === idx+1) {
      lines.push(`<span style="background-color:white;color:black;">${rungNum} - ${val}</span>`);
    } else {
      lines.push(`${rungNum} - ${val}`);
    }
  }
  ladderDisplay.innerHTML= lines.join("<br>");
}

// Display next question
function displayQuestion(){
  hideExplanationOverlay();
  hideSpeechBubble();
  hideAudienceChart();
  stopTimer();
  startTimer();

  if(currentQuestionIndex<0 || currentQuestionIndex>= questions.length){
    onLose("No more questions available!");
    return;
  }

  highlightLadder(currentQuestionIndex);

  const qObj= questions[currentQuestionIndex];
  questionEl.innerText= qObj.question;
  for(let i=0; i<4; i++){
    optBtns[i].style.display="block";
    optBtns[i].style.opacity="1";
    optBtns[i].style.backgroundColor="black";
    optBtns[i].style.color="white";
    optBtns[i].innerText= qObj.options[i];
  }

  // rung's prize
  if(prizeEl) {
    prizeEl.innerText= prizeLadder[currentQuestionIndex].toLocaleString();
  }
}

// check answer
function checkAnswer(selectedIndex){
  stopTimer();
  if(currentQuestionIndex<0 || currentQuestionIndex>= questions.length){
    // just in case
    onLose("No question found.");
    return;
  }
  const qObj= questions[currentQuestionIndex];
  const correct= qObj.correctAnswer;
  const chosenBtn= optBtns[selectedIndex];

  if(selectedIndex=== correct){
    // correct
    if(currentQuestionIndex===14){
      // final rung => confetti
      setTimeout(()=>{
        confetti({ particleCount:200, spread:90, origin:{y:0.6}});
      },200);
      setTimeout(()=> onWin(),1000);
    } else {
      chosenBtn.style.backgroundColor="green";
      chosenBtn.style.color="white";
      setTimeout(()=>{
        chosenBtn.style.backgroundColor="black";
        chosenBtn.style.color="white";
        goToNextQuestion();
      },1000);
    }
  } else {
    // wrong => user loses
    chosenBtn.style.backgroundColor="red";
    chosenBtn.style.color="white";
    setTimeout(()=>{
      chosenBtn.style.backgroundColor="black";
      chosenBtn.style.color="white";

      const letter=["A","B","C","D"][correct];
      const text=`
        <h2>Wrong!</h2>
        <p>The correct answer is <strong>${letter}</strong>.</p>
        <p>${qObj.explanation}</p>
        <button style="font-size:1.1rem; padding:10px; cursor:pointer;"
                onclick="startNewGame()">New Game</button>
      `;
      showExplanationOverlay(text);
    },1000);
  }
}

function goToNextQuestion(){
  currentQuestionIndex++;
  if(currentQuestionIndex>=15){
    // answered 15 rung => big win
    onWin();
  } else {
    displayQuestion();
  }
}

function onWin(){
  const text=`
    <h2>Congratulations!</h2>
    <p>You answered all 15 questions!</p>
    <p>You won €1,000,000!</p>
    <button style="font-size:1.1rem; padding:10px; cursor:pointer;"
            onclick="startNewGame()">Play Again</button>
  `;
  showExplanationOverlay(text);
}

function onLose(reason){
  const text=`
    <h2>${reason}</h2>
    <p>You reached question #${currentQuestionIndex+1}.</p>
    <p>Unfortunately, you lost. Try again!</p>
    <button style="font-size:1.1rem; padding:10px; cursor:pointer;"
            onclick="startNewGame()">New Game</button>
  `;
  showExplanationOverlay(text);
}

// Start or restart
function startNewGame(){
  hideExplanationOverlay();
  hideSpeechBubble();
  hideAudienceChart();
  stopTimer();

  currentQuestionIndex=0;
  usedFifty=false;
  usedPhone=false;
  usedAudience=false;

  // safety check if <15 questions
  if(questions.length<15){
    showExplanationOverlay(`
      <h2>Error</h2>
      <p>We need at least 15 questions, but found only ${questions.length}.</p>
      <p>Please add more questions.</p>
    `);
    return;
  }

  shuffleArray(questions);
  displayQuestion();
}

// We handle both DOMContentLoaded and window.onload for safety
document.addEventListener("DOMContentLoaded", ()=>{
  // Initialize references
  initDOMReferences();
});

window.onload= function(){
  // If references exist, we proceed
  if(!document.getElementById("question")){
    console.log("DOM not fully loaded? question element missing.");
    return;
  }

  // final check
  if(!questions || questions.length<15){
    console.log("Error: not enough questions to play 15 rung game");
    return;
  }

  // Start
  shuffleArray(questions);
  startNewGame();
};
