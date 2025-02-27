// Game Data
const prizeLevels = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000];
let currentQuestionIndex = 0;
let prize = 0;
let usedQuestions = [];
let timer;
let timeLeft = 30;

// Hardcoded Questions (30 questions)
const questions = [
    // 1
    {
      question: "In which year does the novel Atonement begin?",
      options: ["A. 1935", "B. 1940", "C. 1929", "D. 1951"],
      correctAnswer: 0 // A is correct
    },
    // 2
    {
      question: "Why does Briony falsely accuse Robbie?",
      options: ["A. She wants revenge on him.", "B. She misinterprets a scene between him and Cecilia.", "C. Lola convinced her to do it.", "D. She found incriminating evidence."],
      correctAnswer: 1 // B is correct
    },
    // 3
    {
      question: "Where does the first part of the novel take place?",
      options: ["A. In London", "B. In Paris", "C. At the Tallis estate", "D. In a boarding school"],
      correctAnswer: 2 // C is correct
    },
    // 4
    {
      question: "What happens to Robbie after he is accused?",
      options: ["A. He flees to France.", "B. He joins the army immediately.", "C. He goes into exile in America.", "D. He is arrested and sent to prison."],
      correctAnswer: 3 // D is correct
    },
    // 5
    {
      question: "During which war does Robbie serve?",
      options: ["A. World War II", "B. World War I", "C. Falklands War", "D. Vietnam War"],
      correctAnswer: 0 // A is correct
    },
    // 6
    {
      question: "How does Robbie die?",
      options: ["A. He is shot in battle.", "B. He drowns during the evacuation.", "C. He dies in an explosion.", "D. He dies of an infection in France."],
      correctAnswer: 3 // D is correct
    },
    // 7
    {
      question: "What happens to Cecilia?",
      options: ["A. She becomes a nurse in France.", "B. She moves to America.", "C. She marries Paul Marshall.", "D. She dies in a bombing raid in London."],
      correctAnswer: 3 // D is correct
    },
    // 8
    {
      question: "What does Briony reveal in the epilogue?",
      options: ["A. That Robbie actually survived.", "B. That she withdrew her accusation in court.", "C. That the reunion never happened.", "D. That Paul Marshall was arrested."],
      correctAnswer: 2 // C is correct
    },
    // 9
    {
      question: "How does Briony attempt to atone for her mistake?",
      options: ["A. She moves to France to work as a nurse.", "B. She donates money to Robbie’s family.", "C. She travels to Canada to prove Robbie’s innocence.", "D. She writes a novel about the events."],
      correctAnswer: 3 // D is correct
    },
    // 10
    {
      question: "What does the title Atonement mean?",
      options: ["A. Truth", "B. Reconciliation", "C. Deception", "D. Redemption"],
      correctAnswer: 1 // B is correct
    },
    // 11
    {
      question: "What literary device is heavily used in Atonement?",
      options: ["A. Unreliable Narration", "B. Epistolary Format", "C. First-Person Narrative", "D. Omniscient Narration"],
      correctAnswer: 0 // A is correct
    },
    // 12
    {
      question: "What symbolizes broken relationships in the novel?",
      options: ["A. The library", "B. The Tallis mansion", "C. Briony's notebook", "D. The broken vase"],
      correctAnswer: 3 // D is correct
    },
    // 13
    {
      question: "How does Briony’s character develop?",
      options: ["A. From timid to aggressive", "B. From self-righteous to remorseful", "C. From indifferent to passionate", "D. From naive to vengeful"],
      correctAnswer: 1 // B is correct
    },
    // 14
    {
      question: "Why is Paul Marshall important?",
      options: ["A. He is Briony's tutor", "B. He helps Robbie join the army", "C. He is the actual perpetrator", "D. He fights alongside Robbie"],
      correctAnswer: 2 // C is correct
    },
    // 15
    {
      question: "Which war event is depicted in Atonement?",
      options: ["A. D-Day landings", "B. Dunkirk evacuation", "C. The Battle of Britain", "D. The Battle of the Somme"],
      correctAnswer: 1 // B is correct
    },
    // 16
    {
      question: "Why is Briony considered an unreliable narrator?",
      options: ["A. She was never present at key events.", "B. She is too young to understand.", "C. She is influenced by her parents.", "D. She rewrites history in her novel."],
      correctAnswer: 3 // D is correct
    },
    // 17
    {
      question: "Which object does Cecilia break near the fountain?",
      options: ["A. A mirror", "B. A glass", "C. A vase", "D. A lamp"],
      correctAnswer: 2 // C is correct
    },
    // 18
    {
      question: "Which character is actually responsible for assaulting Lola?",
      options: ["A. Robbie Turner", "B. Leon Tallis", "C. Paul Marshall", "D. Danny Hardman"],
      correctAnswer: 2 // C is correct
    },
    // 19
    {
      question: "How does Briony first misinterpret Robbie’s intentions?",
      options: ["A. She reads his private letter", "B. She sees him at the fountain", "C. She catches him stealing money", "D. She overhears a phone call"],
      correctAnswer: 1 // B is correct
    },
    // 20
    {
      question: "What is the central theme of Atonement?",
      options: ["A. Class conflict", "B. Justice vs. injustice", "C. Guilt and redemption", "D. War and peace"],
      correctAnswer: 2 // C is correct
    },
    // 21
    {
      question: "Who is the eldest sibling in the Tallis family?",
      options: ["A. Briony", "B. Lola", "C. Cecilia", "D. Leon"],
      correctAnswer: 3 // D is correct
    },
    // 22
    {
      question: "Which character profits from war manufacturing?",
      options: ["A. Robbie Turner", "B. Emily Tallis", "C. Paul Marshall", "D. Leon Tallis"],
      correctAnswer: 2 // C is correct
    },
    // 23
    {
      question: "What triggers Briony’s deep guilt?",
      options: ["A. Realizing Paul was the real attacker", "B. Seeing Cecilia’s heartbreak", "C. Reading Robbie’s letters", "D. Lola’s direct confession"],
      correctAnswer: 0 // A is correct
    },
    // 24
    {
      question: "What is Emily Tallis’s notable trait?",
      options: ["A. She is overprotective", "B. She is distant and ineffective", "C. She is a nurse in the war", "D. She helps Robbie escape"],
      correctAnswer: 1 // B is correct
    },
    // 25
    {
      question: "Why does Briony choose to become a nurse?",
      options: ["A. To find a new career path", "B. To atone for her false accusation", "C. Because Cecilia forces her", "D. To earn money after the war"],
      correctAnswer: 1 // B is correct
    },
    // 26
    {
      question: "How is social class a major factor in Robbie’s conviction?",
      options: ["A. He is wealthy and influential", "B. His mother is the Tallis housekeeper", "C. He went to Oxford with Leon", "D. He was already a known criminal"],
      correctAnswer: 1 // B is correct
    },
    // 27
    {
      question: "Which writing style does Ian McEwan employ in Atonement?",
      options: ["A. Strict first-person ", "B. Non-linear, multiple perspectives", "C. Pure dialogue", "D. Epistolary novel"],
      correctAnswer: 1 // B is correct
    },
    // 28
    {
      question: "What does Briony’s final manuscript reveal about her?",
      options: ["A. She profited from telling lies", "B. She wanted to hide the truth forever", "C. She tried to give Robbie and Cecilia a happy ending", "D. She despised the Tallis family"],
      correctAnswer: 2 // C is correct
    },
    // 29
    {
      question: "Why is Briony’s version of events not fully reliable?",
      options: ["A. She heard everything second-hand", "B. She was influenced by Paul Marshall", "C. She was only 13 when she witnessed key moments", "D. She never read Robbie’s letters"],
      correctAnswer: 2 // C is correct
    },
    // 30
    {
      question: "Which best describes Robbie’s background?",
      options: ["A. Aristocratic son of a noble", "B. A middle-class student at Cambridge", "C. Son of the family’s housekeeper", "D. Childhood friend of Lola"],
      correctAnswer: 2 // C is correct
    },
    // 31
    {
      question: "Which city does Briony move to for her nurse training?",
      options: ["A. Manchester", "B. Edinburgh", "C. London", "D. Cambridge"],
      correctAnswer: 2 // C is correct
    },
    // 32
    {
      question: "How does the war setting affect Robbie’s hopes?",
      options: ["A. It gives him a quick path to wealth", "B. It forces him to remain at home", "C. It allows him to prove his innocence", "D. It prevents him from reuniting with Cecilia"],
      correctAnswer: 3 // D is correct
    },
    // 33
    {
      question: "What is Lola’s ultimate fate in the novel?",
      options: ["A. She marries Paul Marshall", "B. She confesses Robbie’s innocence", "C. She becomes Briony’s ally", "D. She dies in the war"],
      correctAnswer: 0 // A is correct
    },
    // 34
    {
      question: "Which metaphor is used for Briony’s attempt at rewriting reality?",
      options: ["A. Playing God as a novelist", "B. Fixing a broken mirror", "C. Sailing a ship in a storm", "D. Counting stars in daylight"],
      correctAnswer: 0 // A is correct
    },
    // 35
    {
      question: "What role does the library scene play?",
      options: ["A. It is where Cecilia reads letters to Briony", "B. It is where Robbie and Cecilia’s intimacy is discovered", "C. It is where Paul assaults Lola", "D. It is where Briony confesses her lie"],
      correctAnswer: 1 // B is correct
    },
    // 36
    {
      question: "Which statement about Emily Tallis is true?",
      options: ["A. She strongly supports Robbie", "B. She often suspects Paul Marshall", "C. She suffers from chronic migraines", "D. She becomes a war nurse"],
      correctAnswer: 2 // C is correct
    },
    // 37
    {
      question: "How does the novel highlight class prejudice?",
      options: ["A. By showing Robbie is disbelieved due to his status", "B. By depicting Cecilia as poor", "C. By Lola receiving money from Briony", "D. By Briony being forced to do chores"],
      correctAnswer: 0 // A is correct
    },
    // 38
    {
      question: "Which style does McEwan use to depict Robbie’s war experience?",
      options: ["A. Humorous anecdotes", "B. Detailed realism", "C. Stream-of-consciousness poetry", "D. Epic fantasy imagery"],
      correctAnswer: 1 // B is correct
    },
    // 39
    {
      question: "Why is Lola reluctant to name her attacker?",
      options: ["A. She genuinely doesn’t remember", "B. She fears nobody will believe her", "C. She is intimidated by Paul Marshall’s status", "D. She wants to protect Robbie"],
      correctAnswer: 2 // C is correct
    },
    // 40
    {
      question: "How does Briony find out the truth about Lola’s assault?",
      options: ["A. Lola confesses years later", "B. Paul Marshall admits it", "C. She reads Lola’s diary", "D. She deduces it from small clues"],
      correctAnswer: 3 // D is correct
    },
    // 41
    {
      question: "Which location is central to the early conflict?",
      options: ["A. The fountain", "B. The nursery", "C. The basement", "D. The attic"],
      correctAnswer: 0 // A is correct
    },
    // 42
    {
      question: "What is Briony’s biggest regret?",
      options: ["A. Not spending enough time with Lola", "B. Not becoming a writer sooner", "C. Falsely condemning Robbie", "D. Disagreeing with her mother"],
      correctAnswer: 2 // C is correct
    },
    // 43
    {
      question: "What does the Dunkirk retreat symbolize for Robbie?",
      options: ["A. A chance to be a war hero", "B. A hopeless journey away from Cecilia", "C. An opportunity to prove his innocence", "D. A triumphant moment of survival"],
      correctAnswer: 1 // B is correct
    },
    // 44
    {
      question: "Who eventually marries Lola?",
      options: ["A. Leon Tallis", "B. Robbie Turner", "C. Paul Marshall", "D. Danny Hardman"],
      correctAnswer: 2 // C is correct
    },
    // 45
    {
      question: "How does Cecilia react to her family’s treatment of Robbie?",
      options: ["A. She sides with them and denounces Robbie", "B. She breaks ties with her family", "C. She tries to bribe the court", "D. She believes Briony’s story fully"],
      correctAnswer: 1 // B is correct
    },
    // 46
    {
      question: "Why does Robbie write an explicit letter to Cecilia?",
      options: ["A. He wants to threaten her", "B. He mistakes it for a different draft", "C. He intends to share it with her parents", "D. He tries to prove his innocence"],
      correctAnswer: 1 // B is correct
    },
    // 47
    {
      question: "What narrative twist is revealed at the novel’s end?",
      options: ["A. Robbie survived the war", "B. Cecilia married someone else", "C. Briony invented a happier ending in her book", "D. Lola confessed in court"],
      correctAnswer: 2 // C is correct
    },
    // 48
    {
      question: "How does Briony’s nursing experience affect her?",
      options: ["A. She forgets about her past", "B. She becomes more detached", "C. She feels more guilt seeing real suffering", "D. She decides to become a doctor"],
      correctAnswer: 2 // C is correct
    },
    // 49
    {
      question: "Which of these is a recurring motif in Atonement?",
      options: ["A. Letters and writing", "B. Swords and shields", "C. Musical performances", "D. Masks and costumes"],
      correctAnswer: 0 // A is correct
    },
    // 50
    {
      question: "How does Ian McEwan portray the British class system?",
      options: ["A. He shows it as fair and equal", "B. He ignores it entirely", "C. He highlights how it fuels injustice", "D. He glamorizes upper-class life"],
      correctAnswer: 2 // C is correct
    },
    // 51
    {
      question: "What do Robbie’s letters from prison represent?",
      options: ["A. His desperate hope", "B. His anger at Briony", "C. His financial ruin", "D. His plan for revenge"],
      correctAnswer: 0 // A is correct
    },
    // 52
    {
      question: "Why does Briony question her memory of the assault?",
      options: ["A. She reads conflicting testimonies", "B. She was half asleep", "C. She never actually saw the attacker’s face", "D. She had a fever that night"],
      correctAnswer: 2 // C is correct
    },
    // 53
    {
      question: "Which emotion primarily drives Briony’s actions at 13?",
      options: ["A. Jealousy", "B. Compassion", "C. Curiosity", "D. Imaginative overreach"],
      correctAnswer: 3 // D is correct
    },
    // 54
    {
      question: "Where does Briony finally confront Cecilia and Robbie?",
      options: ["A. At the Tallis estate", "B. In a London apartment", "C. During the Dunkirk evacuation", "D. Inside a hospital ward"],
      correctAnswer: 1 // B is correct
    },
    // 55
    {
      question: "Which best describes Ian McEwan’s prose style in Atonement?",
      options: ["A. Stark and minimalistic", "B. Poetic and detailed", "C. Fragmented and incoherent", "D. Simplistic and plain"],
      correctAnswer: 1 // B is correct
    },
    // 56
    {
      question: "How does the novel handle the concept of truth?",
      options: ["A. Truth is absolute and objective", "B. Truth is shaped by perception and memory", "C. Truth is irrelevant to the plot", "D. Truth is quickly revealed"],
      correctAnswer: 1 // B is correct
    },
    // 57
    {
      question: "Which detail reveals Paul Marshall’s guilt?",
      options: ["A. A scratch on his face", "B. A hidden letter", "C. His footprints by the fountain", "D. A watch found in Lola’s room"],
      correctAnswer: 0 // A is correct
    },
    // 58
    {
      question: "What motif highlights Briony’s desire to create stories?",
      options: ["A. Her toy soldiers", "B. Her constant playwriting", "C. Her interest in photography", "D. Her obsession with painting"],
      correctAnswer: 1 // B is correct
    },
    // 59
    {
      question: "How does Robbie’s Cambridge education affect his standing?",
      options: ["A. He is seen as a social climber", "B. He gains full acceptance by the Tallis family", "C. He refuses to return home", "D. He rejects Cecilia’s affection"],
      correctAnswer: 0 // A is correct
    },
    // 60
    {
      question: "What is the outcome of Lola’s marriage to Paul Marshall?",
      options: ["A. She exposes him years later", "B. She divorces him in public scandal", "C. They remain silent about the assault", "D. They donate to Robbie’s memorial"],
      correctAnswer: 2 // C is correct
    },
    // 61
    {
      question: "Why does Cecilia refuse to see her family?",
      options: ["A. They sold the family estate", "B. They stood by Briony’s accusation", "C. They moved abroad", "D. They forcibly enlisted Robbie"],
      correctAnswer: 1 // B is correct
    },
    // 62
    {
      question: "Which emotion does Briony struggle with most as an adult?",
      options: ["A. Indifference", "B. Pride", "C. Guilt", "D. Rage"],
      correctAnswer: 2 // C is correct
    },
    // 63
    {
      question: "What does Briony hope her novel will achieve?",
      options: ["A. Legal exoneration of Robbie", "B. A posthumous pardon from Cecilia", "C. A sense of personal redemption", "D. Monetary success and fame"],
      correctAnswer: 2 // C is correct
    },
    // 64
    {
      question: "How does McEwan portray the hospital environment?",
      options: ["A. Chaotic but revealing of character growth", "B. Peaceful and comforting", "C. Negligent and abusive", "D. Comical and light-hearted"],
      correctAnswer: 0 // A is correct
    },
    // 65
    {
      question: "Which statement about Robbie and Cecilia’s relationship is true?",
      options: ["A. They are distant cousins", "B. They met during the war", "C. Their love is cut short by false accusations", "D. They marry in secret"],
      correctAnswer: 2 // C is correct
    },
    // 66
    {
      question: "Which form of narrative is used in the final section?",
      options: ["A. Briony as an elderly first-person narrator", "B. Pure dialogue with no narrator", "C. An omniscient narrator describing Briony’s future", "D. A police report about Lola’s case"],
      correctAnswer: 0 // A is correct
    },
    // 67
    {
      question: "How does the novel comment on the power of imagination?",
      options: ["A. It creates unity among characters", "B. It leads to misunderstanding and tragedy", "C. It helps Robbie survive the war", "D. It is trivial and dismissed"],
      correctAnswer: 1 // B is correct
    },
    // 68
    {
      question: "What aspect of British society is most critiqued?",
      options: ["A. The monarchy", "B. The judicial system", "C. The class divide", "D. The educational system"],
      correctAnswer: 2 // C is correct
    },
    // 69
    {
      question: "What does Briony realize when she witnesses the war’s brutality?",
      options: ["A. Her lie is insignificant compared to war", "B. She must travel to France to find Robbie", "C. Paul Marshall is also at war", "D. Cecilia died in Dunkirk"],
      correctAnswer: 0 // A is correct
    },
    // 70
    {
      question: "How does the reader learn that Robbie and Cecilia never reunited?",
      options: ["A. From a newspaper article", "B. From Briony’s final revelation", "C. From Emily Tallis’s confession", "D. From letters found in Dunkirk"],
      correctAnswer: 1 // B is correct
    },
    // 71
    {
      question: "Which character do many blame for Lola’s assault?",
      options: ["A. Danny Hardman", "B. Leon Tallis", "C. Robbie Turner", "D. Briony herself"],
      correctAnswer: 2 // C is correct
    },
    // 72
    {
      question: "What does the scene by the fountain represent thematically?",
      options: ["A. Innocence restored", "B. The moment that triggers Briony’s false narrative", "C. Cecilia rejecting Robbie", "D. Briony’s first act of heroism"],
      correctAnswer: 1 // B is correct
    },
    // 73
    {
      question: "Which object best symbolizes false evidence in the novel?",
      options: ["A. Robbie’s explicit letter", "B. Lola’s torn dress", "C. The broken vase", "D. Cecilia’s necklace"],
      correctAnswer: 0 // A is correct
    },
    // 74
    {
      question: "What is the relationship between Briony and Lola?",
      options: ["A. They are siblings", "B. They are cousins", "C. They are best friends", "D. They never meet"],
      correctAnswer: 1 // B is correct
    },
    // 75
    {
      question: "How does Leon react to the family conflict?",
      options: ["A. He ignores it, focusing on social events", "B. He defends Robbie fiercely", "C. He tries to mediate a reunion", "D. He confesses the crime himself"],
      correctAnswer: 0 // A is correct
    },
    // 76
    {
      question: "Which best describes the tone of Atonement?",
      options: ["A. Lighthearted and comedic", "B. Dark, suspenseful, and reflective", "C. Fast-paced action", "D. Primarily satirical"],
      correctAnswer: 1 // B is correct
    },
    // 77
    {
      question: "Which location becomes a symbol of Briony’s isolation?",
      options: ["A. The attic", "B. The hospital ward", "C. The greenhouse", "D. The nursery"],
      correctAnswer: 1 // B is correct
    },
    // 78
    {
      question: "Which theme is highlighted by Lola’s marriage to her attacker?",
      options: ["A. Forgiveness", "B. The complexity of trauma", "C. Briony’s redemption", "D. True love conquers all"],
      correctAnswer: 1 // B is correct
    },
    // 79
    {
      question: "Which format does the novel’s final reveal take?",
      options: ["A. A letter to Robbie", "B. An elderly Briony’s narration", "C. A court document", "D. Cecilia’s diary"],
      correctAnswer: 1 // B is correct
    },
    // 80
    {
      question: "What does the Dunkirk setting convey?",
      options: ["A. Briony’s childhood innocence", "B. The chaos and tragedy of war", "C. Cecilia’s deep regrets", "D. Paul Marshall’s redemption"],
      correctAnswer: 1 // B is correct
    },
    // 81
    {
      question: "Which detail proves Robbie’s innocence was never legally established?",
      options: ["A. A hidden witness was never found", "B. The police refused to reopen the case", "C. Briony never retracted her statement in time", "D. Lola testified against him in court"],
      correctAnswer: 2 // C is correct
    },
    // 82
    {
      question: "How does the older Briony view her younger self?",
      options: ["A. She sees her as heroic", "B. She thinks she was courageous", "C. She considers her naive and destructive", "D. She admires her determination"],
      correctAnswer: 2 // C is correct
    },
    // 83
    {
      question: "Which character is described as a war profiteer?",
      options: ["A. Robbie Turner", "B. Paul Marshall", "C. Leon Tallis", "D. Danny Hardman"],
      correctAnswer: 1 // B is correct
    },
    // 84
    {
      question: "How does Atonement address the notion of forgiveness?",
      options: ["A. It is immediate and unconditional", "B. It is partial and comes only after war", "C. It never fully materializes for Briony", "D. It is enforced by the Tallis family"],
      correctAnswer: 2 // C is correct
    },
    // 85
    {
      question: "Why does Briony fail to correct her lie sooner?",
      options: ["A. She fears legal consequences", "B. She moves overseas before telling anyone", "C. She forgets what happened", "D. She is manipulated by Lola"],
      correctAnswer: 0 // A is correct
    },
    // 86
    {
      question: "Which best describes the novel's structure?",
      options: ["A. Strictly chronological", "B. Multiple time frames leading to an epilogue", "C. Told entirely through letters", "D. A single day retold from various angles"],
      correctAnswer: 1 // B is correct
    },
    // 87
    {
      question: "How does Emily Tallis react to Robbie’s situation?",
      options: ["A. She staunchly defends him", "B. She blames Briony for exaggerating", "C. She believes Robbie is guilty", "D. She tries to reconcile them"],
      correctAnswer: 2 // C is correct
    },
    // 88
    {
      question: "Why is the library scene shocking to Briony?",
      options: ["A. She witnesses Cecilia and Robbie’s intimacy", "B. She sees Lola’s assault there", "C. She finds her mother unconscious", "D. She reads secret letters"],
      correctAnswer: 0 // A is correct
    },
    // 89
    {
      question: "What does Briony’s change of heart signify?",
      options: ["A. She stops believing in war", "B. She regrets becoming a nurse", "C. She realizes the magnitude of her lie", "D. She decides to blame Lola instead"],
      correctAnswer: 2 // C is correct
    },
    // 90
    {
      question: "Which word best describes Robbie’s character?",
      options: ["A. Vindictive", "B. Ambitious", "C. Cowardly", "D. Manipulative"],
      correctAnswer: 1 // B is correct
    },
    // 91
    {
      question: "How does McEwan portray childhood imagination?",
      options: ["A. As a harmless pastime", "B. As the cause of the entire tragedy", "C. As necessary for survival", "D. As irrelevant to the plot"],
      correctAnswer: 1 // B is correct
    },
    // 92
    {
      question: "Which evidence do the police primarily rely on to arrest Robbie?",
      options: ["A. Briony’s eyewitness claim", "B. Physical clues at the crime scene", "C. A signed confession", "D. Cecilia’s statement"],
      correctAnswer: 0 // A is correct
    },
    // 93
    {
      question: "What do we learn about the final reunion scene between Briony, Cecilia, and Robbie?",
      options: ["A. It was a legal proceeding", "B. It was Briony’s dream", "C. It never actually happened", "D. It ended with forgiveness"],
      correctAnswer: 2 // C is correct
    },
    // 94
    {
      question: "Why does the older Briony fear vascular dementia?",
      options: ["A. She worries she will forget to publish her novel", "B. She wants to move to America before it worsens", "C. She fears she can't maintain the lie about Paul", "D. She dreads losing her memories of guilt and atonement"],
      correctAnswer: 3 // D is correct
    },
    // 95
    {
      question: "How does Atonement end for Briony?",
      options: ["A. In total ignorance of her past", "B. In peace after Robbie forgives her", "C. In regret over her inability to fully atone", "D. In legal trouble for perjury"],
      correctAnswer: 2 // C is correct
    },
    // 96
    {
      question: "Which best describes Cecilia’s stance toward her family post-accusation?",
      options: ["A. She defends their decision", "B. She demands Robbie apologize", "C. She severs ties and supports Robbie", "D. She remains neutral"],
      correctAnswer: 2 // C is correct
    },
    // 97
    {
      question: "What does Briony’s writing ultimately fail to achieve?",
      options: ["A. Critical acclaim", "B. A new trial for Robbie", "C. A marriage between Lola and Robbie", "D. True redemption for her guilt"],
      correctAnswer: 3 // D is correct
    },
    // 98
    {
      question: "Which factor most strongly motivated Briony to lie?",
      options: ["A. Desire for revenge", "B. Mistaken sense of protecting Cecilia", "C. Pressure from her parents", "D. Greed for inheritance"],
      correctAnswer: 1 // B is correct
    },
    // 99
    {
      question: "How does the war highlight the fragility of human plans?",
      options: ["A. Robbie and Cecilia never fulfill their hopes", "B. Briony’s illusions are validated by war", "C. Lola ascends in wealth by war profiteering", "D. Emily becomes a patriot"],
      correctAnswer: 0 // A is correct
    },
    // 100
    {
      question: "Which statement sums up the message of Atonement?",
      options: ["A. Love always conquers injustice", "B. War is glorified for personal gain", "C. Guilt can linger when mistakes are never righted", "D. Childhood illusions are harmless"],
      correctAnswer: 2 // C is correct
    }
  ];

// DOM Elements
const questionElement = document.getElementById('question');
const optionElements = [
    document.getElementById('opt0'),
    document.getElementById('opt1'),
    document.getElementById('opt2'),
    document.getElementById('opt3')
];
const prizeElement = document.getElementById('prize');
const ladderDisplay = document.getElementById('ladder-display');
const speechBubble = document.getElementById('speech-bubble');
const timerElement = document.getElementById('timer');
const audienceChartContainer = document.getElementById('audience-chart-container');

// Sound Effects
const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');
const lifelineSound = new Audio('lifeline.mp3');

// Herr Hesse Text Variants
const herrHesseTexts = [
    "I'm pretty sure it's {answer}... but don't blame me if I'm wrong!",
    "Hmm, I think it's {answer}. But I'm not entirely confident.",
    "My gut says {answer}. Good luck!",
    "I'd go with {answer}, but I'm not an expert.",
    "It's definitely {answer}. Or maybe not. Who knows?"
];

// Start Game
function startGame() {
    prize = 0;
    currentQuestionIndex = 0;
    usedQuestions = [];
    updatePrize();
    loadQuestion();
    startTimer();
}

// Load a Random Question
function loadQuestion() {
    if (usedQuestions.length === questions.length) {
        alert('Congratulations! You answered all questions!');
        return;
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedQuestions.includes(randomIndex));

    usedQuestions.push(randomIndex);
    const question = questions[randomIndex];

    questionElement.innerText = question.question;
    optionElements.forEach((opt, index) => {
        opt.innerText = question.options[index];
        opt.disabled = false;
        opt.style.backgroundColor = 'black';
        opt.style.color = 'white';
        opt.style.opacity = 1;
    });

    highlightCurrentLevel();
    resetTimer(); // Reset the timer for the new question
}

// Check Answer
function checkAnswer(selectedIndex) {
    clearInterval(timer); // Stop the timer
    const questionIndex = usedQuestions[currentQuestionIndex];
    const correctIndex = questions[questionIndex].correctAnswer;

    if (selectedIndex === correctIndex) {
        correctSound.play();
        optionElements[selectedIndex].style.backgroundColor = 'green'; // Highlight correct answer
        prize = prizeLevels[currentQuestionIndex];
        currentQuestionIndex++;
        updatePrize();
        if (currentQuestionIndex === prizeLevels.length) {
            celebrateWin();
        } else {
            setTimeout(() => {
                loadQuestion();
            }, 1000); // Delay before loading the next question
        }
    } else {
        wrongSound.play();
        optionElements[selectedIndex].style.backgroundColor = 'red'; // Highlight incorrect answer
        optionElements[correctIndex].style.backgroundColor = 'green'; // Show correct answer
        setTimeout(() => {
            endGame();
        }, 1000); // Delay before ending the game
    }
}

// Update Prize
function updatePrize() {
    prizeElement.innerText = prize;
}

// Highlight Current Level on Ladder
function highlightCurrentLevel() {
    const ladderLines = ladderDisplay.innerText.split('\n');
    ladderLines.forEach((line, index) => {
        if (index === 14 - currentQuestionIndex) {
            // Highlight the current level
            ladderLines[index] = `<span class="highlight">${ladderLines[index]}</span>`;
        } else {
            ladderLines[index] = line.trim();
        }
    });
    ladderDisplay.innerHTML = ladderLines.join('<br>');
}

// 50:50 Lifeline
function useFiftyFifty() {
    lifelineSound.play();
    const questionIndex = usedQuestions[currentQuestionIndex];
    const correctIndex = questions[questionIndex].correctAnswer;
    let wrongIndices = [0, 1, 2, 3].filter(i => i !== correctIndex);
    wrongIndices = shuffle(wrongIndices).slice(0, 2); // Remove 2 random incorrect options

    wrongIndices.forEach(i => {
        optionElements[i].disabled = true;
        optionElements[i].style.opacity = 0.5;
    });
}

// Phone a Friend Lifeline
function phoneAFriend() {
    lifelineSound.play();
    const questionIndex = usedQuestions[currentQuestionIndex];
    const correctIndex = questions[questionIndex].correctAnswer;
    const friendIsRight = Math.random() > 0.01; // 70% chance of being correct
    const friendAnswer = friendIsRight ? correctIndex : Math.floor(Math.random() * 4);

    const answerLetter = String.fromCharCode(65 + friendAnswer);
    const randomText = herrHesseTexts[Math.floor(Math.random() * herrHesseTexts.length)];
    const herrHesseMessage = randomText.replace('{answer}', answerLetter);

    speechBubble.innerText = `Herr Hesse says: "${herrHesseMessage}"`;
    speechBubble.style.display = 'block';
    setTimeout(() => speechBubble.style.display = 'none', 5000);
}

// Ask the Audience Lifeline
function askTheAudience() {
    lifelineSound.play();
    const questionIndex = usedQuestions[currentQuestionIndex];
    const correctIndex = questions[questionIndex].correctAnswer;
    const votes = [0, 0, 0, 0];
    votes[correctIndex] = Math.floor(Math.random() * 50 + 50); // Correct answer gets 50-100%
    for (let i = 0; i < 4; i++) {
        if (i !== correctIndex) votes[i] = Math.floor(Math.random() * (100 - votes[correctIndex]));
    }

    const ctx = document.getElementById('audience-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['A', 'B', 'C', 'D'],
            datasets: [{
                label: 'Audience Votes',
                data: votes,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
            }]
        },
        options: { scales: { y: { beginAtZero: true, max: 100 } } }
    });
    audienceChartContainer.style.display = 'block';
}

// Timer Functions
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer); // Clear the existing timer
    timeLeft = 30; // Reset time to 30 seconds
    timerElement.innerText = `Time left: ${timeLeft}s`; // Update the timer display
    startTimer(); // Start the timer again
}

// End Game
function endGame() {
    clearInterval(timer);
    alert(`Game over! You won €${prize}`);
    startGame();
}

// Celebrate Win
function celebrateWin() {
    clearInterval(timer);
    alert('Congratulations! You won €1,000,000!');

    // Get the position of the prize module
    const prizeModule = document.getElementById('prize');
    const rect = prizeModule.getBoundingClientRect();

    // Start confetti animation at the prize module
    confetti({
        particleCount: 100,
        spread: 70,
        origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth, // Horizontal center of the prize module
            y: (rect.top + rect.height / 2) / window.innerHeight // Vertical center of the prize module
        }
    });

    startGame();
}

// Shuffle Array (Helper Function)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start the game when the page loads
startGame();
