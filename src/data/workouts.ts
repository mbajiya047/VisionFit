import { Workout } from '../types';

export const WORKOUT_CATALOGUE: Workout[] = [
  {
    id: 'ignite-360',
    title: 'Ignite 360: Full Body MetCon',
    tagline: 'High-energy full-body metabolic conditioning for fat burn & endurance',
    description: 'A dynamic 20-minute circuit designed to activate all major muscle groups, elevate heart rate, and build functional athletic stamina without requiring bulky gym equipment.',
    category: 'hiit',
    difficulty: 'intermediate',
    durationMinutes: 20,
    estimatedCalories: 210,
    equipment: ['none'],
    targetMuscles: ['Quadriceps', 'Core', 'Shoulders', 'Glutes', 'Hamstrings'],
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    tags: ['Fat Burn', 'No Equipment', 'Full Body', 'Cardio Burst'],
    rating: 4.9,
    exercises: [
      {
        id: 'ex-warmup-jumping-jacks',
        name: 'Aerobic Jumping Jacks',
        category: 'cardio',
        durationSeconds: 40,
        defaultRestSeconds: 20,
        targetMuscles: ['Calves', 'Shoulders', 'Cardiovascular System'],
        equipment: 'none',
        difficulty: 'beginner',
        instructions: [
          'Stand upright with feet together and arms resting at your sides.',
          'Jump feet outwards shoulder-width apart while sweeping arms overhead in an arc.',
          'Spring lightly back to the starting stance on the balls of your feet and repeat in a continuous rhythm.'
        ],
        formCues: ['Land softly on balls of feet', 'Keep knees slightly soft', 'Breathe rhythmically'],
        commonMistakes: ['Landing heavily on heels', 'Slouching shoulders forward'],
        accessibleAlternative: {
          name: 'Low-Impact Step Jacks',
          description: 'Step one foot laterally to the side while raising arms overhead; eliminate jumping to protect knees.',
          intensity: 'low-impact'
        },
        animationType: 'jumping-jacks',
        repsTarget: 30
      },
      {
        id: 'ex-bodyweight-squats',
        name: 'Tempo Air Squats',
        category: 'strength',
        durationSeconds: 45,
        defaultRestSeconds: 20,
        targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
        equipment: 'none',
        difficulty: 'intermediate',
        instructions: [
          'Set feet shoulder-width apart with toes flared slightly outwards (10-15 degrees).',
          'Hinge hips backwards and descend under control until thighs reach parallel with the floor.',
          'Drive through the center of your feet to stand tall, squeezing glutes at the top.'
        ],
        formCues: ['Chest proud and gaze straight ahead', 'Knees track over toes', 'Keep weight balanced through midfoot'],
        commonMistakes: ['Knees caving inward (valgus collapse)', 'Heels lifting off the ground'],
        accessibleAlternative: {
          name: 'Chair / Box Squat',
          description: 'Sit back onto a sturdy living room chair and stand upright; reduces knee strain and ensures depth consistency.',
          intensity: 'modified'
        },
        animationType: 'squat',
        repsTarget: 18
      },
      {
        id: 'ex-incline-pushups',
        name: 'Standard Push-Ups',
        category: 'strength',
        durationSeconds: 40,
        defaultRestSeconds: 20,
        targetMuscles: ['Pectorals', 'Triceps', 'Anterior Deltoids', 'Core'],
        equipment: 'none',
        difficulty: 'intermediate',
        instructions: [
          'Place palms on the floor slightly wider than shoulder-width, wrists stacked beneath shoulders.',
          'Brace core into a solid rigid plank line from crown to heels.',
          'Lower chest until 2 inches above the ground with elbows at a 45-degree arrow angle, then press firmly up.'
        ],
        formCues: ['Keep neck neutral', 'Squeeze glutes to lock hips', 'Elbows tucked 45 degrees'],
        commonMistakes: ['Sagging lower back', 'Flaring elbows straight out to 90 degrees'],
        accessibleAlternative: {
          name: 'Knee Push-Ups or Wall Push-Ups',
          description: 'Rest knees on a yoga mat or place hands against a wall/sofa armrest to reduce load by 40-60%.',
          intensity: 'modified'
        },
        animationType: 'pushup',
        repsTarget: 15
      },
      {
        id: 'ex-reverse-lunges',
        name: 'Alternating Reverse Lunges',
        category: 'strength',
        durationSeconds: 45,
        defaultRestSeconds: 20,
        targetMuscles: ['Quadriceps', 'Gluteus Maximus', 'Calves', 'Core'],
        equipment: 'none',
        difficulty: 'intermediate',
        instructions: [
          'Stand tall with hands on hips or clasped at chest level.',
          'Take a controlled step backward with your right foot, lowering until both knees reach 90-degree angles.',
          'Press through the front heel to return to standing, then switch to the left leg.'
        ],
        formCues: ['Front knee stays stacked over ankle', 'Torso remains upright', 'Control the downward tempo'],
        commonMistakes: ['Banging back knee on hard floor', 'Leaning torso excessively forward'],
        accessibleAlternative: {
          name: 'Supported Static Split Squat',
          description: 'Hold onto a wall or sturdy chair for balance and pulse in place without stepping back each rep.',
          intensity: 'low-impact'
        },
        animationType: 'lunge',
        repsTarget: 16
      },
      {
        id: 'ex-mountain-climbers',
        name: 'Dynamic Mountain Climbers',
        category: 'cardio',
        durationSeconds: 40,
        defaultRestSeconds: 20,
        targetMuscles: ['Core', 'Hip Flexors', 'Shoulders', 'Cardio'],
        equipment: 'none',
        difficulty: 'intermediate',
        instructions: [
          'Start in a high plank position with shoulders directly above wrists.',
          'Drive right knee forward toward chest in a smooth running motion.',
          'Quickly switch legs, maintaining a flat back and engaged abdominal wall.'
        ],
        formCues: ['Keep hips level with shoulders', 'Quick feet with light taps', 'Breathe through the effort'],
        commonMistakes: ['Piking hips high in the air', 'Bouncing shoulders uncontrollably'],
        accessibleAlternative: {
          name: 'Slow Elevated Mountain Climbers',
          description: 'Place hands on an elevated surface (couch, coffee table) and perform deliberate, slow marches.',
          intensity: 'modified'
        },
        animationType: 'mountain-climbers',
        repsTarget: 36
      },
      {
        id: 'ex-plank-hold',
        name: 'Forearm Pillar Plank',
        category: 'core',
        durationSeconds: 45,
        defaultRestSeconds: 25,
        targetMuscles: ['Transverse Abdominis', 'Rectus Abdominis', 'Shoulders', 'Glutes'],
        equipment: 'mat',
        difficulty: 'beginner',
        instructions: [
          'Rest forearms on the floor with elbows directly under shoulders, forearms parallel.',
          'Extend legs back onto toes, engaging core and quadriceps into a solid plank.',
          'Actively push forearms into the floor and hold steady while breathing deeply.'
        ],
        formCues: ['Tuck tailbone slightly', 'Push shoulder blades apart', 'Breathe steadily without holding breath'],
        commonMistakes: ['Allowing lower back to hyperextend', 'Holding breath'],
        accessibleAlternative: {
          name: 'Knee Plank Hold',
          description: 'Lower knees to the mat while keeping hips in line with shoulders; preserves core stimulation with less spinal load.',
          intensity: 'low-impact'
        },
        animationType: 'plank',
        repsTarget: 1
      }
    ]
  },
  {
    id: 'morning-mobility-flow',
    title: 'Fire TV Morning Mobility & Spinal Flow',
    tagline: 'Gentle joint decompression, hip opening, and spinal reactivation',
    description: 'The ideal routine to start your day or reset after prolonged sitting. Enhances circulation, releases lower back stiffness, and promotes mindful mobility right in front of your TV.',
    category: 'mobility',
    difficulty: 'beginner',
    durationMinutes: 14,
    estimatedCalories: 85,
    equipment: ['none'],
    targetMuscles: ['Spine', 'Hip Flexors', 'Thoracic Spine', 'Hamstrings', 'Shoulders'],
    featured: true,
    heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Mobility', 'Posture', 'Low Impact', 'Morning Routine'],
    rating: 4.95,
    exercises: [
      {
        id: 'ex-cat-cow',
        name: 'Cat-Cow Spinal Articulation',
        category: 'mobility',
        durationSeconds: 50,
        defaultRestSeconds: 15,
        targetMuscles: ['Thoracic Spine', 'Lumbar Spine', 'Core'],
        equipment: 'mat',
        difficulty: 'beginner',
        instructions: [
          'Begin on all fours on your mat with hands beneath shoulders and knees beneath hips.',
          'Inhale as you drop belly toward the floor, lifting chest and tailbone (Cow Pose).',
          'Exhale as you arch spine toward ceiling, tucking chin to chest and tailbone under (Cat Pose).'
        ],
        formCues: ['Move vertebra by vertebra', 'Match movement to full breaths', 'Relax neck completely in Cat'],
        commonMistakes: ['Rushing the motion without breathing', 'Bending elbows'],
        accessibleAlternative: {
          name: 'Seated Cat-Cow',
          description: 'Perform spinal flexion and extension while seated upright in a comfortable chair.',
          intensity: 'seated'
        },
        animationType: 'cat-cow',
        repsTarget: 10
      },
      {
        id: 'ex-worlds-greatest-stretch',
        name: "World's Greatest Stretch",
        category: 'mobility',
        durationSeconds: 60,
        defaultRestSeconds: 20,
        targetMuscles: ['Hip Flexors', 'Thoracic Spine', 'Hamstrings', 'Glutes'],
        equipment: 'none',
        difficulty: 'beginner',
        instructions: [
          'Step forward into a deep lunge with right foot outside your right hand.',
          'Lower back knee slightly, place left hand firmly on mat, and rotate right arm toward the ceiling.',
          'Pause at the peak of the thoracic twist, return hand down, and switch sides.'
        ],
        formCues: ['Follow your moving hand with your eyes', 'Keep front heel grounded', 'Inhale into the twist'],
        commonMistakes: ['Rushing the rotation', 'Letting front foot roll off the floor'],
        accessibleAlternative: {
          name: 'Standing Torso Reach & Lunge',
          description: 'Keep feet wider than hip-width and perform gentle standing reaches side-to-side.',
          intensity: 'low-impact'
        },
        animationType: 'lunge',
        repsTarget: 8
      },
      {
        id: 'ex-glute-bridge',
        name: 'Posterior Glute Bridges',
        category: 'strength',
        durationSeconds: 45,
        defaultRestSeconds: 15,
        targetMuscles: ['Gluteus Maximus', 'Hamstrings', 'Pelvic Stabilizers'],
        equipment: 'mat',
        difficulty: 'beginner',
        instructions: [
          'Lie flat on back with knees bent and feet flat on the floor, hip-width apart.',
          'Press arms into floor alongside torso and drive through heels to elevate hips toward the ceiling.',
          'Hold at peak contraction for 2 seconds with glutes engaged, then lower slowly.'
        ],
        formCues: ['Drive through heels', 'Do not overarch lower back', 'Squeeze glutes hard at peak'],
        commonMistakes: ['Hyperextending spine past neutral', 'Pushing with toes instead of heels'],
        accessibleAlternative: {
          name: 'Standing Glute Kickback',
          description: 'Stand tall holding onto a chair and kick one heel backward to isolate glutes without floor work.',
          intensity: 'low-impact'
        },
        animationType: 'glute-bridge',
        repsTarget: 14
      },
      {
        id: 'ex-downward-dog',
        name: 'Downward Facing Dog to Cobra',
        category: 'yoga',
        durationSeconds: 50,
        defaultRestSeconds: 15,
        targetMuscles: ['Calves', 'Hamstrings', 'Shoulders', 'Abdominals'],
        equipment: 'mat',
        difficulty: 'beginner',
        instructions: [
          'Push hips back and up into an inverted V-shape, pressing heels gently toward mat.',
          'Pedal feet alternately to stretch calves and open hamstrings.',
          'Glide forward into a gentle upward dog or cobra, lifting collarbones and opening chest.'
        ],
        formCues: ['Spread fingers wide', 'Long spine over straight legs', 'Unclench jaw and relax face'],
        commonMistakes: ['Shrugging shoulders into ears', 'Rounding spine excessively'],
        accessibleAlternative: {
          name: 'Wall Downward Dog Stretch',
          description: 'Place hands flat on wall at hip height and step back until back is parallel to floor.',
          intensity: 'low-impact'
        },
        animationType: 'downward-dog',
        repsTarget: 6
      }
    ]
  },
  {
    id: 'core-armor-10',
    title: 'Core Armor: 10-Min Fire TV Abs',
    tagline: 'Deep abdominal bracing and rotational strength for posture and stability',
    description: 'A focused, zero-impact core session targeting both superficial abdominal muscles and deep transverse stabilizers for improved lower-back resilience and daily vitality.',
    category: 'core',
    difficulty: 'beginner',
    durationMinutes: 10,
    estimatedCalories: 75,
    equipment: ['mat'],
    targetMuscles: ['Rectus Abdominis', 'Obliques', 'Transverse Abdominis', 'Lower Back'],
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Core', 'Quick 10-Min', 'Zero Equipment', 'Posture'],
    rating: 4.88,
    exercises: [
      {
        id: 'ex-deadbug',
        name: 'Controlled Deadbug Iso-Hold',
        category: 'core',
        durationSeconds: 45,
        defaultRestSeconds: 15,
        targetMuscles: ['Transverse Abdominis', 'Coordination', 'Pelvic Floor'],
        equipment: 'mat',
        difficulty: 'beginner',
        instructions: [
          'Lie flat on back with arms reaching up to ceiling and knees bent at 90 degrees directly above hips.',
          'Press lower back firmly into floor so no daylight shows beneath your spine.',
          'Slowly lower right arm back and extend left leg forward simultaneously without lifting lower back.',
          'Return to start and repeat on opposite diagonal.'
        ],
        formCues: ['Lower back glued to floor', 'Move slow and deliberate', 'Breathe out on extension'],
        commonMistakes: ['Lower back arching off mat', 'Moving too fast with momentum'],
        accessibleAlternative: {
          name: 'Bent Knee Toe Taps',
          description: 'Keep arms by sides and tap one toe at a time to floor from 90-degree tabletop position.',
          intensity: 'low-impact'
        },
        animationType: 'plank',
        repsTarget: 14
      },
      {
        id: 'ex-bird-dog',
        name: 'Bird-Dog Stability Extension',
        category: 'core',
        durationSeconds: 45,
        defaultRestSeconds: 15,
        targetMuscles: ['Multifidus', 'Glutes', 'Deltoids', 'Core'],
        equipment: 'mat',
        difficulty: 'beginner',
        instructions: [
          'Position on hands and knees with wrists under shoulders and knees under hips.',
          'Simultaneously reach right arm forward and kick left leg straight back until parallel to floor.',
          'Hold 2 seconds, maintaining square hips, then return with control and switch sides.'
        ],
        formCues: ['Imagine balancing a glass of water on your lower back', 'Squeeze glute at full extension', 'Keep neck long'],
        commonMistakes: ['Tilting hips to the side', 'Kicking leg higher than hip height'],
        accessibleAlternative: {
          name: 'Arm-Only Bird-Dog',
          description: 'Keep both knees on floor and practice extending only alternating arms forward.',
          intensity: 'low-impact'
        },
        animationType: 'plank',
        repsTarget: 12
      },
      {
        id: 'ex-side-plank',
        name: 'Lateral Side Plank Hold',
        category: 'core',
        durationSeconds: 40,
        defaultRestSeconds: 20,
        targetMuscles: ['Internal Obliques', 'External Obliques', 'Quadratus Lumborum'],
        equipment: 'mat',
        difficulty: 'intermediate',
        instructions: [
          'Lie on right side with elbow directly beneath shoulder and legs stacked straight.',
          'Lift hips until body forms a straight diagonal line from ankles to head.',
          'Hold steady for 20 seconds, then roll over and execute on left side.'
        ],
        formCues: ['Do not let hips droop toward mat', 'Top shoulder drawn back', 'Core clamped tight'],
        commonMistakes: ['Hips sagging backwards', 'Elbow placed too far ahead of shoulder'],
        accessibleAlternative: {
          name: 'Knee Side Plank',
          description: 'Bend knees at 90 degrees and support weight on forearm and bottom knee; reduces leverage load by half.',
          intensity: 'modified'
        },
        animationType: 'plank',
        repsTarget: 1
      },
      {
        id: 'ex-bicycle-crunches',
        name: 'Slow Tempo Bicycle Crosses',
        category: 'core',
        durationSeconds: 40,
        defaultRestSeconds: 20,
        targetMuscles: ['Obliques', 'Upper & Lower Abdominals'],
        equipment: 'mat',
        difficulty: 'intermediate',
        instructions: [
          'Lie on back with fingertips lightly touching behind ears and knees at 90 degrees.',
          'Rotate left armpit toward right knee while extending left leg straight out at 45 degrees.',
          'Hold 1 second at the contraction, then alternate to opposite side in a controlled cadence.'
        ],
        formCues: ['Think armpit to knee, not elbow to knee', 'Keep elbows wide open', 'Keep motion slow and smooth'],
        commonMistakes: ['Pulling on the neck with hands', 'Jerking frantically from side to side'],
        accessibleAlternative: {
          name: 'Seated In-and-Outs or Seated Bicycle Taps',
          description: 'Sit on edge of sofa and tap opposite hand to lifted knee with upright spine.',
          intensity: 'seated'
        },
        animationType: 'plank',
        repsTarget: 20
      }
    ]
  },
  {
    id: 'dumbbell-power-hypertrophy',
    title: 'Dumbbell Power & Hypertrophy',
    tagline: 'Progressive resistance training for upper & lower body functional strength',
    description: 'A 25-minute structured strength session utilizing a pair of medium dumbbells to build lean muscle tissue, boost bone density, and enhance overall metabolic rate.',
    category: 'strength',
    difficulty: 'intermediate',
    durationMinutes: 25,
    estimatedCalories: 240,
    equipment: ['dumbbells'],
    targetMuscles: ['Biceps', 'Triceps', 'Deltoids', 'Pectorals', 'Quadriceps', 'Back'],
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Strength', 'Dumbbells', 'Hypertrophy', 'Upper & Lower'],
    rating: 4.92,
    exercises: [
      {
        id: 'ex-db-goblet-squat',
        name: 'Dumbbell Goblet Squats',
        category: 'strength',
        durationSeconds: 45,
        defaultRestSeconds: 25,
        targetMuscles: ['Quadriceps', 'Glutes', 'Upper Back', 'Core'],
        equipment: 'dumbbells',
        difficulty: 'intermediate',
        instructions: [
          'Hold one dumbbell vertically against your chest with both palms cupping the top head.',
          'Set feet slightly wider than shoulders and descend into a deep squat, keeping elbows inside knees.',
          'Drive through heels to rise to standing, locking hips with authority.'
        ],
        formCues: ['Keep dumbbell glued to sternum', 'Knees track over second toe', 'Chest stays lifted throughout'],
        commonMistakes: ['Tipping forward so weight pulls chest down', 'Knees tracking inwards'],
        accessibleAlternative: {
          name: 'Bodyweight Chair Squats',
          description: 'Perform the squat without dumbbells using bodyweight and an optional chair support.',
          intensity: 'modified'
        },
        animationType: 'squat',
        repsTarget: 14
      },
      {
        id: 'ex-db-bent-over-row',
        name: 'Dumbbell Bent-Over Rows',
        category: 'strength',
        durationSeconds: 45,
        defaultRestSeconds: 25,
        targetMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Rear Deltoids', 'Biceps'],
        equipment: 'dumbbells',
        difficulty: 'intermediate',
        instructions: [
          'Hinge forward at hips at a 45-degree angle with soft knees, holding dumbbells at arm length.',
          'Pull dumbbells upward toward hip pockets, driving elbows toward ceiling.',
          'Squeeze shoulder blades firmly together for 1 second, then lower under control.'
        ],
        formCues: ['Flat back like a tabletop', 'Pull with back, not hands', 'Keep neck in neutral alignment'],
        commonMistakes: ['Rounding the lumbar spine', 'Using jerky body momentum to swing weights'],
        accessibleAlternative: {
          name: 'Resistance Band or Towel Isometric Pull',
          description: 'Anchor a towel or resistance band under feet and pull upwards against tension.',
          intensity: 'low-impact'
        },
        animationType: 'pushup',
        repsTarget: 12
      },
      {
        id: 'ex-db-overhead-press',
        name: 'Standing Overhead Dumbbell Press',
        category: 'strength',
        durationSeconds: 40,
        defaultRestSeconds: 25,
        targetMuscles: ['Deltoids', 'Triceps', 'Upper Trapezius', 'Core Stabilizers'],
        equipment: 'dumbbells',
        difficulty: 'intermediate',
        instructions: [
          'Hold dumbbells at shoulder height with palms facing forward or neutral.',
          'Brace glutes and core, then press weights overhead until arms are extended straight.',
          'Lower weights slowly back to collarbone level with controlled resistance.'
        ],
        formCues: ['Ribs down, avoid backward arching', 'Press straight overhead, not forward', 'Exhale on the press'],
        commonMistakes: ['Hyperextending lower back to compensate', 'Dropping weights rapidly'],
        accessibleAlternative: {
          name: 'Seated Light Dumbbell Press',
          description: 'Sit in a supportive chair with back firmly pressed against seat; removes spinal shear stress.',
          intensity: 'seated'
        },
        animationType: 'pushup',
        repsTarget: 10
      },
      {
        id: 'ex-db-romanian-deadlift',
        name: 'Dumbbell Romanian Deadlifts',
        category: 'strength',
        durationSeconds: 45,
        defaultRestSeconds: 25,
        targetMuscles: ['Hamstrings', 'Glutes', 'Erector Spinae'],
        equipment: 'dumbbells',
        difficulty: 'intermediate',
        instructions: [
          'Hold dumbbells in front of thighs with feet hip-distance apart and a slight bend in knees.',
          'Hinge at hips, pushing butt toward wall behind you while sliding weights down shins.',
          'Stop when you feel a deep stretch in hamstrings, then squeeze glutes to snap hips forward.'
        ],
        formCues: ['Weights stay skimming close to legs', 'Flat spine at all times', 'Movement happens at the hips, not knees'],
        commonMistakes: ['Squatting instead of hinging', 'Allowing back to round at bottom'],
        accessibleAlternative: {
          name: 'Bodyweight Good Mornings',
          description: 'Place hands behind head and practice hip hinge mechanics without added weights.',
          intensity: 'low-impact'
        },
        animationType: 'squat',
        repsTarget: 12
      }
    ]
  },
  {
    id: 'desk-worker-posture-reset',
    title: 'Desk Worker Posture Reset',
    tagline: 'Targeted corrective mobility to counteract slouching and neck tension',
    description: 'Specifically engineered for people who spend long hours seated before screens. Opens tight pectorals, strengthens weak mid-back retractors, and aligns cervical posture in 12 efficient minutes.',
    category: 'mobility',
    difficulty: 'beginner',
    durationMinutes: 12,
    estimatedCalories: 60,
    equipment: ['none'],
    targetMuscles: ['Rhomboids', 'Lower Trapezius', 'Chest', 'Neck Extensors'],
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    tags: ['Posture', 'Desk Worker', 'Neck & Shoulders', 'No Equipment'],
    rating: 4.96,
    exercises: [
      {
        id: 'ex-standing-y-t-w',
        name: 'Wall Angels & Y-T-W Back Retractions',
        category: 'mobility',
        durationSeconds: 50,
        defaultRestSeconds: 15,
        targetMuscles: ['Lower Trapezius', 'Rhomboids', 'Rotator Cuff'],
        equipment: 'none',
        difficulty: 'beginner',
        instructions: [
          'Stand tall with back flat against a wall or free standing with slight hip hinge.',
          'Raise arms into a "Y" position overhead, thumbs pointing backward.',
          'Pull elbows down into a "W" shape, squeezing shoulder blades together and down.',
          'Extend arms straight out laterally into a "T" shape, pinching shoulder blades again.'
        ],
        formCues: ['Keep chin tucked', 'Feel shoulder blades glide down the ribcage', 'No shoulder shrugging'],
        commonMistakes: ['Arching lower back off wall', 'Lifting shoulders to ears'],
        accessibleAlternative: {
          name: 'Seated Shoulder Blade Pinches',
          description: 'Sit tall and gently pinch shoulder blades together for 5-second isometric holds.',
          intensity: 'seated'
        },
        animationType: 'arm-circles',
        repsTarget: 10
      },
      {
        id: 'ex-doorway-chest-opener',
        name: 'Doorway Pectoral Stretch',
        category: 'mobility',
        durationSeconds: 50,
        defaultRestSeconds: 15,
        targetMuscles: ['Pectoralis Major', 'Pectoralis Minor', 'Anterior Deltoids'],
        equipment: 'none',
        difficulty: 'beginner',
        instructions: [
          'Position forearms along a door frame or imagine a wall corner with elbows at 90 degrees.',
          'Step one foot forward until you feel a comfortable stretch across chest and front shoulders.',
          'Hold for 25 seconds, breathe deeply, then switch leading foot and repeat.'
        ],
        formCues: ['Keep spine tall', 'Breathe into the chest expansion', 'Gentle tension, never sharp pain'],
        commonMistakes: ['Twisting spine instead of stretching chest', 'Holding breath'],
        accessibleAlternative: {
          name: 'Interlaced Hand Chest Expansion',
          description: 'Interlace fingers behind lower back and gently straighten arms to open chest while standing.',
          intensity: 'low-impact'
        },
        animationType: 'arm-circles',
        repsTarget: 2
      },
      {
        id: 'ex-chin-tucks',
        name: 'Cervical Retraction Chin Tucks',
        category: 'mobility',
        durationSeconds: 40,
        defaultRestSeconds: 15,
        targetMuscles: ['Deep Neck Flexors', 'Suboccipitals'],
        equipment: 'none',
        difficulty: 'beginner',
        instructions: [
          'Sit or stand upright looking straight forward at TV screen.',
          'Gently glide head straight backwards like creating a double chin without tilting head down.',
          'Hold retraction for 3 seconds, release to neutral, and repeat.'
        ],
        formCues: ['Keep eyes level with horizon', 'Motion is backwards, not tilting down', 'Subtle, gentle movement'],
        commonMistakes: ['Tilting head down toward chest', 'Straining facial muscles'],
        accessibleAlternative: {
          name: 'Gentle Neck Side Rolls',
          description: 'Gently drop right ear toward right shoulder, pause, then roll to left side.',
          intensity: 'seated'
        },
        animationType: 'cat-cow',
        repsTarget: 10
      }
    ]
  },
  {
    id: 'evening-wind-down-stretch',
    title: 'Evening Wind-Down & Deep Stretch',
    tagline: 'Parasympathetic recovery flow to lower cortisol and prepare for restful sleep',
    description: 'A deeply restorative 15-minute floor routine that calms the nervous system, lengthens chronically tight muscles, and transitions body and mind into restful sleep mode.',
    category: 'recovery',
    difficulty: 'beginner',
    durationMinutes: 15,
    estimatedCalories: 65,
    equipment: ['mat'],
    targetMuscles: ['Hamstrings', 'Glutes', 'Hips', 'Spine', 'Shoulders'],
    featured: false,
    heroImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    tags: ['Recovery', 'Sleep', 'Deep Stretch', 'Yoga Flow'],
    rating: 4.98,
    exercises: [
      {
        id: 'ex-childs-pose',
        name: 'Extended Child’s Pose (Balasana)',
        category: 'yoga',
        durationSeconds: 60,
        defaultRestSeconds: 15,
        targetMuscles: ['Lats', 'Hips', 'Lower Back', 'Ankles'],
        equipment: 'mat',
        difficulty: 'beginner',
        instructions: [
          'Kneel on mat with big toes touching and knees spread comfortably wide.',
          'Sit hips back onto heels and extend arms forward on the floor, resting forehead on mat.',
          'Inhale deeply into your back ribs and exhale tension completely.'
        ],
        formCues: ['Let chest melt toward floor', 'Walk fingertips forward for lat stretch', 'Slow 4-second inhales, 6-second exhales'],
        commonMistakes: ['Tensing shoulders', 'Holding breath'],
        accessibleAlternative: {
          name: 'Seated Forward Fold in Chair',
          description: 'Sit on chair with knees wide and gently fold torso over thighs, letting arms dangle toward floor.',
          intensity: 'seated'
        },
        animationType: 'cat-cow',
        repsTarget: 1
      },
      {
        id: 'ex-pigeon-pose',
        name: 'Reclined Figure-4 Glute Stretch',
        category: 'recovery',
        durationSeconds: 60,
        defaultRestSeconds: 15,
        targetMuscles: ['Piriformis', 'Gluteus Medius', 'Hip Capsule'],
        equipment: 'mat',
        difficulty: 'beginner',
        instructions: [
          'Lie on back with knees bent and feet flat on mat.',
          'Cross right ankle over left knee to make a "4" shape.',
          'Reach hands through and grasp back of left thigh, gently drawing knee toward chest.',
          'Hold 30 seconds, then switch legs.'
        ],
        formCues: ['Flex crossed foot to protect knee', 'Keep shoulders relaxed on mat', 'Breathe through the hip opening'],
        commonMistakes: ['Lifting head off floor with tension', 'Forcing the stretch past comfortable limits'],
        accessibleAlternative: {
          name: 'Seated Figure-4 Stretch',
          description: 'Cross ankle over opposite knee while sitting upright in your living room sofa or chair.',
          intensity: 'seated'
        },
        animationType: 'glute-bridge',
        repsTarget: 2
      },
      {
        id: 'ex-supine-twist',
        name: 'Supine Torso Spinal Twist',
        category: 'recovery',
        durationSeconds: 60,
        defaultRestSeconds: 15,
        targetMuscles: ['Thoracic Spine', 'Obliques', 'Chest'],
        equipment: 'mat',
        difficulty: 'beginner',
        instructions: [
          'Lie on back, hug right knee into chest, and let right knee fall gently across body to the left.',
          'Extend right arm out to the right like a wing, turning gaze toward right fingertips.',
          'Hold for 30 seconds with deep breaths, then switch sides.'
        ],
        formCues: ['Keep both shoulder blades pinned to the floor', 'Allow gravity to draw knee down', 'Breathe deeply into abdomen'],
        commonMistakes: ['Forcing knee to floor at expense of lifting shoulder'],
        accessibleAlternative: {
          name: 'Seated Gentle Chair Twist',
          description: 'Sit in chair and place opposite hand on outer thigh to gently rotate upper torso.',
          intensity: 'seated'
        },
        animationType: 'lunge',
        repsTarget: 2
      }
    ]
  }
];
