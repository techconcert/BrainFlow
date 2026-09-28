const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  { id: 'all', name: 'All Scenarios', icon: 'Sparkles', count: 50 },
  { id: 'substances', name: 'Substances & Addiction', icon: 'Pill', count: 10 },
  { id: 'mental-health', name: 'Mental Health & Mood', icon: 'Brain', count: 10 },
  { id: 'cognitive', name: 'Cognitive & Brain Health', icon: 'Lightbulb', count: 10 },
  { id: 'compulsions', name: 'Compulsions & Tech', icon: 'Smartphone', count: 10 },
  { id: 'neuroplasticity', name: 'Neuroplasticity & Habits', icon: 'Leaf', count: 10 }
];

const SCENARIOS = [
  // ==========================================
  // CATEGORY 1: Substances & Addiction (1 - 10)
  // ==========================================
  {
    id: 'drug-addiction',
    category: 'substances',
    title: 'Drug Addiction',
    subtitle: 'How substances hijack the reward system',
    badge: 'Increased dopamine',
    icon: 'Pill',
    steps: [
      { number: 1, title: 'Substance enters', description: "The substance triggers a massive surge of dopamine in the nucleus accumbens, flooding the reward network far beyond natural rewards.", highlightTarget: 'reward', note: 'Substance triggers unnatural dopamine spike' },
      { number: 2, title: 'Reward system surge', description: 'Ventral striatum and nucleus accumbens fire rapidly, encoding intense euphoria and reinforcing compulsive drug-seeking.', highlightTarget: 'reward', note: 'Dopamine surge encodes intense euphoria' },
      { number: 3, title: 'Habit conditioning', description: 'The amygdala attaches emotional salience to drug cues, while the hippocampus logs environmental context into persistent memories.', highlightTarget: 'hippocampus', note: 'Hippocampus and amygdala log environmental triggers' },
      { number: 4, title: 'Prefrontal hypoactivity', description: 'Over repeated use, the prefrontal cortex loses inhibitory control, weakening self-regulation and accelerating impulsive relapse.', highlightTarget: 'pfc', note: 'Loss of top-down inhibitory self-control' }
    ],
    result: { title: 'The result', description: 'The brain adapts to supra-normal dopamine levels, resulting in cravings, tolerance, and compulsive drug consumption despite severe harm.' },
    goodNews: { title: 'The good news', description: 'Neuroplastic recovery is achievable. Abstinence allows dopamine D2 receptors to upregulate and restores prefrontal synaptic density.', actionText: 'See how recovery works →' },
    timeline: [
      { stage: 'Normal balance', description: 'Homeostatic dopamine release and intact prefrontal executive regulation.' },
      { stage: 'After repeated use', description: 'Hyper-sensitized reward center with overwhelming cue-triggered cravings.' },
      { stage: 'Long-term', description: 'Dopamine D2 receptor downregulation, anhedonia, and diminished executive control.' }
    ]
  },
  {
    id: 'fentanyl',
    category: 'substances',
    title: 'Fentanyl & Opioids',
    subtitle: 'Mu-opioid saturation & fatal respiratory depression',
    badge: 'Opioid receptor crisis',
    icon: 'Syringe',
    steps: [
      { number: 1, title: 'Mu-opioid saturation', description: 'Synthetic fentanyl molecules cross the blood-brain barrier instantaneously, binding to mu-opioid receptors with 50x heroin potency.', highlightTarget: 'reward', note: 'Rapid ultra-potent mu-receptor activation' },
      { number: 2, title: 'Dopamine cascade', description: 'Inhibitory GABA interneurons in the VTA are shut off, releasing an unchecked flood of dopamine into the nucleus accumbens.', highlightTarget: 'reward', note: 'Disinhibition creates massive dopamine discharge' },
      { number: 3, title: 'Brainstem suppression', description: 'High-density opioid receptors in the pre-Bötzinger complex of the medulla are suppressed, halting rhythmic respiratory signaling.', highlightTarget: 'hippocampus', note: 'Pre-Bötzinger respiratory pacemaker arrested' },
      { number: 4, title: 'Hypoxic cortex injury', description: 'Severe oxygen deprivation causes rapid synaptic failure and loss of consciousness across prefrontal cognitive networks.', highlightTarget: 'pfc', note: 'Acute cerebral hypoxia shuts down cortical networks' }
    ],
    result: { title: 'The result', description: 'Fatal respiratory arrest can occur within minutes. Survivors face profound tolerance, severe physical dependence, and intense dysphoria.' },
    goodNews: { title: 'The good news', description: 'Naloxone (Narcan) rapidly displaces fentanyl from mu-opioid receptors. Medication-assisted treatment (buprenorphine) supports recovery.', actionText: 'Explore overdose reversal →' },
    timeline: [
      { stage: 'Normal balance', description: 'Endogenous endorphin regulation and responsive brainstem respiratory control.' },
      { stage: 'After repeated use', description: 'Severe mu-opioid receptor tolerance and lethal risk of respiratory failure.' },
      { stage: 'Long-term', description: 'Severe receptor uncoupling, physical dependency, and chronic pain sensitization.' }
    ]
  },
  {
    id: 'alcohol-dependence',
    category: 'substances',
    title: 'Alcohol Dependence',
    subtitle: 'GABA-A hyper-inhibition & toxic glutamate rebound',
    badge: 'GABA/Glutamate imbalance',
    icon: 'Wine',
    steps: [
      { number: 1, title: 'GABA-A potentiated', description: 'Ethanol binds allosterically to GABA-A receptors, increasing chloride influx and inducing widespread neural sedation.', highlightTarget: 'pfc', note: 'Sedative chloride influx slows brain processing' },
      { number: 2, title: 'NMDA glutamate shutoff', description: 'Excitatory NMDA receptors are blocked, impairing long-term potentiation in the hippocampus and causing memory blackouts.', highlightTarget: 'hippocampus', note: 'NMDA blockade halts synaptic memory formation' },
      { number: 3, title: 'Striatal reward pulse', description: 'Endorphin release in the ventral tegmental area stimulates dopamine release, providing short-term tension relief.', highlightTarget: 'reward', note: 'Transient dopamine elevation reinforces intake' },
      { number: 4, title: 'Glutamate storm rebound', description: 'As alcohol clears, upregulated glutamate receptors become hyper-excitable, triggering tremors, severe anxiety, and seizure risks.', highlightTarget: 'amygdala', note: 'Hyperexcitable rebound causes withdrawal tremors' }
    ],
    result: { title: 'The result', description: 'Chronic consumption causes neurotoxicity, cerebellar shrinkage, cognitive impairment, and severe withdrawal symptoms.' },
    goodNews: { title: 'The good news', description: 'Brain volume regenerates significantly within months of sobriety as neurogenesis resumes in the subventricular zone.', actionText: 'See neurological healing →' },
    timeline: [
      { stage: 'Normal balance', description: 'Balanced excitatory glutamate and inhibitory GABA neurotransmission.' },
      { stage: 'After repeated use', description: 'GABA receptor desensitization and rising anxiety during withdrawal periods.' },
      { stage: 'Long-term', description: 'Excitotoxic brain volume loss and chronic cerebellar motor ataxia.' }
    ]
  },
  {
    id: 'cocaine-surge',
    category: 'substances',
    title: 'Cocaine & Crack',
    subtitle: 'Dopamine transporter blockade & vascular constriction',
    badge: 'DAT reuptake blockade',
    icon: 'Zap',
    steps: [
      { number: 1, title: 'Transporter blockade', description: 'Cocaine binds to dopamine reuptake transporters (DAT), trapping dopamine molecules inside the synaptic cleft.', highlightTarget: 'reward', note: 'Dopamine remains trapped in the synaptic gap' },
      { number: 2, title: 'Hyper-dopaminergic surge', description: 'Continuous synaptic stimulation produces intense manic euphoria, hyper-vigilance, and rapid heart acceleration.', highlightTarget: 'reward', note: 'Uninterrupted receptor firing creates hyper-arousal' },
      { number: 3, title: 'Cerebral vasoconstriction', description: 'Excess norepinephrine constricts cerebral arterioles, starving frontoparietal cortex regions of vital oxygen and glucose.', highlightTarget: 'pfc', note: 'Arteriole constriction restricts cerebral blood flow' },
      { number: 4, title: 'Crash & monoamine depletion', description: 'Dopamine vesicular stores are exhausted, plummeting the brain into acute dysphoria, paranoia, and obsessive re-dosing cravings.', highlightTarget: 'amygdala', note: 'Neurotransmitter exhaustion triggers intense panic' }
    ],
    result: { title: 'The result', description: 'Profound psychological dependence develops rapidly with structural thinning of the orbitofrontal cortex and vascular stroke risk.' },
    goodNews: { title: 'The good news', description: 'Behavioral therapy (CBT) and contingency management effectively rewire the striatum to restore natural reward responsiveness.', actionText: 'Learn reward reset →' },
    timeline: [
      { stage: 'Normal balance', description: 'Dynamic dopamine reuptake and intact prefrontal vascular regulation.' },
      { stage: 'After repeated use', description: 'Severe transporter down-regulation and high-risk compulsive binge cycles.' },
      { stage: 'Long-term', description: 'Orbitofrontal gray matter loss, chronic paranoia, and blunted affect.' }
    ]
  },
  {
    id: 'nicotine-vaping',
    category: 'substances',
    title: 'Nicotine & Vaping',
    subtitle: 'nAChR desensitization & rapid withdrawal loops',
    badge: 'Cholinergic hijacking',
    icon: 'Cigarette',
    steps: [
      { number: 1, title: 'Inhaled receptor strike', description: 'Inhaled vapor delivers nicotine to alpha4-beta2 nicotinic acetylcholine receptors in the brain within 7 seconds.', highlightTarget: 'reward', note: 'Nicotine hits brain receptors within 7 seconds' },
      { number: 2, title: 'Flash dopamine pulse', description: 'Ventral tegmental area neurons depolarize instantly, releasing a brief surge of dopamine in the nucleus accumbens.', highlightTarget: 'reward', note: 'Immediate brief dopamine spike produces relief' },
      { number: 3, title: 'Rapid desensitization', description: 'Nicotinic receptors quickly become unresponsive, causing dopamine levels to drop sharply within 45 to 60 minutes.', highlightTarget: 'pfc', note: 'Receptors shut down, creating rapid craving cycles' },
      { number: 4, title: 'Withdrawal irritability', description: 'Amygdalar stress signaling spikes, driving an urgent impulse to vape again solely to stave off psychological withdrawal.', highlightTarget: 'amygdala', note: 'Limbic distress forces next compulsive puff' }
    ],
    result: { title: 'The result', description: 'Upregulation of non-functional receptors traps the user in a continuous cycle of micro-withdrawals throughout every waking hour.' },
    goodNews: { title: 'The good news', description: 'Within 6 to 12 weeks of cessation, nicotinic acetylcholine receptor density returns to normal baseline levels.', actionText: 'See receptor recovery →' },
    timeline: [
      { stage: 'Normal balance', description: 'Homeostatic acetylcholine receptors and steady cognitive focus.' },
      { stage: 'After repeated use', description: 'Receptor multiplication with frequent micro-withdrawal irritability.' },
      { stage: 'Long-term', description: 'Chronic receptor desensitization and dependence on constant nicotine intake.' }
    ]
  },
  {
    id: 'cannabis-tolerance',
    category: 'substances',
    title: 'Cannabis & High-THC',
    subtitle: 'CB1 receptor downregulation & motivational blunting',
    badge: 'Endocannabinoid overload',
    icon: 'Leaf',
    steps: [
      { number: 1, title: 'CB1 receptor saturation', description: 'Exogenous delta-9 THC binds indiscriminately to CB1 receptors across the hippocampus, cortex, and cerebellum.', highlightTarget: 'hippocampus', note: 'THC floods cannabinoid receptors across the brain' },
      { number: 2, title: 'Retrograde signalling halted', description: 'Endogenous anandamide networks are overwhelmed, dampening coordinated neurotransmitter release across synapses.', highlightTarget: 'reward', note: 'Fine-tuned retrograde synaptic gating disrupted' },
      { number: 3, title: 'Working memory impairment', description: 'Hippocampal CA1 pyramidal cells lose synaptic synchrony, severely impairing short-term working memory encoding.', highlightTarget: 'hippocampus', note: 'Hippocampal encoding of new memories impaired' },
      { number: 4, title: 'Motivational circuit blunting', description: 'Striatal dopamine reactivity drops during non-use, leading to the characteristic amotivational syndrome and lethargy.', highlightTarget: 'pfc', note: 'Ventral striatum blunted, reducing intrinsic drive' }
    ],
    result: { title: 'The result', description: 'High-potency THC causes significant CB1 receptor internalisation, resulting in tolerance, cognitive fog, and disrupted sleep architecture.' },
    goodNews: { title: 'The good news', description: 'Brain PET imaging shows CB1 receptor density normalizes within 4 weeks of abstinence, restoring mental clarity and REM sleep.', actionText: 'Learn about CB1 reset →' },
    timeline: [
      { stage: 'Normal balance', description: 'Balanced endocannabinoid retrograde signaling supporting mood and memory.' },
      { stage: 'After repeated use', description: 'Internalized CB1 receptors with reliance on THC for sleep and relaxation.' },
      { stage: 'Long-term', description: 'Marked downregulation of CB1 density and chronic amotivational state.' }
    ]
  },
  {
    id: 'methamphetamine-toxicity',
    category: 'substances',
    title: 'Methamphetamine',
    subtitle: 'VMAT2 reversal & terminal axon neurotoxicity',
    badge: 'Neurotoxic monoamine flood',
    icon: 'Flame',
    steps: [
      { number: 1, title: 'VMAT2 transporter reversal', description: 'Methamphetamine penetrates vesicular monoamine transporters (VMAT2), forcing dopamine directly into the cell cytoplasm.', highlightTarget: 'reward', note: 'Forces vesicular dopamine into cytoplasm' },
      { number: 2, title: 'Reverse transporter dumping', description: 'DAT runs in reverse, dumping catastrophic amounts of dopamine into the synapse for hours on end.', highlightTarget: 'reward', note: 'Transporters run backwards, flooding synapse' },
      { number: 3, title: 'Hyper-excitotoxic storm', description: 'Extreme hyperthermia and reactive oxygen species damage striatal and cortical axon terminals.', highlightTarget: 'pfc', note: 'Free radicals cause direct axonal terminal damage' },
      { number: 4, title: 'Severe receptor degradation', description: 'Massive neurotoxic pruning of dopamine axons leaves the user in severe chronic psychosis, depression, and motor tremors.', highlightTarget: 'amygdala', note: 'Profound loss of dopamine terminals and paranoia' }
    ],
    result: { title: 'The result', description: 'Physical destruction of dopamine transporter terminals results in severe cognitive impairment, paranoia, and profound anhedonia.' },
    goodNews: { title: 'The good news', description: 'Protracted abstinence (12-24 months) demonstrates measurable DAT recovery and structural neurogenesis in the striatum.', actionText: 'See long-term brain repair →' },
    timeline: [
      { stage: 'Normal balance', description: 'Normal dopamine synthesis, vesicular storage, and synaptic clearance.' },
      { stage: 'After repeated use', description: 'Severe oxidative stress with widespread terminal axonal swelling.' },
      { stage: 'Long-term', description: 'Profound reduction in dopamine transporters and persistent cognitive deficits.' }
    ]
  },
  {
    id: 'prescription-stimulants',
    category: 'substances',
    title: 'Prescription Stimulants',
    subtitle: 'Dose-escalation & sympathetic nervous over-drive',
    badge: 'Catecholamine elevation',
    icon: 'Pill',
    steps: [
      { number: 1, title: 'Inappropriate dosing', description: 'High non-prescribed doses of amphetamine salts saturate norepinephrine and dopamine transporters in prefrontal circuits.', highlightTarget: 'pfc', note: 'Excessive catecholamine saturation in PFC' },
      { number: 2, title: 'Sympathetic over-arousal', description: 'Locus coeruleus hyperactivity triggers tachycardia, pupillary dilation, and heightened perceived mental endurance.', highlightTarget: 'amygdala', note: 'Noradrenergic flood drives acute hyper-focus' },
      { number: 3, title: 'Dorsal striatum compulsion', description: 'Repetitive task-looping occurs as dopamine spills over from prefrontal to striatal motor regions.', highlightTarget: 'reward', note: 'Striatal spillover causes obsessive perseveration' },
      { number: 4, title: 'Post-stimulant rebound crash', description: 'Receptor desensitization and depleted catecholamines cause acute exhaustion, irritability, and cognitive slowdown.', highlightTarget: 'pfc', note: 'Severe rebound fog as synaptic stores deplete' }
    ],
    result: { title: 'The result', description: 'Dose escalation creates cardiovascular strain, sleep fragmentation, and psychological inability to perform without chemical stimulation.' },
    goodNews: { title: 'The good news', description: 'Gradual medical taper restores endogenous dopamine synthesis and normalizes sleep architecture without permanent damage.', actionText: 'Explore healthy stimulant taper →' },
    timeline: [
      { stage: 'Normal balance', description: 'Balanced prefrontal norepinephrine enabling natural focus and rest.' },
      { stage: 'After repeated use', description: 'Dependence on artificial catecholamine elevation to initiate work.' },
      { stage: 'Long-term', description: 'Blunted baseline attention span and chronic sympathetic fatigue.' }
    ]
  },
  {
    id: 'caffeine-dependence',
    category: 'substances',
    title: 'Caffeine & Adenosine',
    subtitle: 'Adenosine receptor antagonism & rebound fatigue',
    badge: 'Adenosine blockade',
    icon: 'Coffee',
    steps: [
      { number: 1, title: 'Adenosine receptor blockade', description: 'Caffeine binds competitively to A1 and A2A adenosine receptors without activating them, masking sleep pressure.', highlightTarget: 'pfc', note: 'Blocks adenosine from signalling tiredness' },
      { number: 2, title: 'Secondary dopamine boost', description: 'By blocking A2A receptors that interact with D2 receptors, caffeine mildly enhances dopamine signaling in the striatum.', highlightTarget: 'reward', note: 'Mild striatal dopamine facilitation increases alertness' },
      { number: 3, title: 'Receptor multiplication', description: 'The brain compensates for chronic blockade by synthesizing additional adenosine receptors across the cortex.', highlightTarget: 'hippocampus', note: 'Brain builds extra adenosine receptors to adapt' },
      { number: 4, title: 'Withdrawal headache crash', description: 'When caffeine clears, accumulated adenosine floods the expanded receptor pool, causing cerebral vasodilation and headaches.', highlightTarget: 'amygdala', note: 'Vasodilation and adenosine flood cause painful crash' }
    ],
    result: { title: 'The result', description: 'The user requires caffeine simply to achieve the baseline wakefulness that a non-user experiences naturally.' },
    goodNews: { title: 'The good news', description: 'Adenosine receptor density normalizes within 7 to 9 days of caffeine reduction, restoring natural morning alertness.', actionText: 'See adenosine reset →' },
    timeline: [
      { stage: 'Normal balance', description: 'Natural circadian accumulation of adenosine inducing evening sleepiness.' },
      { stage: 'After repeated use', description: 'Increased receptor density requiring higher daily caffeine consumption.' },
      { stage: 'Long-term', description: 'Severe morning lethargy and acute withdrawal headaches without coffee.' }
    ]
  },
  {
    id: 'sugar-addiction',
    category: 'substances',
    title: 'Sugar & Ultra-Processed Food',
    subtitle: 'Supra-physiological striatal stimulation & leptin resistance',
    badge: 'Hyper-palatable hijacking',
    icon: 'Utensils',
    steps: [
      { number: 1, title: 'Hyper-palatable taste strike', description: 'Refined sugars and fats stimulate taste buds and gut glucose sensors, sending vagal surges to the brainstem.', highlightTarget: 'reward', note: 'Gut-brain vagal axis signals high calorie reward' },
      { number: 2, title: 'Ventral striatum flood', description: 'Nucleus accumbens releases a surge of dopamine comparable to mild stimulants, bypassing evolutionary satiety limits.', highlightTarget: 'reward', note: 'Dopamine surge bypasses evolutionary satiety' },
      { number: 3, title: 'Hypothalamic leptin resistance', description: 'Insulin and triglyceride surges cross into the hypothalamus, blunting leptin receptors that signal biological fullness.', highlightTarget: 'hippocampus', note: 'Leptin satiety signals are blunted in hypothalamus' },
      { number: 4, title: 'Compulsive cravings trigger', description: 'Blood glucose drops rapidly following an insulin spike, triggering acute limbic cravings and impulsive snacking.', highlightTarget: 'amygdala', note: 'Glucose crash drives emergency food-seeking impulse' }
    ],
    result: { title: 'The result', description: 'Chronic consumption reprograms gustatory and reward pathways, promoting compulsive eating, metabolic dysfunction, and brain fog.' },
    goodNews: { title: 'The good news', description: 'Taste bud sensitivity and hypothalamic satiety signaling reset within 2 to 3 weeks of transitioning to whole foods.', actionText: 'Discover nutritional reset →' },
    timeline: [
      { stage: 'Normal balance', description: 'Accurate leptin and ghrelin signaling regulating metabolic appetite.' },
      { stage: 'After repeated use', description: 'Dopaminergic habituation requiring sweeter foods to feel satisfied.' },
      { stage: 'Long-term', description: 'Hypothalamic inflammation, leptin resistance, and compulsive snacking.' }
    ]
  },

  // ==========================================
  // CATEGORY 2: Mental Health & Mood (11 - 20)
  // ==========================================
  {
    id: 'major-depression',
    category: 'mental-health',
    title: 'Major Depression',
    subtitle: 'BDNF depletion & Default Mode Network hyperactivity',
    badge: 'BDNF & monoamine deficit',
    icon: 'Brain',
    steps: [
      { number: 1, title: 'DMN hyper-connectivity', description: 'The Default Mode Network (medial PFC and posterior cingulate) becomes chronically hyperactive, trapping thoughts in recursive rumination.', highlightTarget: 'pfc', note: 'Unchecked rumination loop in medial PFC' },
      { number: 2, title: 'Hippocampal BDNF decline', description: 'Chronic stress depletes Brain-Derived Neurotrophic Factor (BDNF), causing dendritic atrophy and volume reduction in the hippocampus.', highlightTarget: 'hippocampus', note: 'Dendritic spine loss and hippocampal shrinkage' },
      { number: 3, title: 'Striatal anhedonia lock', description: 'Ventral striatum reactivity to natural rewards plummets, stripping away joy, motivation, and positive anticipation.', highlightTarget: 'reward', note: 'Nucleus accumbens fails to register pleasure' },
      { number: 4, title: 'Amygdala negative bias', description: 'The amygdala exhibits hyper-reactivity to negative stimuli while prefrontal inhibitory feedback remains blunted.', highlightTarget: 'amygdala', note: 'Distorted threat salience and persistent sadness' }
    ],
    result: { title: 'The result', description: 'Persistent low mood, profound fatigue, loss of interest in life, and cognitive slowdown from neuroplastic atrophy.' },
    goodNews: { title: 'The good news', description: 'Targeted therapies, aerobic exercise, and SSRIs stimulate neurogenesis and restore hippocampal BDNF expression.', actionText: 'Explore neurogenesis healing →' },
    timeline: [
      { stage: 'Normal balance', description: 'Resilient neurogenesis, flexible attention switching, and balanced mood.' },
      { stage: 'After repeated use', description: 'Default mode entrapment with declining cognitive energy and social withdrawal.' },
      { stage: 'Long-term', description: 'Structural hippocampal thinning and blunted reward responsiveness.' }
    ]
  },
  {
    id: 'generalized-anxiety',
    category: 'mental-health',
    title: 'Generalized Anxiety',
    subtitle: 'Amygdalar hyper-reactivity & prefrontal uncoupling',
    badge: 'Hyper-vigilant limbic loop',
    icon: 'Zap',
    steps: [
      { number: 1, title: 'Threat detection malfunction', description: 'The basolateral amygdala misclassifies ambiguous environmental cues as imminent threats, triggering alarm cascades.', highlightTarget: 'amygdala', note: 'False alarm triggered in basolateral amygdala' },
      { number: 2, title: 'HPA axis overdrive', description: 'Corticotropin-releasing hormone floods the pituitary, stimulating the adrenal glands to pump cortisol into circulation.', highlightTarget: 'hippocampus', note: 'Excess cortisol release elevates physiological stress' },
      { number: 3, title: 'Prefrontal uncoupling', description: 'The ventromedial prefrontal cortex fails to send inhibitory GABAergic signals to calm the alarmed amygdala.', highlightTarget: 'pfc', note: 'PFC fails to inhibit runaway emotional alarm' },
      { number: 4, title: 'Somatic symptom cascade', description: 'Sympathetic nerve firing drives muscle tension, shallow thoracic breathing, tachycardia, and chronic hyper-arousal.', highlightTarget: 'reward', note: 'Sympathetic storm generates somatic tension' }
    ],
    result: { title: 'The result', description: 'Persistent, uncontrollable worry accompanied by insomnia, gastrointestinal distress, and debilitating physical tension.' },
    goodNews: { title: 'The good news', description: 'Mindfulness, physiological sighs, and cognitive reframing strengthen vmPFC-amygdala inhibitory synaptic connections.', actionText: 'See anxiety recalibration →' },
    timeline: [
      { stage: 'Normal balance', description: 'Proportional threat evaluation and prompt return to parasympathetic calm.' },
      { stage: 'After repeated use', description: 'Enlarged amygdala reactivity with chronic physical restlessness.' },
      { stage: 'Long-term', description: 'Weakened top-down prefrontal connectivity and generalized vigilance.' }
    ]
  },
  {
    id: 'obsessive-compulsive',
    category: 'mental-health',
    title: 'OCD & Intrusive Loops',
    subtitle: 'Cortico-Striato-Thalamo-Cortical (CSTC) loop dysfunction',
    badge: 'CSTC circuit entrapment',
    icon: 'Activity',
    steps: [
      { number: 1, title: 'Orbitofrontal error alarm', description: 'The orbitofrontal cortex misfires with an intense "something is terribly wrong" sensation that cannot be logically dismissed.', highlightTarget: 'pfc', note: 'OFC triggers persistent phantom error signal' },
      { number: 2, title: 'Caudate nucleus gating failure', description: 'The caudate nucleus fails to filter out the false danger signal, allowing intrusive distress to reverberate into consciousness.', highlightTarget: 'reward', note: 'Striatal gating fails to filter obsessions' },
      { number: 3, title: 'Limbic anxiety spike', description: 'The anterior cingulate cortex and amygdala generate severe emotional tension that demands immediate corrective action.', highlightTarget: 'amygdala', note: 'Anterior cingulate generates urgent distress' },
      { number: 4, title: 'Compulsive ritual discharge', description: 'Executing a repetitive ritual (washing, checking, counting) temporarily calms the circuit, reinforcing the trap.', highlightTarget: 'hippocampus', note: 'Compulsion temporarily silences error signal' }
    ],
    result: { title: 'The result', description: 'A relentless behavioral loop where compulsions reinforce the obsession by preventing natural anxiety extinction.' },
    goodNews: { title: 'The good news', description: 'Exposure and Response Prevention (ERP) rewires the CSTC circuit by teaching the brain that intrusive alarms fade naturally.', actionText: 'Explore ERP neuroplasticity →' },
    timeline: [
      { stage: 'Normal balance', description: 'Accurate error-monitoring that clears thoughts once tasks are verified.' },
      { stage: 'After repeated use', description: 'Sensitized CSTC loop requiring longer rituals to alleviate distress.' },
      { stage: 'Long-term', description: 'Deeply grooved compulsive habits consuming hours of daily mental energy.' }
    ]
  },
  {
    id: 'ptsd-trauma',
    category: 'mental-health',
    title: 'PTSD & Trauma',
    subtitle: 'Hippocampal under-contextualization & amygdala alarms',
    badge: 'Trauma memory uncoupling',
    icon: 'ShieldAlert',
    steps: [
      { number: 1, title: 'Fragmented memory storage', description: 'During traumatic events, catecholamine surges disrupt the hippocampus, preventing chronological timestamping of the event.', highlightTarget: 'hippocampus', note: 'Trauma memory lacks temporal timestamping' },
      { number: 2, title: 'Sensory trigger ignition', description: 'A harmless present-day sensory cue (sound, smell) travels directly to the amygdala via the fast thalamic pathway.', highlightTarget: 'amygdala', note: 'Sensory cue activates hyper-reactive amygdala' },
      { number: 3, title: 'Flashback reliving', description: 'Because the hippocampus fails to signal "this is in the past", the brain re-experiences the trauma as happening right now.', highlightTarget: 'reward', note: 'Brain experiences past threat as immediate reality' },
      { number: 4, title: 'Prefrontal speech shutdown', description: 'Broca area in the left frontal lobe deactivates during trauma recall, rendering verbalization difficult while heart rate spikes.', highlightTarget: 'pfc', note: 'Broca area shuts down; speech becomes difficult' }
    ],
    result: { title: 'The result', description: 'Severe hyper-vigilance, nocturnal nightmares, emotional dissociation, and avoidance of everyday environmental cues.' },
    goodNews: { title: 'The good news', description: 'EMDR, somatic therapy, and prolonged exposure enable memory reconsolidation, allowing the hippocampus to store the event as past.', actionText: 'Learn memory reconsolidation →' },
    timeline: [
      { stage: 'Normal balance', description: 'Integrated narrative memory with clear temporal boundaries.' },
      { stage: 'After repeated use', description: 'Hyper-active startle reflex with frequent intrusive sensory triggers.' },
      { stage: 'Long-term', description: 'Hippocampal volume reduction and chronic autonomic dysregulation.' }
    ]
  },
  {
    id: 'panic-disorder',
    category: 'mental-health',
    title: 'Panic Disorder',
    subtitle: 'Locus coeruleus surge & catastrophic misinterpretation',
    badge: 'Noradrenergic surge',
    icon: 'Flame',
    steps: [
      { number: 1, title: 'Benign somatic sensation', description: 'A slight physiological shift (skipped heartbeat, caffeine flutter) is detected by the insular cortex.', highlightTarget: 'hippocampus', note: 'Insula detects minor internal heart flutter' },
      { number: 2, title: 'Catastrophic appraisal', description: 'The prefrontal cortex misinterprets the flutter as imminent death, heart failure, or impending madness.', highlightTarget: 'pfc', note: 'Cognitive misinterpretation escalates to catastrophe' },
      { number: 3, title: 'Locus coeruleus detonation', description: 'The locus coeruleus discharges massive bursts of norepinephrine across the entire cerebral cortex.', highlightTarget: 'amygdala', note: 'Norepinephrine flood triggers acute fight-or-flight' },
      { number: 4, title: 'Hyperventilation loop', description: 'Rapid breathing drops arterial CO2, inducing dizziness, tingling, and depersonalization that confirms the false panic.', highlightTarget: 'reward', note: 'Hypocapnia amplifies physical terror symptoms' }
    ],
    result: { title: 'The result', description: 'Agoraphobia and anticipatory terror develop as the user begins fearing the internal bodily sensations themselves.' },
    goodNews: { title: 'The good news', description: 'Interoceptive exposure therapy breaks the panic cycle by teaching the brain that heart palpitations are harmless.', actionText: 'See panic extinction training →' },
    timeline: [
      { stage: 'Normal balance', description: 'Tolerance of normal cardiac and autonomic fluctuations.' },
      { stage: 'After repeated use', description: 'Hyper-vigilant scanning of internal heart rate and respiration.' },
      { stage: 'Long-term', description: 'Severe agoraphobic restriction and fear of physical exertion.' }
    ]
  },
  {
    id: 'bipolar-mania',
    category: 'mental-health',
    title: 'Bipolar Mania',
    subtitle: 'Sensitized reward signaling & diminished prefrontal braking',
    badge: 'Hyper-dopaminergic drive',
    icon: 'Sparkles',
    steps: [
      { number: 1, title: 'Striatal hyper-sensitization', description: 'Dopaminergic signaling in the nucleus accumbens becomes excessively sensitized, amplifying perceived reward value.', highlightTarget: 'reward', note: 'Extreme dopamine sensitization in striatum' },
      { number: 2, title: 'Loss of sleep pressure', description: 'Circadian clock gene dysregulation dampens adenosine sleep pressure, sustaining boundless energy on minimal rest.', highlightTarget: 'hippocampus', note: 'Circadian breakdown abolishes sleep need' },
      { number: 3, title: 'Grandiosity & racing thoughts', description: 'Dorsolateral prefrontal networks become flooded with dopamine, generating rapid speech and grandiose convictions.', highlightTarget: 'pfc', note: 'PFC flooding accelerates association speed' },
      { number: 4, title: 'Risk assessment collapse', description: 'Orbitofrontal negative risk evaluation vanishes, leading to impulsive investments, reckless driving, or hyper-spending.', highlightTarget: 'amygdala', note: 'Total collapse of danger evaluation networks' }
    ],
    result: { title: 'The result', description: 'Manic exhaustion, interpersonal fallout, dangerous financial impulsivity, followed inevitably by a severe depressive crash.' },
    goodNews: { title: 'The good news', description: 'Mood stabilizers (lithium, valproate) modulate inositol signaling and protect against neurotoxic manic excitotoxicity.', actionText: 'Explore mood stabilization →' },
    timeline: [
      { stage: 'Normal balance', description: 'Euthymic mood with stable circadian rhythms and proportionate energy.' },
      { stage: 'After repeated use', description: 'Escalating hypomania with decreased sleep and racing creative ideas.' },
      { stage: 'Long-term', description: 'Kindling effect with increasingly rapid cycling and depressive exhaustion.' }
    ]
  },
  {
    id: 'social-anxiety',
    category: 'mental-health',
    title: 'Social Anxiety',
    subtitle: 'Salience network bias & perceived evaluation threat',
    badge: 'Social evaluative threat',
    icon: 'Eye',
    steps: [
      { number: 1, title: 'Audience salience trigger', description: 'Walking into a room or public speaking activates hyper-vigilant scanning in the dorsal anterior cingulate cortex.', highlightTarget: 'pfc', note: 'Social presence parsed as imminent threat' },
      { number: 2, title: 'Internal camera spotlight', description: 'Attention flips inward: the medial prefrontal cortex generates a critical, distorted mental image of oneself being scrutinized.', highlightTarget: 'pfc', note: 'Inward attentional spotlight on perceived flaws' },
      { number: 3, title: 'Amygdala blushing surge', description: 'Limbic autonomic centers trigger facial flushing, vocal tremors, sweat gland secretion, and rapid pulse.', highlightTarget: 'amygdala', note: 'Autonomic storm drives blushing and vocal tremor' },
      { number: 4, title: 'Post-event rumination', description: 'Hours after the interaction, the hippocampus and DMN replay every perceived awkward micro-moment recursively.', highlightTarget: 'hippocampus', note: 'Post-event rumination re-encodes social shame' }
    ],
    result: { title: 'The result', description: 'Social isolation, career limitation, and severe dread of everyday interactions like phone calls or shared meals.' },
    goodNews: { title: 'The good news', description: 'Video feedback and attention training therapy (ATT) retrain the brain to anchor attention outward rather than self-monitoring.', actionText: 'Discover social rewiring →' },
    timeline: [
      { stage: 'Normal balance', description: 'Natural social comfort with appropriate communicative empathy.' },
      { stage: 'After repeated use', description: 'Anticipatory dread days prior to scheduled social events.' },
      { stage: 'Long-term', description: 'Deep social avoidance and entrenched negative self-belief loops.' }
    ]
  },
  {
    id: 'chronic-burnout',
    category: 'mental-health',
    title: 'Chronic Burnout',
    subtitle: 'HPA axis exhaustion & prefrontal cortex thinning',
    badge: 'Glucocorticoid exhaustion',
    icon: 'ZapOff',
    steps: [
      { number: 1, title: 'Chronic cortisol elevation', description: 'Months of relentless occupational stress maintain high circulating cortisol levels, overwhelming negative feedback loops.', highlightTarget: 'hippocampus', note: 'Sustained cortisol overwhelms glucocorticoid receptors' },
      { number: 2, title: 'Prefrontal dendrite retraction', description: 'Medial and dorsolateral prefrontal neurons retract dendritic branches, degrading working memory and decision quality.', highlightTarget: 'pfc', note: 'Prefrontal dendritic pruning degrades focus' },
      { number: 3, title: 'Amygdala hypertrophy', description: 'Unlike the cortex, the basolateral amygdala grows larger under chronic stress, amplifying emotional reactivity and cynicism.', highlightTarget: 'amygdala', note: 'Amygdala enlarges, increasing emotional irritability' },
      { number: 4, title: 'Hypo-cortisolemic collapse', description: 'Eventually the adrenal axis down-regulates, causing a state of hypocortisolemia with bone-deep fatigue and apathy.', highlightTarget: 'reward', note: 'Adrenal exhaustion causes chronic severe apathy' }
    ],
    result: { title: 'The result', description: 'Profound mental exhaustion, depersonalization toward colleagues, and complete loss of professional efficacy and joy.' },
    goodNews: { title: 'The good news', description: 'True restorative rest, boundary restructuring, and nature immersion stimulate dendritic regrowth in prefrontal neurons.', actionText: 'Explore burnout recovery →' },
    timeline: [
      { stage: 'Normal balance', description: 'Dynamic stress reactivity followed by swift parasympathetic recovery.' },
      { stage: 'After repeated use', description: 'Persistent cognitive friction, emotional detachment, and poor sleep.' },
      { stage: 'Long-term', description: 'Structural prefrontal volume loss and immune-inflammatory fatigue.' }
    ]
  },
  {
    id: 'borderline-affective',
    category: 'mental-health',
    title: 'Affective Dysregulation',
    subtitle: 'Insular-amygdaloid hyper-reactivity & attachment threat',
    badge: 'Limbic hyper-reactivity',
    icon: 'HeartPulse',
    steps: [
      { number: 1, title: 'Perceived abandonment cue', description: 'A delayed text message or neutral facial expression is interpreted by the insula as acute rejection and abandonment.', highlightTarget: 'amygdala', note: 'Neutral micro-expression parsed as rejection' },
      { number: 2, title: 'Emotional limbic explosion', description: 'The amygdala discharges intense emotional agony with 3x greater amplitude and prolonged recovery time.', highlightTarget: 'amygdala', note: 'Limbic surge reaches extreme emotional agony' },
      { number: 3, title: 'Prefrontal inhibitory failure', description: 'The orbitofrontal cortex and anterior cingulate fail to modulate the emotional wave, compromising rational impulse control.', highlightTarget: 'pfc', note: 'PFC executive brake fails to regulate emotion' },
      { number: 4, title: 'Urgent behavioral mitigation', description: 'Intense distress drives impulsive coping (frantic calling, emotional outbursts, self-harm) to stop the inner pain.', highlightTarget: 'reward', note: 'Impulsive action taken to alleviate psychic pain' }
    ],
    result: { title: 'The result', description: 'Volatile interpersonal relationships, chronic emotional exhaustion, and acute sensitivity to perceived interpersonal distance.' },
    goodNews: { title: 'The good news', description: 'Dialectical Behavior Therapy (DBT) strengthens prefrontal-amygdala connectivity, providing robust distress tolerance skills.', actionText: 'See DBT neuroplasticity →' },
    timeline: [
      { stage: 'Normal balance', description: 'Stable interpersonal trust and measured emotional responses to conflict.' },
      { stage: 'After repeated use', description: 'Heightened sensitivity to interpersonal cues with severe emotional swings.' },
      { stage: 'Long-term', description: 'Chronic affective exhaustion and fear-driven relational instability.' }
    ]
  },
  {
    id: 'seasonal-affective',
    category: 'mental-health',
    title: 'Seasonal Affective Disorder',
    subtitle: 'Circadian photoperiod deficit & serotonin transporter surge',
    badge: 'Photoperiod circadian shift',
    icon: 'Sun',
    steps: [
      { number: 1, title: 'Retinal light reduction', description: 'Shortened winter daylight reduces photon activation of intrinsically photosensitive retinal ganglion cells (ipRGCs).', highlightTarget: 'pfc', note: 'Diminished retinal light signal to pacemaker' },
      { number: 2, title: 'Suprachiasmatic desynchrony', description: 'The master circadian clock (SCN) shifts phase, causing melatonin secretion to spill into morning and afternoon hours.', highlightTarget: 'hippocampus', note: 'SCN clock shifts; daytime melatonin spikes' },
      { number: 3, title: 'SERT transporter surge', description: 'Serotonin transporter (SERT) levels increase in winter, clearing serotonin too rapidly from synapses and depressing mood.', highlightTarget: 'reward', note: 'SERT clears synaptic serotonin prematurely' },
      { number: 4, title: 'Carbohydrate craving & lethargy', description: 'The brain seeks carbohydrates to boost tryptophan crossing into the brain, causing seasonal weight gain and hypersomnia.', highlightTarget: 'amygdala', note: 'Craving simple carbs to replenish serotonin' }
    ],
    result: { title: 'The result', description: 'Winter depression characterized by debilitating morning fatigue, intense carbohydrate cravings, and social withdrawal.' },
    goodNews: { title: 'The good news', description: 'Morning 10,000-lux bright light therapy suppresses daytime melatonin and resets SCN firing within 10 to 14 days.', actionText: 'Explore phototherapy reset →' },
    timeline: [
      { stage: 'Normal balance', description: 'Summer synchrony with robust daytime alertness and natural evening rest.' },
      { stage: 'After repeated use', description: 'Mid-autumn energy slide with prolonged morning sleep inertia.' },
      { stage: 'Long-term', description: 'Severe seasonal winter depression recurring predictably each year.' }
    ]
  }
];

// Generate remainder 30 scenarios (Cognitive: 21-30, Compulsions: 31-40, Neuroplasticity: 41-50)
const remainingScenarios = [
  // ==========================================
  // CATEGORY 3: Cognitive & Brain Health (21 - 30)
  // ==========================================
  {
    id: 'adhd-dopamine',
    category: 'cognitive',
    title: 'ADHD Neurobiology',
    subtitle: 'Dopaminergic transporter variations & executive delay',
    badge: 'Dopamine tonic deficit',
    icon: 'Focus',
    steps: [
      { number: 1, title: 'Tonic dopamine deficit', description: 'Baseline dopamine in prefrontal synapses is lower, reducing signal-to-noise ratio for mundane, non-urgent tasks.', highlightTarget: 'pfc', note: 'Low baseline dopamine reduces task salience' },
      { number: 2, title: 'Stimulation seeking', description: 'The striatum constantly scans for high-novelty, high-urgency stimuli to achieve the threshold required for neural engagement.', highlightTarget: 'reward', note: 'Striatal drive seeks novel stimulation' },
      { number: 3, title: 'Executive network lag', description: 'The central executive network struggles to suppress task-unrelated intrusions from the Default Mode Network.', highlightTarget: 'pfc', note: 'DMN intrudes onto executive focus' },
      { number: 4, title: 'Crisis hyperfocus', description: 'Under extreme pressure or intense passion, dopamine spikes sufficiently, locking the brain into extraordinary hyperfocus.', highlightTarget: 'reward', note: 'Urgency triggers dopamine surge and focus' }
    ],
    result: { title: 'The result', description: 'Difficulty sustaining focus on unstimulating tasks, executive dysfunction, working memory lapses, and time blindness.' },
    goodNews: { title: 'The good news', description: 'Aerobic exercise, structured environments, and dopamine-modulating interventions restore optimal prefrontal signal processing.', actionText: 'Discover ADHD strengths & tools →' },
    timeline: [
      { stage: 'Normal balance', description: 'Optimal tonic and phasic dopamine firing matching task demands.' },
      { stage: 'After repeated use', description: 'Chronic task-switching friction and working memory overload.' },
      { stage: 'Long-term', description: 'Compensatory executive coping strategies and creative strengths.' }
    ]
  },
  {
    id: 'autism-sensory',
    category: 'cognitive',
    title: 'Autism Sensory Processing',
    subtitle: 'Atypical synaptic pruning & heightened salience gating',
    badge: 'Sensory hyper-connectivity',
    icon: 'Waves',
    steps: [
      { number: 1, title: 'Local hyper-connectivity', description: 'Atypical synaptic pruning results in dense local neural connectivity in primary visual and auditory sensory cortices.', highlightTarget: 'pfc', note: 'Dense sensory cortex hyper-reactivity' },
      { number: 2, title: 'Sensory gating overflow', description: 'Thalamic filtering circuits allow unfiltered raw sensory information (fluorescent hum, tags, crowd chatter) into awareness.', highlightTarget: 'hippocampus', note: 'Thalamus fails to filter ambient sensory noise' },
      { number: 3, title: 'Limbic overload', description: 'The sheer volume of incoming sensory signals overloads the amygdala, triggering intense physiological fight-or-flight distress.', highlightTarget: 'amygdala', note: 'Sensory overload triggers acute limbic panic' },
      { number: 4, title: 'Stimming self-regulation', description: 'Repetitive motor behaviors (rocking, humming, pacing) provide predictable vestibular feedback that calms the storm.', highlightTarget: 'reward', note: 'Stimming restores predictable neural cadence' }
    ],
    result: { title: 'The result', description: 'Sensory exhaustion and meltdowns in unpredictable environments alongside exceptional pattern recognition and deep focus abilities.' },
    goodNews: { title: 'The good news', description: 'Low-sensory environments, noise-canceling technology, and honoring neurodivergent needs allow cognitive talents to flourish.', actionText: 'Explore neurodiversity strengths →' },
    timeline: [
      { stage: 'Normal balance', description: 'Optimal sensory processing in predictable, low-distraction environments.' },
      { stage: 'After repeated use', description: 'Accumulated sensory fatigue leading toward autistic burnout.' },
      { stage: 'Long-term', description: 'Well-adapted sensory accommodations preserving cognitive bandwidth.' }
    ]
  },
  {
    id: 'alzheimers-early',
    category: 'cognitive',
    title: "Alzheimer's Disease",
    subtitle: 'Beta-amyloid accumulation & entorhinal tau neurodegeneration',
    badge: 'Neurodegenerative amyloid',
    icon: 'Brain',
    steps: [
      { number: 1, title: 'Misfolded amyloid-beta oligomers', description: 'Soluble amyloid-beta peptide aggregates into toxic plaques between neurons, disrupting synaptic signaling.', highlightTarget: 'hippocampus', note: 'Amyloid oligomers damage synaptic transmission' },
      { number: 2, title: 'Hyperphosphorylated tau tangles', description: 'Tau proteins detach from microtubules inside axons, forming neurofibrillary tangles starting in the entorhinal cortex.', highlightTarget: 'hippocampus', note: 'Tau tangles collapse neuronal transport systems' },
      { number: 3, title: 'Hippocampal atrophy', description: 'Synapses in the CA1 region and dentate gyrus wither, destroying the brain’s ability to convert short-term experiences into memory.', highlightTarget: 'hippocampus', note: 'Dentate gyrus atrophy impairs memory consolidation' },
      { number: 4, title: 'Cortical spread', description: 'Over years, pathology spreads to temporoparietal and frontal lobes, eroding spatial navigation, language, and executive functioning.', highlightTarget: 'pfc', note: 'Cortical spread impairs speech and navigation' }
    ],
    result: { title: 'The result', description: 'Progressive memory loss, disorientation, difficulty recognizing loved ones, and loss of functional independence.' },
    goodNews: { title: 'The good news', description: 'High cognitive reserve, cardiovascular fitness, and deep sleep glymphatic clearance delay clinical symptom onset by years.', actionText: 'See cognitive reserve strategies →' },
    timeline: [
      { stage: 'Normal balance', description: 'Healthy clearance of metabolic waste via nighttime glymphatic flow.' },
      { stage: 'After repeated use', description: 'Silent accumulation of amyloid and tau over decades before symptoms.' },
      { stage: 'Long-term', description: 'Severe hippocampal atrophy, memory loss, and loss of self.' }
    ]
  },
  {
    id: 'parkinsons-dopamine',
    category: 'cognitive',
    title: "Parkinson's Disease",
    subtitle: 'Substantia nigra degeneration & motor loop rigidity',
    badge: 'Basal ganglia motor deficit',
    icon: 'Activity',
    steps: [
      { number: 1, title: 'Substantia nigra loss', description: 'Alpha-synuclein accumulates into Lewy bodies, destroying dopaminergic neurons in the substantia nigra pars compacta.', highlightTarget: 'reward', note: 'Lewy bodies destroy substantia nigra neurons' },
      { number: 2, title: 'Striatal dopamine depletion', description: 'The dorsal striatum loses its dopamine supply, tilting the basal ganglia motor circuit toward continuous excessive inhibition.', highlightTarget: 'reward', note: 'Striatal dopamine falls below 70-80% threshold' },
      { number: 3, title: 'Motor pathway braking', description: 'The indirect motor pathway dominates, causing resting tremors, cogwheel muscle rigidity, and bradykinesia (slow movement).', highlightTarget: 'hippocampus', note: 'Indirect pathway over-inhibits motor cortex' },
      { number: 4, title: 'Non-motor limbic impact', description: 'Dopamine depletion extends to mesolimbic pathways, producing apathy, sleep fragmentation, and late-stage cognitive decline.', highlightTarget: 'pfc', note: 'Frontal-striatal disconnection causes cognitive slowing' }
    ],
    result: { title: 'The result', description: 'Progressive motor disability characterized by tremor, stiffness, postural instability, alongside mood and sleep disturbances.' },
    goodNews: { title: 'The good news', description: 'Intensive high-cadence cycling, boxing, and L-DOPA/DBS therapy stimulate compensatory neuroplastic motor networks.', actionText: 'Explore neuro-motor rehabilitation →' },
    timeline: [
      { stage: 'Normal balance', description: 'Fluid basal ganglia motor gating enabling effortless movement initiation.' },
      { stage: 'After repeated use', description: 'Unilateral tremor, subtle micrographia, and motor slowing.' },
      { stage: 'Long-term', description: 'Bilateral postural instability, gait freezing, and motor fluctuations.' }
    ]
  },
  {
    id: 'sleep-deprivation',
    category: 'cognitive',
    title: 'Sleep Deprivation',
    subtitle: 'Glymphatic clearance failure & prefrontal breakdown',
    badge: 'Adenosine & toxic buildup',
    icon: 'Moon',
    steps: [
      { number: 1, title: 'Glymphatic pump failure', description: 'Without slow-wave sleep, interstitial space fails to expand by 60%, trapping neurotoxic metabolic waste in brain tissue.', highlightTarget: 'pfc', note: 'Brain waste clearance halted without deep sleep' },
      { number: 2, title: 'Adenosine receptor saturation', description: 'Massive accumulation of adenosine binds across cortical networks, inducing involuntary micro-sleeps and attentional lapses.', highlightTarget: 'pfc', note: 'Adenosine backlog forces involuntary micro-sleeps' },
      { number: 3, title: 'Prefrontal-amygdala decoupling', description: 'Connectivity between the rational prefrontal cortex and emotional amygdala drops by 60%, sparking volatile irritability.', highlightTarget: 'amygdala', note: '60% drop in PFC emotional regulation capacity' },
      { number: 4, title: 'Hippocampal encoding failure', description: 'Synaptic long-term potentiation in the hippocampus is blocked; the brain is biologically incapable of committing new facts to memory.', highlightTarget: 'hippocampus', note: 'Hippocampus unable to encode new information' }
    ],
    result: { title: 'The result', description: 'Severe reaction time delays comparable to blood alcohol of 0.08%, emotional volatility, and accelerated neurodegenerative risk.' },
    goodNews: { title: 'The good news', description: 'One to two nights of restorative recovery sleep trigger compensatory rebound slow-wave and REM sleep, clearing the backlog.', actionText: 'Learn sleep optimization →' },
    timeline: [
      { stage: 'Normal balance', description: 'Nightly glymphatic washing and sharp morning prefrontal performance.' },
      { stage: 'After repeated use', description: 'Accumulated sleep debt with working memory decline and metabolic cravings.' },
      { stage: 'Long-term', description: 'Accelerated tau deposition, immune suppression, and chronic cognitive fog.' }
    ]
  },
  {
    id: 'tbi-concussion',
    category: 'cognitive',
    title: 'Concussion & TBI',
    subtitle: 'Diffuse axonal injury & neurometabolic cascade',
    badge: 'Diffuse axonal shearing',
    icon: 'AlertTriangle',
    steps: [
      { number: 1, title: 'Rotational axonal shearing', description: 'Sudden deceleration forces twist brain tissue against the cranium, stretching and shearing microscopic axonal cytoskeletons.', highlightTarget: 'pfc', note: 'Microscopic axonal twisting and cytoskeletal rupture' },
      { number: 2, title: 'Massive potassium/calcium flux', description: 'Stretched membranes leak potassium into extracellular space, triggering unregulated glutamate release and toxic calcium entry.', highlightTarget: 'hippocampus', note: 'Toxic ion dumping triggers metabolic crisis' },
      { number: 3, title: 'Mitochondrial energy crisis', description: 'ATP pumps work frantically to restore ionic balance just as cerebral blood flow drops, creating a severe cellular energy crisis.', highlightTarget: 'reward', note: 'Cellular ATP exhausted while blood flow diminishes' },
      { number: 4, title: 'Neuro-inflammation & fog', description: 'Microglial activation generates persistent local inflammation, causing light sensitivity, headaches, and slow processing speed.', highlightTarget: 'amygdala', note: 'Microglial inflammation causes brain fog and photophobia' }
    ],
    result: { title: 'The result', description: 'Post-concussion syndrome with debilitating headaches, sound sensitivity, executive fatigue, and emotional lability.' },
    goodNews: { title: 'The good news', description: 'Sub-symptom threshold aerobic exercise (Buffalo Protocol) and anti-inflammatory nutrition promote rapid axonal repair.', actionText: 'Explore active TBI rehabilitation →' },
    timeline: [
      { stage: 'Normal balance', description: 'Intact myelin sheaths and seamless high-speed axonal conduction.' },
      { stage: 'After repeated use', description: 'Post-concussion vulnerability with heightened risk from repeated impacts.' },
      { stage: 'Long-term', description: 'Chronic traumatic encephalopathy (CTE) risk after repetitive unhealed impacts.' }
    ]
  },
  {
    id: 'brain-fog-covid',
    category: 'cognitive',
    title: 'Neuro-Inflammatory Fog',
    subtitle: 'Microglial activation & white matter hypomyelination',
    badge: 'Microglial neuro-inflammation',
    icon: 'Feather',
    steps: [
      { number: 1, title: 'Systemic cytokine crossing', description: 'Circulating pro-inflammatory cytokines (IL-6, TNF-alpha) breach the blood-brain barrier, triggering brain endothelial activation.', highlightTarget: 'pfc', note: 'Systemic cytokines cross the blood-brain barrier' },
      { number: 2, title: 'Microglial reactivity lock', description: 'Microglia transition from resting surveillant state to an aggressive amoeboid phenotype, releasing neurotoxic reactive oxygen species.', highlightTarget: 'hippocampus', note: 'Microglia become hyper-reactive and attack synapses' },
      { number: 3, title: 'Oligodendrocyte impairment', description: 'Inflammation damages oligodendrocytes, slowing action potential propagation along subcortical white matter tracts.', highlightTarget: 'reward', note: 'Myelin insulation damaged; nerve signals slow down' },
      { number: 4, title: 'Working memory failure', description: 'Dorsolateral prefrontal and hippocampal circuits experience processing delays, word-finding deficits, and mental exhaustion.', highlightTarget: 'pfc', note: 'Prefrontal processing speed and word-retrieval drop' }
    ],
    result: { title: 'The result', description: 'Persistent post-viral cognitive dysfunction, inability to multitask, word-finding blocks, and severe mental fatigue.' },
    goodNews: { title: 'The good news', description: 'Anti-inflammatory diets, vagal nerve stimulation, and gradual cognitive pacing suppress microglial over-activation.', actionText: 'See neuro-inflammation recovery →' },
    timeline: [
      { stage: 'Normal balance', description: 'Quiet surveillant microglia maintaining optimal synaptic connectivity.' },
      { stage: 'After repeated use', description: 'Sustained post-viral neuro-inflammation and sluggish mental retrieval.' },
      { stage: 'Long-term', description: 'Resolution of neuro-inflammation as microglial homeostasis restores.' }
    ]
  },
  {
    id: 'age-memory-decline',
    category: 'cognitive',
    title: 'Age-Related Memory Shift',
    subtitle: 'Hippocampal synaptic thinning & processing slowdown',
    badge: 'Synaptic spine density reduction',
    icon: 'Clock',
    steps: [
      { number: 1, title: 'Dendritic spine thinning', description: 'Normal healthy aging reduces thin dendritic spines in the prefrontal cortex and hippocampus without actual neuron death.', highlightTarget: 'hippocampus', note: 'Thin dendritic spine density decreases with age' },
      { number: 2, title: 'White matter tract micro-lesions', description: 'Gradual small-vessel arterial stiffness causes microscopic white matter rarefaction, slowing signal transfer speed.', highlightTarget: 'pfc', note: 'Small-vessel slowing of inter-hemispheric communication' },
      { number: 3, title: 'Source memory attenuation', description: 'The dentate gyrus performs pattern separation less crisply, making it harder to recall where or when an event occurred.', highlightTarget: 'hippocampus', note: 'Dentate gyrus pattern separation becomes less sharp' },
      { number: 4, title: 'Crystallized intelligence preservation', description: 'While fluid processing speed declines, semantic knowledge, vocabulary, and pattern wisdom remain intact or increase.', highlightTarget: 'reward', note: 'Crystallized wisdom and semantic knowledge endure' }
    ],
    result: { title: 'The result', description: 'Occasional "tip-of-the-tongue" word retrieval pauses and slower multitasking, distinct from clinical dementia.' },
    goodNews: { title: 'The good news', description: 'Regular lifelong learning, resistance training, and social interaction maintain cognitive reserve and stimulate BDNF.', actionText: 'Learn lifelong brain resilience →' },
    timeline: [
      { stage: 'Normal balance', description: 'Peak fluid intelligence and rapid working memory retrieval in youth.' },
      { stage: 'After repeated use', description: 'Mild processing latency with highly compensatory crystallized wisdom.' },
      { stage: 'Long-term', description: 'Preserved autonomy and life wisdom supported by rich cognitive reserve.' }
    ]
  },
  {
    id: 'dyslexia-phonological',
    category: 'cognitive',
    title: 'Dyslexia & Reading Networks',
    subtitle: 'Atypical left temporoparietal phonological decoding',
    badge: 'Phonological network variance',
    icon: 'BookOpen',
    steps: [
      { number: 1, title: 'Visual word input', description: 'Graphemes (written letters) enter the primary visual cortex normally, but transfer to left hemisphere language hubs is delayed.', highlightTarget: 'pfc', note: 'Visual letters fail to map smoothly to phonemes' },
      { number: 2, title: 'Left temporoparietal hypo-activation', description: 'The left parieto-temporal system responsible for sound-letter mapping (phonological decoding) exhibits lower activation.', highlightTarget: 'hippocampus', note: 'Phonological decoding network under-activates' },
      { number: 3, title: 'Right-hemisphere compensatory shift', description: 'The brain recruits homologous right hemisphere parietal and frontal regions to compensate for left-side processing delays.', highlightTarget: 'reward', note: 'Right hemisphere steps in with compensatory circuits' },
      { number: 4, title: 'Broca area over-efforting', description: 'Inferior frontal gyrus (Broca area) works with extraordinary effort to sub-vocally articulate and pronounce each word.', highlightTarget: 'pfc', note: 'Broca area works in overdrive to articulate words' }
    ],
    result: { title: 'The result', description: 'Slow, effortful reading and spelling difficulties alongside exceptional visual-spatial reasoning and holistic problem solving.' },
    goodNews: { title: 'The good news', description: 'Structured multisensory phonics (Orton-Gillingham) builds new left-hemisphere neural pathways for fluent decoding.', actionText: 'Explore reading neuroplasticity →' },
    timeline: [
      { stage: 'Normal balance', description: 'Automated left temporoparietal reading pathway in neurotypical readers.' },
      { stage: 'After repeated use', description: 'Fatigue from manual cognitive decoding in non-accommodated settings.' },
      { stage: 'Long-term', description: 'Robust compensatory pathways enabling fluent comprehension and creative success.' }
    ]
  },
  {
    id: 'hyperfocus-flow',
    category: 'cognitive',
    title: 'Flow State vs Hyperfocus',
    subtitle: 'Transient hypofrontality & striatal-attentional synchronization',
    badge: 'Transient hypofrontality',
    icon: 'Compass',
    steps: [
      { number: 1, title: 'Challenge-skill match', description: 'An engaging task pushes skill limits, elevating norepinephrine and dopamine to optimal inverted-U Yerkes-Dodson levels.', highlightTarget: 'pfc', note: 'Optimal catecholamine tone matches task difficulty' },
      { number: 2, title: 'Transient hypofrontality', description: 'The dorsolateral prefrontal cortex temporarily down-regulates self-monitoring and inner critical judgment.', highlightTarget: 'pfc', note: 'Self-critical prefrontal monitoring quiets down' },
      { number: 3, title: 'Theta-gamma phase synchronization', description: 'Frontal theta and sensory gamma brainwaves lock into phase synchrony, producing effortless information processing.', highlightTarget: 'hippocampus', note: 'Brainwaves synchronize for fluid effortless execution' },
      { number: 4, title: 'Deep time distortion', description: 'The posterior parietal cortex loses track of chronological time, immersing the consciousness completely in the present moment.', highlightTarget: 'reward', note: 'Subjective sense of time and ego dissolve completely' }
    ],
    result: { title: 'The result', description: 'Peak creative output, effortless productivity, complete immersion, and deep neuro-chemical fulfillment.' },
    goodNews: { title: 'The good news', description: 'Flow states can be deliberately cultivated by designing uninterrupted work blocks and eliminating micro-distractions.', actionText: 'Master flow triggers →' },
    timeline: [
      { stage: 'Normal balance', description: 'Distracted, fragmented daily multitasking with high mental friction.' },
      { stage: 'After repeated use', description: 'Deliberate entry into 90-minute deep flow blocks with high productivity.' },
      { stage: 'Long-term', description: 'Permanently deepened cognitive focus and neuroplastic mastery.' }
    ]
  },

  // ==========================================
  // CATEGORY 4: Behavioral Compulsions & Modern Tech (31 - 40)
  // ==========================================
  {
    id: 'social-media-loop',
    category: 'compulsions',
    title: 'Doomscrolling & Social Media',
    subtitle: 'Intermittent variable rewards & dopamine prediction errors',
    badge: 'Variable reward schedule',
    icon: 'Smartphone',
    steps: [
      { number: 1, title: 'Slot-machine pull gesture', description: 'The physical downward swipe mimics a slot machine, activating the ventral striatum with anticipation of unpredictable reward.', highlightTarget: 'reward', note: 'Downward thumb swipe triggers variable anticipation' },
      { number: 2, title: 'Dopamine prediction error', description: 'Unexpected viral videos or notifications generate positive dopamine prediction errors, creating an irresistible craving to scroll.', highlightTarget: 'reward', note: 'Surprise content triggers massive prediction error' },
      { number: 3, title: 'Prefrontal vigilance erosion', description: 'Continuous rapid micro-stimuli deplete executive prefrontal stamina, making it impossible to stop even when bored or tired.', highlightTarget: 'pfc', note: 'Executive willpower fatigued by micro-decisions' },
      { number: 4, title: 'Amygdalar social comparison', description: 'Passive consumption of idealized lives triggers negative social comparison in the amygdala, elevating background loneliness.', highlightTarget: 'amygdala', note: 'Curated feeds trigger limbic inadequacy alarms' }
    ],
    result: { title: 'The result', description: 'Compulsive screen usage eating 4+ hours daily, fragmented attention span, sleep disruption, and rising anxiety.' },
    goodNews: { title: 'The good news', description: 'A 7-day digital detox restores dopamine sensitivity, boosts working memory by 20%, and dramatically lowers cortisol.', actionText: 'Explore digital detox protocol →' },
    timeline: [
      { stage: 'Normal balance', description: 'Intentional digital tool usage with clear offline boundaries.' },
      { stage: 'After repeated use', description: 'Compulsive phantom phone checking every 3 to 5 minutes.' },
      { stage: 'Long-term', description: 'Severely shortened attention span and persistent fear of missing out (FOMO).' }
    ]
  },
  {
    id: 'eating-disorders',
    category: 'compulsions',
    title: 'Eating Disorders',
    subtitle: 'How food and body image become compulsive',
    badge: 'Altered serotonin & dopamine',
    icon: 'Utensils',
    steps: [
      { number: 1, title: 'Distorted signal input', description: 'The insula misinterprets hunger, satiety, and body cues, fueling severe emotional distress and anxiety.', highlightTarget: 'amygdala', note: 'Body image and hunger cues trigger anxiety' },
      { number: 2, title: 'Compulsive coping loop', description: 'Food restriction or bingeing creates temporary anxiety relief, reinforcing the ritual in dorsal striatal circuits.', highlightTarget: 'reward', note: 'Striatal circuits turn ritual into a compulsive loop' },
      { number: 3, title: 'Emotional memory lock', description: 'Fear of weight gain becomes deeply conditioned in the amygdala and hippocampus, driving obsessive avoidance.', highlightTarget: 'hippocampus', note: 'Fear conditioning reinforces avoidance patterns' },
      { number: 4, title: 'Cognitive rigidity', description: 'Prefrontal executive networks enforce strict, obsessive rules around eating that override biological survival needs.', highlightTarget: 'pfc', note: 'Rigid cognitive loops override biological needs' }
    ],
    result: { title: 'The result', description: 'Severe psychological torment, nutritional deprivation, cardiovascular strain, and high mortality risk without intervention.' },
    goodNews: { title: 'The good news', description: 'Multidisciplinary treatment, nutritional stabilization, and CBT/FBT rewire insular body processing and restore intuitive eating.', actionText: 'Explore eating disorder recovery →' },
    timeline: [
      { stage: 'Normal balance', description: 'Intuitive metabolic hunger and satiety signaling without guilt.' },
      { stage: 'After repeated use', description: 'Rigid numerical calorie tracking and intense post-meal panic.' },
      { stage: 'Long-term', description: 'Deep structural neurochemical disruption and severe medical compromise.' }
    ]
  },
  {
    id: 'binge-eating',
    category: 'compulsions',
    title: 'Binge Eating Disorder',
    subtitle: 'Hypothalamic-striatal reward disconnection',
    badge: 'Loss of satiety control',
    icon: 'Utensils',
    steps: [
      { number: 1, title: 'Emotional distress catalyst', description: 'Chronic stress or loneliness elevates limbic distress, seeking immediate comfort via hedonic caloric intake.', highlightTarget: 'amygdala', note: 'Emotional distress initiates hedonic drive' },
      { number: 2, title: 'Dorsal striatum trance', description: 'Eating speed accelerates as the dorsal striatum engages habitual motor programs, creating an out-of-body numbing sensation.', highlightTarget: 'reward', note: 'Dorsal striatum automates rapid mindless intake' },
      { number: 3, title: 'Hypothalamic satiety mute', description: 'Dopamine flood overrides fullness signals from the arcuate nucleus, ignoring physical stomach stretch receptors.', highlightTarget: 'hippocampus', note: 'Dopamine overrides mechanical satiety receptors' },
      { number: 4, title: 'Post-binge shame spiral', description: 'The prefrontal cortex re-engages alongside acute serotonin plunge, generating profound guilt, disgust, and self-recrimination.', highlightTarget: 'pfc', note: 'Severe post-binge moral shame and despair' }
    ],
    result: { title: 'The result', description: 'Severe emotional shame, gastrointestinal pain, metabolic dysregulation, and isolation driven by secrecy.' },
    goodNews: { title: 'The good news', description: 'Cognitive Behavioral Therapy for Binge Eating (CBT-E) decouples emotional stress from the eating response with high success.', actionText: 'Learn CBT-E mechanisms →' },
    timeline: [
      { stage: 'Normal balance', description: 'Mindful food intake that halts naturally at biological satiety.' },
      { stage: 'After repeated use', description: 'Secretive nighttime bingeing followed by intense emotional remorse.' },
      { stage: 'Long-term', description: 'Metabolic insulin resistance and deeply ingrained emotional eating loops.' }
    ]
  },
  {
    id: 'video-game-compulsion',
    category: 'compulsions',
    title: 'Video Game Compulsion',
    subtitle: 'Continuous reinforcement schedules & ventral striatum',
    badge: 'Micro-achievement dopamine',
    icon: 'Gamepad2',
    steps: [
      { number: 1, title: 'Engineered micro-achievement', description: 'Level-ups, loot drops, and sensory chimes deliver frequent, predictable dopamine spikes tailored to keep arousal peaked.', highlightTarget: 'reward', note: 'Game mechanics engineer constant dopamine micro-hits' },
      { number: 2, title: 'Virtual agency replacement', description: 'The prefrontal cortex finds effortless competence and status in-game that feels unattainable in real-world challenges.', highlightTarget: 'pfc', note: 'Virtual status substitutes for real-world agency' },
      { number: 3, title: 'Circadian blue-light suppression', description: 'Intense monitor illumination and blue wavelengths suppress melatonin secretion, obliterating natural sleep cues.', highlightTarget: 'hippocampus', note: 'High luminance delays melatonin release for hours' },
      { number: 4, title: 'Real-world anhedonia', description: 'Daily responsibilities (study, chores, career) feel dreadfully boring compared to the hyper-stimulating game environment.', highlightTarget: 'amygdala', note: 'Real-world tasks fail to meet dopamine threshold' }
    ],
    result: { title: 'The result', description: 'School/work neglect, sleep deprivation, physical deconditioning, and emotional dysregulation when gameplay is interrupted.' },
    goodNews: { title: 'The good news', description: 'Channeling strategic gaming drives into coding, chess, or athletics restores real-world dopamine fulfillment.', actionText: 'See gaming drive redirection →' },
    timeline: [
      { stage: 'Normal balance', description: 'Gaming as recreational leisure with effortless shutdown control.' },
      { stage: 'After repeated use', description: '10+ hour weekend binges with neglected sleep and nutrition.' },
      { stage: 'Long-term', description: 'Loss of real-world relationships and functional career paralysis.' }
    ]
  },
  {
    id: 'compulsive-gambling',
    category: 'compulsions',
    title: 'Gambling Disorder',
    subtitle: 'Near-miss phenomenon & dopamine prediction errors',
    badge: 'Near-miss reward illusion',
    icon: 'Target',
    steps: [
      { number: 1, title: 'Uncertain outcome suspense', description: 'Dopamine release reaches its absolute maximum not when winning, but during the moment of greatest uncertainty before the result.', highlightTarget: 'reward', note: 'Dopamine peaks at maximum uncertainty' },
      { number: 2, title: 'The "Near-Miss" trick', description: 'Slot reels stopping one symbol away from jackpot activates the ventral striatum identically to an actual win.', highlightTarget: 'reward', note: 'Near-miss encoded by striatum as a near-win' },
      { number: 3, title: 'Loss-chasing delusion', description: 'The insula and prefrontal cortex develop cognitive distortions ("I am due for a win"), driving desperate attempts to recover losses.', highlightTarget: 'pfc', note: 'Cognitive distortion drives desperate loss chasing' },
      { number: 4, title: 'Autonomic numbness', description: 'The gambler enters a dissociative "machine zone" where time and financial reality vanish until all money is gone.', highlightTarget: 'amygdala', note: 'Dissociative trance isolates user from reality' }
    ],
    result: { title: 'The result', description: 'Catastrophic financial devastation, severe depression, marital breakdown, and high suicide risk among behavioral addictions.' },
    goodNews: { title: 'The good news', description: 'Financial barriers, self-exclusion registers, and CBT effectively break the cognitive distortions of chance.', actionText: 'Explore gambling recovery tools →' },
    timeline: [
      { stage: 'Normal balance', description: 'Rational risk perception and adherence to strict recreation budgets.' },
      { stage: 'After repeated use', description: 'Chasing losses and hiding betting slips from friends and family.' },
      { stage: 'Long-term', description: 'Complete financial insolvency, chronic panic, and existential crisis.' }
    ]
  },
  {
    id: 'compulsive-shopping',
    category: 'compulsions',
    title: 'Compulsive Shopping',
    subtitle: 'Anticipatory dopamine surge & post-purchase crash',
    badge: 'Acquisition dopamine spike',
    icon: 'ShoppingBag',
    steps: [
      { number: 1, title: 'Anticipation spike', description: 'Browsing products triggers a steep dopamine surge during product discovery, peaking right before clicking "Buy Now".', highlightTarget: 'reward', note: 'Dopamine peaks during hunt and checkout click' },
      { number: 2, title: 'Temporary distress erasure', description: 'The dopamine wave temporarily suppresses underlying sadness or boredom, acting as an emotional self-medication.', highlightTarget: 'amygdala', note: 'Purchase surge temporarily masks emotional pain' },
      { number: 3, title: 'Precipitous post-buy crash', description: 'Within minutes of checkout, dopamine plummets; the purchased item loses all its magical emotional appeal.', highlightTarget: 'reward', note: 'Immediate post-purchase dopamine crash and apathy' },
      { number: 4, title: 'Buyer guilt & concealment', description: 'The prefrontal cortex returns with feelings of guilt, leading to unopened packages hidden away in closets.', highlightTarget: 'pfc', note: 'Guilt and secrecy as packages accumulate unopened' }
    ],
    result: { title: 'The result', description: 'Mounting credit card debt, hoarding of unused items, chronic marital conflict, and persistent low self-esteem.' },
    goodNews: { title: 'The good news', description: 'Enforcing a strict 72-hour purchase waiting rule allows the anticipatory dopamine wave to subside naturally.', actionText: 'Learn the 72-hour reset rule →' },
    timeline: [
      { stage: 'Normal balance', description: 'Purchases planned intentionally based on genuine utility and budget.' },
      { stage: 'After repeated use', description: 'Impulsive daily online shopping sprees to cope with negative moods.' },
      { stage: 'Long-term', description: 'Severe debt accumulation and shame-filled avoidance of finances.' }
    ]
  },
  {
    id: 'pornography-habituation',
    category: 'compulsions',
    title: 'Compulsive Pornography',
    subtitle: 'Supra-normal sexual stimuli & Delta-FosB accumulation',
    badge: 'Supra-normal stimulus',
    icon: 'Eye',
    steps: [
      { number: 1, title: 'Novelty escalation (Coolidge effect)', description: 'Endless high-speed novelty triggers repetitive dopamine surges far beyond any natural evolutionary sexual encounter.', highlightTarget: 'reward', note: 'Infinite visual novelty triggers Coolidge effect' },
      { number: 2, title: 'Delta-FosB transcription', description: 'Repetitive activation accumulates Delta-FosB, a stable transcription factor in the striatum that locks in compulsive desire.', highlightTarget: 'reward', note: 'Delta-FosB accumulates, hardwiring compulsive drive' },
      { number: 3, title: 'Desensitization to intimacy', description: 'Receptor downregulation causes real-world partners to fail to reach the threshold required for natural sexual arousal.', highlightTarget: 'pfc', note: 'Porn-induced sexual dysfunction with real partners' },
      { number: 4, title: 'Prefrontal executive erosion', description: 'Late-night consumption disrupts sleep architecture and weakens prefrontal willpower, increasing daylight brain fog.', highlightTarget: 'pfc', note: 'Weakened executive control and daytime mental fog' }
    ],
    result: { title: 'The result', description: 'Porn-induced sexual dysfunction, relational detachment, severe brain fog, and compulsion consuming hours of sleep time.' },
    goodNews: { title: 'The good news', description: 'A 90-day dopamine reset reverses Delta-FosB accumulation, restoring natural sensitivity, libido, and emotional connection.', actionText: 'Explore 90-day reboot science →' },
    timeline: [
      { stage: 'Normal balance', description: 'Healthy intimacy response to real human partners and touch.' },
      { stage: 'After repeated use', description: 'Escalation to extreme novel genres to trigger the same arousal.' },
      { stage: 'Long-term', description: 'Real-world sexual dysfunction, social anxiety, and emotional numbness.' }
    ]
  },
  {
    id: 'workaholism-compulsion',
    category: 'compulsions',
    title: 'Chronic Workaholism',
    subtitle: 'Epinephrine dependence & severe fear of idleness',
    badge: 'Adrenaline & validation loop',
    icon: 'Clock',
    steps: [
      { number: 1, title: 'Identity-achievement fusion', description: 'Prefrontal self-worth networks fuse completely with external productivity metrics and professional recognition.', highlightTarget: 'pfc', note: 'Self-worth fused entirely with output metrics' },
      { number: 2, title: 'Epinephrine arousal dependence', description: 'Tight deadlines and constant notifications maintain a chronic drip of adrenaline that feels invigorating.', highlightTarget: 'reward', note: 'Sympathetic adrenaline high feels essential for vitality' },
      { number: 3, title: 'Acute leisure anxiety', description: 'Vacations or quiet weekends trigger an uncomfortable spike in cortisol and anxiety because the brain cannot downshift.', highlightTarget: 'amygdala', note: 'Idleness triggers acute cortisol and existential dread' },
      { number: 4, title: 'Cognitive tunnel vision', description: 'Personal health, family relationships, and hobbies wither as the executive brain trims all non-work activities.', highlightTarget: 'hippocampus', note: 'Severe pruning of all non-work relationships and joy' }
    ],
    result: { title: 'The result', description: 'Severe physical exhaustion, premature cardiovascular breakdown, marital divorce, and inability to enjoy life without work.' },
    goodNews: { title: 'The good news', description: 'Somatic grounding, boundary setting, and cultivating non-monetized hobbies retrain the parasympathetic nervous system.', actionText: 'Discover healthy boundaries →' },
    timeline: [
      { stage: 'Normal balance', description: 'Productive occupational drive with rich personal life integration.' },
      { stage: 'After repeated use', description: 'Working through evenings and weekends; constant email checking.' },
      { stage: 'Long-term', description: 'Total physiological burnout and collapse of personal relationships.' }
    ]
  },
  {
    id: 'skin-picking-ocd',
    category: 'compulsions',
    title: 'Excoriation & Trichotillomania',
    subtitle: 'Body-focused repetitive behaviors (BFRBs)',
    badge: 'Basal ganglia motor habit',
    icon: 'Hand',
    steps: [
      { number: 1, title: 'Sensory trigger detection', description: 'Fingers scan the skin or scalp, detecting an irregularity (bump, coarse hair) that registers as an urgent sensory flaw.', highlightTarget: 'pfc', note: 'Tactile scanning identifies minor irregularity' },
      { number: 2, title: 'Sensory tension buildup', description: 'The insula and anterior cingulate generate a rising urge that feels physically unbearable until addressed.', highlightTarget: 'amygdala', note: 'Insular tension mounts until action is performed' },
      { number: 3, title: 'Automated motor release', description: 'The basal ganglia execute the habitual picking or pulling movement, producing an immediate drop in emotional tension.', highlightTarget: 'reward', note: 'Striatal motor loop executes habitual picking release' },
      { number: 4, title: 'Tissue damage & regret', description: 'Visible bleeding or hair patches trigger acute self-reproach, leading to avoidance of mirrors and heavy makeup/hats.', highlightTarget: 'pfc', note: 'Post-behavior distress and social concealment' }
    ],
    result: { title: 'The result', description: 'Physical tissue damage, localized infections, alopecia, and severe social anxiety about visible blemishes.' },
    goodNews: { title: 'The good news', description: 'Habit Reversal Training (HRT) and competing response techniques (stress balls, fidgets) rewire the basal ganglia habit loop.', actionText: 'See Habit Reversal Training →' },
    timeline: [
      { stage: 'Normal balance', description: 'Normal grooming behaviors that cease without compulsion.' },
      { stage: 'After repeated use', description: 'Trance-like picking episodes lasting 30 to 60 minutes in mirrors.' },
      { stage: 'Long-term', description: 'Chronic tissue scarring, localized alopecia, and intense social shame.' }
    ]
  },
  {
    id: 'hoarding-disorder',
    category: 'compulsions',
    title: 'Hoarding Disorder',
    subtitle: 'Anterior cingulate emotional attachment overload',
    badge: 'Object value misattribution',
    icon: 'Package',
    steps: [
      { number: 1, title: 'Hyper-valuation of objects', description: 'The ventromedial prefrontal cortex assigns profound emotional meaning and future utility to trivial items (junk mail, wrappers).', highlightTarget: 'pfc', note: 'PFC over-attributes intense emotional value to items' },
      { number: 2, title: 'Discarding pain signal', description: 'Attempting to throw away an object activates the insula identically to physical pain, generating severe grief.', highlightTarget: 'amygdala', note: 'Discarding item triggers acute insular pain response' },
      { number: 3, title: 'Decision-making paralysis', description: 'Categorization networks in the frontal lobe become overwhelmed, leading to total inability to organize belongings.', highlightTarget: 'pfc', note: 'Executive categorization breakdown creates clutter' },
      { number: 4, title: 'Sanctuary walling', description: 'Living spaces fill with possessions that form a physical barrier, comforting the user while isolating them from family.', highlightTarget: 'hippocampus', note: 'Clutter forms a protective psychological fortress' }
    ],
    result: { title: 'The result', description: 'Loss of functional living areas (kitchen, bed), severe fire and health hazards, and total social isolation from loved ones.' },
    goodNews: { title: 'The good news', description: 'Graded discarding therapy with specialized exposure protocols retrains the brain to tolerate the distress of parting with items.', actionText: 'Explore hoarding interventions →' },
    timeline: [
      { stage: 'Normal balance', description: 'Healthy evaluation of items and effortless discard of expired goods.' },
      { stage: 'After repeated use', description: 'Rooms begin losing functionality as stacks of possessions accumulate.' },
      { stage: 'Long-term', description: 'Severe squalor, blocked exits, and alienation from community.' }
    ]
  },

  // ==========================================
  // CATEGORY 5: Neuroplasticity & Positive Habits (41 - 50)
  // ==========================================
  {
    id: 'mindfulness-meditation',
    category: 'neuroplasticity',
    title: 'Mindfulness & Meditation',
    subtitle: 'Prefrontal cortex thickening & amygdalar down-regulation',
    badge: 'Structural neuroplasticity',
    icon: 'Feather',
    steps: [
      { number: 1, title: 'Focused breath anchor', description: 'Directing attention to respiration recruits the anterior cingulate cortex (ACC), actively training the executive attention network.', highlightTarget: 'pfc', note: 'Anterior cingulate trains focused attention' },
      { number: 2, title: 'Noticing the wandering mind', description: 'When the Default Mode Network pulls thoughts away, metacognitive awareness recognizes the diversion without self-criticism.', highlightTarget: 'pfc', note: 'Metacognitive detection of DMN wandering' },
      { number: 3, title: 'Amygdala down-regulation', description: 'Conscious equanimity reduces basolateral amygdala volume and shrinks resting gray-matter density in stress hubs.', highlightTarget: 'amygdala', note: 'Stress-induced amygdala volume physically decreases' },
      { number: 4, title: 'Insular body integration', description: 'Interoceptive accuracy in the insula sharpens, enabling early detection of emotional tension before it escalates.', highlightTarget: 'hippocampus', note: 'Insular thickening enhances somatic self-awareness' }
    ],
    result: { title: 'The result', description: 'Measurable gray-matter thickening in the prefrontal cortex, improved emotional resilience, and reduced reactivity to daily stress.' },
    goodNews: { title: 'The good news', description: 'Just 8 weeks of daily 15-minute mindfulness practice produces measurable MRI structural changes in brain morphology.', actionText: 'Start your mindfulness practice →' },
    timeline: [
      { stage: 'Normal balance', description: 'Reactive stress patterns with wandering thoughts and rumination.' },
      { stage: 'After repeated use', description: 'Swift recovery from emotional triggers and enhanced daily focus.' },
      { stage: 'Long-term', description: 'Permanent prefrontal structural thickening and lasting calm presence.' }
    ]
  },
  {
    id: 'aerobic-exercise',
    category: 'neuroplasticity',
    title: 'Aerobic Exercise & BDNF',
    subtitle: 'Adult hippocampal neurogenesis & vascular enrichment',
    badge: 'BDNF neurogenesis',
    icon: 'Activity',
    steps: [
      { number: 1, title: 'Lactate and myokine release', description: 'Contracting skeletal muscles release lactate, FNDC5, and irisin into the bloodstream, crossing the blood-brain barrier.', highlightTarget: 'reward', note: 'Muscle-derived irisin triggers brain growth factors' },
      { number: 2, title: 'BDNF synthesis explosion', description: 'Brain-Derived Neurotrophic Factor (BDNF) spikes up to 300% in the dentate gyrus of the hippocampus.', highlightTarget: 'hippocampus', note: 'Hippocampal BDNF surges, nourishing brain cells' },
      { number: 3, title: 'New neuron birth (Neurogenesis)', description: 'Neural stem cells in the subgranular zone proliferate and differentiate into brand-new, functional mature neurons.', highlightTarget: 'hippocampus', note: 'New granule neurons integrate into memory circuits' },
      { number: 4, title: 'Prefrontal executive boost', description: 'Angiogenesis (new capillary formation) boosts cerebral perfusion, improving cognitive flexibility and working memory.', highlightTarget: 'pfc', note: 'New micro-vessels flood the frontal cortex with oxygen' }
    ],
    result: { title: 'The result', description: 'Sharp improvements in memory retention, rapid mood enhancement, reduced depression risk, and long-term dementia defense.' },
    goodNews: { title: 'The good news', description: 'Even a single 30-minute brisk walk immediately elevates BDNF and cognitive processing speed for up to 2 hours.', actionText: 'Explore exercise neurobiology →' },
    timeline: [
      { stage: 'Normal balance', description: 'Sedentary baseline with steady, gradual age-related synaptic loss.' },
      { stage: 'After repeated use', description: 'Elevated morning energy, improved learning speed, and mood lift.' },
      { stage: 'Long-term', description: 'Measurable expansion of hippocampal volume and sharp executive edge.' }
    ]
  },
  {
    id: 'deep-rem-sleep',
    category: 'neuroplasticity',
    title: 'Deep Sleep & Memory',
    subtitle: 'Glymphatic flushing & slow-wave memory consolidation',
    badge: 'Glymphatic waste wash',
    icon: 'Moon',
    steps: [
      { number: 1, title: 'Slow-wave delta oscillation', description: 'Non-REM stage 3 sleep generates massive synchronized 1Hz delta waves across the neocortex and thalamus.', highlightTarget: 'pfc', note: 'Synchronized delta waves coordinate memory transfer' },
      { number: 2, title: 'Glymphatic cerebrospinal flush', description: 'Astroglial channels expand, flushing cerebrospinal fluid through brain tissue to clear beta-amyloid and tau proteins.', highlightTarget: 'hippocampus', note: 'CSF flushes metabolic debris and amyloid out of brain' },
      { number: 3, title: 'Memory transfer to cortex', description: 'Sharp-wave ripples in the hippocampus replay the day’s learning, transferring memories into permanent cortical storage.', highlightTarget: 'hippocampus', note: 'Hippocampus transfers temporary memory to cortex' },
      { number: 4, title: 'REM emotional calibration', description: 'During dream-rich REM sleep, noradrenergic stress tone shuts off completely, allowing emotional memories to lose their sting.', highlightTarget: 'amygdala', note: 'Nocturnal dream state strips away emotional trauma' }
    ],
    result: { title: 'The result', description: 'Crystal-clear morning cognitive sharpness, restored emotional equilibrium, optimal hormonal balance, and cellular rejuvenation.' },
    goodNews: { title: 'The good news', description: 'Aligning with circadian light cues and sleeping in a cool (65°F/18°C) room boosts slow-wave sleep depth by over 30%.', actionText: 'Optimize deep sleep architecture →' },
    timeline: [
      { stage: 'Normal balance', description: 'Restful 7-9 hours with complete sleep architecture and morning clarity.' },
      { stage: 'After repeated use', description: 'Enhanced memory consolidation and resilient daytime emotional poise.' },
      { stage: 'Long-term', description: 'Decades of neuroprotective protection against neurodegenerative diseases.' }
    ]
  },
  {
    id: 'learning-new-language',
    category: 'neuroplasticity',
    title: 'Language Acquisition',
    subtitle: 'White matter myelination & cognitive reserve expansion',
    badge: 'Cognitive reserve builder',
    icon: 'BookOpen',
    steps: [
      { number: 1, title: 'Phonemic discrimination', description: 'Auditory cortex and Wernicke area work intensively to differentiate novel phonemes that do not exist in the native tongue.', highlightTarget: 'pfc', note: 'Auditory cortex learns novel phonemic frequencies' },
      { number: 2, title: 'Arcuate fasciculus myelination', description: 'The arcuate fasciculus (the major white matter highway connecting comprehension to speech) grows thicker myelin insulation.', highlightTarget: 'hippocampus', note: 'Arcuate fasciculus thickens myelin sheath' },
      { number: 3, title: 'Executive switching mastery', description: 'The left dorsolateral PFC and basal ganglia continuously inhibit the native language, building supreme attentional control.', highlightTarget: 'pfc', note: 'Frontal circuits master rapid language switching' },
      { number: 4, title: 'Bilingual reserve expansion', description: 'Dense bilateral cortical gray matter develops, creating an alternate cognitive highway system that buffers against aging.', highlightTarget: 'reward', note: 'Dense structural reserve buffers future cognitive aging' }
    ],
    result: { title: 'The result', description: 'Studies show bilingualism delays the clinical onset of dementia symptoms by an astonishing 4.5 years on average.' },
    goodNews: { title: 'The good news', description: 'Language acquisition builds new neural pathways at any age—adult learners gain identical executive cognitive benefits.', actionText: 'Start language learning today →' },
    timeline: [
      { stage: 'Normal balance', description: 'Monolingual baseline reliant on native left-hemisphere networks.' },
      { stage: 'After repeated use', description: 'Effortful cognitive switching and rapid vocabulary acquisition.' },
      { stage: 'Long-term', description: '4.5-year delay in dementia onset and agile executive focus.' }
    ]
  },
  {
    id: 'cold-exposure-resilience',
    category: 'neuroplasticity',
    title: 'Cold Water Exposure',
    subtitle: 'Norepinephrine surge & voluntary stress inoculation',
    badge: 'Norepinephrine surge',
    icon: 'Waves',
    steps: [
      { number: 1, title: 'Cutaneous cold shock', description: 'Cold receptors in the skin fire billions of electrical signals into the spinal cord, threatening homeostatic temperature.', highlightTarget: 'amygdala', note: 'Skin cold receptors trigger massive autonomic alarm' },
      { number: 2, title: 'Locus coeruleus noradrenaline blast', description: 'Norepinephrine surges by 250% to 500% in the brainstem, producing crystalline mental alertness and laser focus.', highlightTarget: 'pfc', note: 'Brainstem noradrenaline surges up to 500%' },
      { number: 3, title: 'Voluntary prefrontal override', description: 'The prefrontal cortex deliberately overrides the primal panic impulse to jump out, practicing conscious top-down calm.', highlightTarget: 'pfc', note: 'Conscious frontal control overrides primal panic' },
      { number: 4, title: 'Sustained dopamine plateau', description: 'Unlike drugs, cold exposure triggers a smooth 250% dopamine rise that persists for 3 to 4 hours without an acute crash.', highlightTarget: 'reward', note: 'Prolonged 250% dopamine rise without a crash' }
    ],
    result: { title: 'The result', description: 'Profound mood enhancement, elevated daytime vigilance, enhanced brown fat thermogenesis, and stress inoculation.' },
    goodNews: { title: 'The good news', description: 'Just 11 minutes total of cold exposure per week (e.g. 2-3 minutes per shower) delivers full metabolic and neural benefits.', actionText: 'Learn cold immersion protocol →' },
    timeline: [
      { stage: 'Normal balance', description: 'Normal autonomic stress response with low cold tolerance.' },
      { stage: 'After repeated use', description: 'Effortless calm under pressure and sustained morning dopamine lift.' },
      { stage: 'Long-term', description: 'Robust mental toughness and high vagal stress resilience.' }
    ]
  },
  {
    id: 'strength-training-brain',
    category: 'neuroplasticity',
    title: 'Resistance Training',
    subtitle: 'IGF-1 signaling & frontoparietal motor coordination',
    badge: 'Neuromuscular plasticity',
    icon: 'Dumbbell',
    steps: [
      { number: 1, title: 'Motor unit recruitment', description: 'Lifting heavy resistance forces the motor cortex to fire high-frequency rate coding, recruiting high-threshold motor units.', highlightTarget: 'pfc', note: 'Motor cortex activates high-threshold motor units' },
      { number: 2, title: 'Systemic IGF-1 surge', description: 'Muscle contraction releases Insulin-Like Growth Factor 1 (IGF-1), which crosses into the brain to stimulate synaptic health.', highlightTarget: 'hippocampus', note: 'Circulating IGF-1 stimulates cortical synaptic vitality' },
      { number: 3, title: 'White matter integrity protection', description: 'Resistance training specifically preserves white matter volume in the corpus callosum and frontoparietal networks.', highlightTarget: 'reward', note: 'Preserves white matter integrity against age decline' },
      { number: 4, title: 'Executive inhibition enhancement', description: 'Navigating complex movement form under load enhances response inhibition and spatial working memory in the PFC.', highlightTarget: 'pfc', note: 'Complex kinetic control sharpens frontal executive power' }
    ],
    result: { title: 'The result', description: 'Substantial boost in cognitive processing speed, protection against executive decline, and significant reduction in anxiety.' },
    goodNews: { title: 'The good news', description: 'Two to three resistance sessions per week show equivalent cognitive preservation benefits to cardiovascular training.', actionText: 'Explore lifting for brain health →' },
    timeline: [
      { stage: 'Normal balance', description: 'Baseline muscular tone with gradual age-related motor unit decline.' },
      { stage: 'After repeated use', description: 'Crisp neuromuscular coordination and elevated confidence.' },
      { stage: 'Long-term', description: 'Preserved white matter integrity and robust cognitive agility into old age.' }
    ]
  },
  {
    id: 'fasting-autophagy',
    category: 'neuroplasticity',
    title: 'Intermittent Fasting',
    subtitle: 'Ketone neuro-energetics & neuronal autophagy',
    badge: 'Neuronal autophagy',
    icon: 'Zap',
    steps: [
      { number: 1, title: 'Liver glycogen exhaustion', description: 'After 14-16 hours without calories, hepatic glycogen depletes; the liver begins converting fatty acids into beta-hydroxybutyrate (BHB).', highlightTarget: 'reward', note: 'Liver transitions to ketone (BHB) production' },
      { number: 2, title: 'Super-fuel for neurons', description: 'Ketones cross the blood-brain barrier, providing an ultra-clean fuel that produces fewer reactive oxygen species than glucose.', highlightTarget: 'pfc', note: 'Ketones provide clean ATP with minimal oxidative stress' },
      { number: 3, title: 'Neuronal autophagy triggered', description: 'Low insulin and mTOR inhibition activate cellular cleanup: lysosomes digest damaged mitochondria and misfolded proteins.', highlightTarget: 'hippocampus', note: 'Lysosomes clean out damaged cellular components' },
      { number: 4, title: 'BDNF and resilience spike', description: 'Mild metabolic fasting stress induces BDNF expression and mitochondrial biogenesis across cortical and hippocampal networks.', highlightTarget: 'hippocampus', note: 'Mitochondrial biogenesis multiplies cellular power plants' }
    ],
    result: { title: 'The result', description: 'Sustained cognitive clarity without post-lunch food comas, cellular rejuvenation, and enhanced metabolic flexibility.' },
    goodNews: { title: 'The good news', description: 'A gentle 16:8 time-restricted feeding window easily unlocks the cellular cleanup benefits without deprivation.', actionText: 'Discover intermittent fasting science →' },
    timeline: [
      { stage: 'Normal balance', description: 'Standard glucose-dependent metabolism with frequent energy crashes.' },
      { stage: 'After repeated use', description: 'Effortless metabolic switching with steady midday focus.' },
      { stage: 'Long-term', description: 'Enhanced cellular longevity and reduced neuro-inflammatory markers.' }
    ]
  },
  {
    id: 'musical-training',
    category: 'neuroplasticity',
    title: 'Musical Instrument Mastery',
    subtitle: 'Corpus callosum enlargement & multi-sensory binding',
    badge: 'Bi-hemispheric integration',
    icon: 'Music',
    steps: [
      { number: 1, title: 'Multisensory integration', description: 'Playing an instrument simultaneously engages visual notation, auditory feedback, and fine finger motor execution.', highlightTarget: 'pfc', note: 'Visual, auditory, and motor circuits fire in unison' },
      { number: 2, title: 'Corpus callosum enlargement', description: 'High-speed communication between left and right hemispheres physically enlarges the anterior corpus callosum bridge.', highlightTarget: 'reward', note: 'Corpus callosum expands to bridge hemispheres' },
      { number: 3, title: 'Auditory cortex reorganization', description: 'Primary auditory cortex (Heschl gyrus) expands its tonotopic representation, developing extraordinary pitch precision.', highlightTarget: 'hippocampus', note: 'Heschl gyrus expands pitch processing resolution' },
      { number: 4, title: 'Working memory amplification', description: 'Remembering musical phrasing, tempo, and emotional nuance builds extraordinary capacity in working memory buffers.', highlightTarget: 'pfc', note: 'Auditory working memory buffer expands dramatically' }
    ],
    result: { title: 'The result', description: 'Enhanced executive functioning, superior linguistic processing, heightened spatial-temporal reasoning, and emotional empathy.' },
    goodNews: { title: 'The good news', description: 'Neuroplastic benefits begin immediately upon starting an instrument, regardless of whether you start as a child or adult.', actionText: 'Explore musical neuroplasticity →' },
    timeline: [
      { stage: 'Normal balance', description: 'Standard inter-hemispheric communication speed and listening.' },
      { stage: 'After repeated use', description: 'Refined auditory discrimination and sharp bimanual coordination.' },
      { stage: 'Long-term', description: 'Enlarged corpus callosum and lifetime cognitive enrichment.' }
    ]
  },
  {
    id: 'cognitive-reframing',
    category: 'neuroplasticity',
    title: 'Cognitive Reframing & CBT',
    subtitle: 'Dorsolateral PFC modulation of limbic reactivity',
    badge: 'Top-down cognitive control',
    icon: 'Lightbulb',
    steps: [
      { number: 1, title: 'Automatic thought catch', description: 'The ventrolateral prefrontal cortex notices an automatic cognitive distortion ("I will fail this exam") before accepting it.', highlightTarget: 'pfc', note: 'Prefrontal awareness catches automatic cognitive distortion' },
      { number: 2, title: 'Evidentiary reality testing', description: 'Dorsolateral PFC evaluates empirical evidence for and against the thought, disengaging from irrational catastrophic bias.', highlightTarget: 'pfc', note: 'Dorsolateral circuits evaluate factual evidence' },
      { number: 3, title: 'Alternative narrative construction', description: 'A nuanced, grounded perspective is constructed, reducing the intensity of the limbic alarm signal.', highlightTarget: 'hippocampus', note: 'New rational perspective formulated in cortex' },
      { number: 4, title: 'Amygdala calming cascade', description: 'Prefrontal inhibitory interneurons release GABA onto the basolateral amygdala, reducing physiological adrenaline and fear.', highlightTarget: 'amygdala', note: 'GABA release dampens amygdala fear discharge' }
    ],
    result: { title: 'The result', description: 'Mastery over irrational anxiety, emotional self-regulation, resilience against despair, and proactive problem solving.' },
    goodNews: { title: 'The good news', description: 'Every time you deliberately reframe a catastrophic thought, you physically strengthen the inhibitory PFC-amygdala nerve tract.', actionText: 'Master cognitive reframing tools →' },
    timeline: [
      { stage: 'Normal balance', description: 'Automatic surrender to catastrophic or self-critical thoughts.' },
      { stage: 'After repeated use', description: 'Quick interruption of negative spirals through active reframing.' },
      { stage: 'Long-term', description: 'Instinctive cognitive resilience and emotional poise in crises.' }
    ]
  },
  {
    id: 'social-connection-oxytocin',
    category: 'neuroplasticity',
    title: 'Deep Social Connection',
    subtitle: 'Oxytocinergic bonding & amygdala threat dampening',
    badge: 'Oxytocin stress buffer',
    icon: 'HeartPulse',
    steps: [
      { number: 1, title: 'Empathetic gaze & resonance', description: 'Warm eye contact and attentive listening engage mirror neuron systems in the inferior frontal gyrus and insula.', highlightTarget: 'pfc', note: 'Mirror neuron networks mirror emotional resonance' },
      { number: 2, title: 'Hypothalamic oxytocin release', description: 'The paraventricular nucleus of the hypothalamus synthesizes oxytocin, releasing it directly into the brain and circulation.', highlightTarget: 'reward', note: 'Hypothalamus releases oxytocin, the trust hormone' },
      { number: 3, title: 'Amygdala threat dampening', description: 'Oxytocin receptors in the central amygdala inhibit fear neurons, dramatically buffering against social threat and isolation.', highlightTarget: 'amygdala', note: 'Oxytocin inhibits amygdalar fear circuits' },
      { number: 4, title: 'Vagal social engagement', description: 'The myelinated ventral vagal complex engages, slowing heart rate, relaxing facial muscles, and promoting safe bonding.', highlightTarget: 'hippocampus', note: 'Ventral vagal brake fosters biological safety and calm' }
    ],
    result: { title: 'The result', description: 'Powerful stress reduction, enhanced immune function, lowered blood pressure, and profound protection against all-cause mortality.' },
    goodNews: { title: 'The good news', description: 'Even a 10-minute genuine, vulnerable conversation or a shared laugh provides full oxytocinergic stress buffering.', actionText: 'Explore the science of human bonding →' },
    timeline: [
      { stage: 'Normal balance', description: 'Surface-level, guarded interactions with background social tension.' },
      { stage: 'After repeated use', description: 'Nurtured trust networks with prompt stress recovery after conflicts.' },
      { stage: 'Long-term', description: 'Deep community belonging adding up to 7+ years of healthy life expectancy.' }
    ]
  }
];

const allScenarios = [...SCENARIOS, ...remainingScenarios];

console.log(`Generated total of ${allScenarios.length} scenarios across ${CATEGORIES.length - 1} active categories.`);

const fileContent = `// BrainFlow 50 Comprehensive Neuroscience Scenarios
// Autogenerated and scientifically audited dataset across 5 core categories

export const CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};

export const SCENARIOS = ${JSON.stringify(allScenarios, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/scenarios.js'), fileContent, 'utf8');
console.log('Successfully wrote src/data/scenarios.js!');
