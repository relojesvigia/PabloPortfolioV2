/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT — Pablo Cobián
 *  Everything the site shows lives in this file.
 * ─────────────────────────────────────────────────────────────
 *
 *  ADD A PROJECT
 *    Append one object to `projects`. The overview grid, the detail
 *    page and the sidebar navigation all update automatically.
 *
 *  IMAGES
 *    Put files in src/assets/images/ with the filenames used below.
 *    The extension is ignored, so project-01-hero.jpg / .png / .webp
 *    all match `src: 'project-01-hero.jpg'`. Missing files render as a
 *    soft placeholder showing the expected filename.
 *    Full URLs (https://…) or /public paths also work as `src`.
 *
 *  ANNOTATIONS
 *    Any ImageAsset can carry `annotations` (dot + leader line + label),
 *    positioned in % of the image. Adjust x/y once real images are in.
 */

/* ── Types ─────────────────────────────────────────────────── */

export interface Annotation {
  /** Anchor point, in % from the image's left / top edge (0–100). */
  x: number;
  y: number;
  label: string;
  note?: string;
  /** Leader-line offset from the anchor to the label, in %. Defaults point inward. */
  dx?: number;
  dy?: number;
}

export interface ImageAsset {
  /** Filename inside src/assets/images/ (extension optional) or an absolute URL. */
  src: string;
  alt: string;
  caption?: string;
  annotations?: Annotation[];
}

export interface TextBlock {
  title: string;
  body: string;
  /** Phrases inside `body` rendered in bold. */
  highlights?: string[];
}

export interface Callout {
  label: string;
  text: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Project {
  /** URL-safe id, used as the #anchor. */
  id: string;
  number: string;
  title: string;
  /** Short name used in the sidebar. */
  shortTitle: string;
  /** Discipline line under the title. */
  subtitle: string;
  /** One-sentence summary. */
  tagline: string;
  sections: {
    concept: TextBlock;
    ideation: TextBlock;
    process: TextBlock & {
      materials?: { title: string; body: string; callouts: Callout[] };
    };
    final: TextBlock;
  };
  specs: Spec[];
  images: {
    card: ImageAsset; // projects overview grid
    hero: ImageAsset; // full-width hero slide
    concept: ImageAsset; // concept & ideation (right column)
    sketch: ImageAsset; // design process — sketches
    process: ImageAsset; // design process — prototype / materials
    final: ImageAsset; // final product
  };
}

export interface Skill {
  number: string;
  title: string;
  description: string;
  /** 0–100 */
  level: number;
}

export interface SoftwareTool {
  id: string;
  name: string;
  /** Letters shown on the coloured tile. */
  initials: string;
  color: string;
  textColor: string;
  level: 'Expert' | 'Advanced' | 'Proficient';
  description: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  description: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
}

export interface NavItem {
  id: string;
  label: string;
  children?: NavItem[];
}

/* ── Profile & contact ─────────────────────────────────────── */

export const profile = {
  name: 'Pablo Cobián',
  title: 'Industrial Designer & Creative',
  location: 'Querétaro, Mexico',
  workMode: 'Freelance / Independent',
  statement:
    'I design products with identity, functionality, and lasting character. Good design should solve problems without losing the beauty, personality, and human connection that make an object worth keeping.',
  statementHighlights: [
    'identity, functionality, and lasting character',
    'beauty, personality, and human connection',
  ],
  bio: 'I’m an Industrial Designer based in Querétaro, Mexico, with a background in product development, materials, ergonomics, and design methodologies. My work spans product and furniture design, branding, visual communication, and entrepreneurship — across freelance collaborations and my own ventures, particularly Vigía.',
  pillars: [
    {
      category: 'Product design',
      items: 'Product development · Furniture · Materials · Prototyping · Manufacturing',
    },
    {
      category: 'Brand & entrepreneurship',
      items: 'Vigía · Branding · Product positioning · E-commerce · Marketing',
    },
    {
      category: 'Visual communication',
      items: 'Photography · Videography · FPV · 3D visualization · Storytelling',
    },
  ],
};

export const contact = {
  email: 'cobian.borobia.pablo@gmail.com',
  phone: '+52 442 255 3528',
  phoneHref: 'tel:+524422553528',
  whatsappUrl: 'https://w.app/pablocobian',
  whatsappLabel: 'Chat on WhatsApp',
  availability: 'Open to freelance projects, collaborations and product development.',
};

/* ── Section copy (labels, titles, intros) ─────────────────── */

export const sectionCopy = {
  about: { label: 'hello, I’m' },
  cv: {
    label: 'curriculum',
    title: 'Strengths & tools',
    intro:
      'Bridging physical prototyping, CAD surface modelling, ergonomics and visual storytelling into character-driven products.',
  },
  experience: {
    label: 'the path so far',
    title: 'Experience & education',
  },
  projects: {
    label: 'selected work',
    title: 'Projects',
    intro:
      'Four products, from first sketch to final object — each one a study in how form, material and use shape each other.',
  },
  contact: {
    label: 'let’s talk',
    title: 'Let’s design something with character.',
    titleEmphasis: ['with character.'],
    intro: 'Have a product, a brand or an idea that needs shape? I’d love to hear about it.',
  },
};

/* ── CV ────────────────────────────────────────────────────── */

export const skills: Skill[] = [
  {
    number: '01',
    title: 'Product & Industrial Design',
    description:
      'Developing products from research and concept through form, materials, ergonomics, prototyping and final presentation.',
    level: 90,
  },
  {
    number: '02',
    title: '3D Modelling & Visualization',
    description:
      'Translating concepts into detailed 3D models, renders and visual presentations that communicate design intent.',
    level: 85,
  },
  {
    number: '03',
    title: 'Concept Development & Problem Solving',
    description:
      'Researching problems, generating concepts, exploring alternatives and developing practical solutions with a strong rationale.',
    level: 85,
  },
  {
    number: '04',
    title: 'Branding & Visual Communication',
    description:
      'Visual identities, product positioning, photography, video and presentation systems around physical products and brands.',
    level: 90,
  },
  {
    number: '05',
    title: 'Prototyping & Fabrication',
    description:
      'Building and refining physical prototypes with woodworking, CNC, laser engraving, moulding and other fabrication processes.',
    level: 80,
  },
];

export const software: SoftwareTool[] = [
  {
    id: 'ps',
    name: 'Photoshop',
    initials: 'Ps',
    color: '#001E36',
    textColor: '#31A8FF',
    level: 'Advanced',
    description: 'Image editing, product visualization, compositing and presentation graphics.',
  },
  {
    id: 'ai',
    name: 'Illustrator',
    initials: 'Ai',
    color: '#330000',
    textColor: '#FF9A00',
    level: 'Advanced',
    description: 'Vector graphics, branding, technical illustration and visual communication.',
  },
  {
    id: 'acad',
    name: 'AutoCAD',
    initials: 'A',
    color: '#FCE8E6',
    textColor: '#E11900',
    level: 'Advanced',
    description: '2D technical drawings, dimensioned plans and detailed documentation.',
  },
  {
    id: 'sw',
    name: 'SolidWorks',
    initials: 'SW',
    color: '#FDE8E8',
    textColor: '#DA291C',
    level: 'Expert',
    description: 'Detailed 3D modelling, mechanical design, assemblies and technical development.',
  },
  {
    id: 'rhino',
    name: 'Rhino 8',
    initials: 'Rh',
    color: '#2B2B2B',
    textColor: '#FFFFFF',
    level: 'Advanced',
    description: 'Form development, product design and complex free-form geometry.',
  },
  {
    id: 'f360',
    name: 'Fusion 360',
    initials: 'F',
    color: '#FFF1E6',
    textColor: '#EA7125',
    level: 'Proficient',
    description: 'CAD modelling, prototyping and manufacturing preparation.',
  },
  {
    id: 'dvr',
    name: 'DaVinci Resolve',
    initials: 'DR',
    color: '#161C28',
    textColor: '#FF4757',
    level: 'Expert',
    description: 'Colour grading, video editing, compositing and visual production.',
  },
  {
    id: 'pr',
    name: 'Adobe Premiere',
    initials: 'Pr',
    color: '#00005B',
    textColor: '#9999FF',
    level: 'Proficient',
    description: 'Video editing and visual production.',
  },
];

export const education: EducationItem[] = [
  {
    institution: 'Universidad Anáhuac Querétaro',
    degree: 'Bachelor’s Degree in Industrial Design',
    period: '2023 — Present',
    location: 'Querétaro, Mexico',
    description:
      'Product development, materials, ergonomics, design methodologies, prototyping and visual communication.',
  },
  {
    institution: 'Universidad Jaume I',
    degree: 'Industrial Design Engineering & Product Development',
    period: '2021 — 2023',
    location: 'Valencia, Spain',
    description:
      'Two years of Industrial Design Engineering before returning to Mexico to continue in Industrial Design.',
  },
];

export const experience: ExperienceItem[] = [
  {
    role: 'Co-Founder & Industrial Designer',
    company: 'Vigía',
    period: 'Dec 2025 — Present',
    location: 'Querétaro, Mexico',
    description:
      'Developing a Mexican watch microbrand from concept to physical product — product design, branding, customization, photography, marketing, e-commerce and manufacturing. Leading creative direction and product development, including the Carajo watch and its visual identity.',
  },
  {
    role: 'FPV Drone Videographer',
    company: 'Independent production',
    period: '2023 — 2025',
    location: 'Querétaro, Mexico',
    description:
      'Produced FPV drone video content after returning to Querétaro from Spain, combining piloting, camera work, composition and visual storytelling — alongside photography, video production and editing.',
  },
  {
    role: 'Rocket League Freestyler & Coach',
    company: 'Independent / Pulse Clan',
    period: '2020 — Present',
    location: 'Remote',
    description:
      'Mechanics coach and content creator with 60K+ subscribers. Built educational content and training systems that simplify complex mechanics and help players build consistent control.',
  },
  {
    role: 'Independent Design Freelancer',
    company: 'International collaborations',
    period: '2019 — Present',
    location: 'Remote',
    description:
      'Product development, concept development, prototyping, branding, graphic design and content editing — including physical products, furniture, material experimentation and content for personal brands.',
  },
];

/* ── Projects ──────────────────────────────────────────────── */
/*  Image filenames follow: project-<number>-<slot>.<ext>
    Slots: card · hero · concept · sketch · process · final        */

export const projects: Project[] = [
  {
    id: 'pet-travel-pod',
    number: '01',
    title: 'Automotive Pet Travel Pod',
    shortTitle: 'Pet Travel Pod',
    subtitle: 'Automotive accessory · Pet mobility',
    tagline:
      'A travel capsule that keeps pets secure and calm on the road — and feels at home in the living room.',
    sections: {
      concept: {
        title: 'Security and calm, in motion',
        body: 'A human–pet mobility capsule engineered for vehicular security, acoustic tranquility and seamless interior integration.',
        highlights: ['vehicular security', 'acoustic tranquility', 'seamless interior integration'],
      },
      ideation: {
        title: 'Animal curves meet car interiors',
        body: 'Form explorations bridging the organic curves of animal comfort with the geometric architecture of automotive interiors.',
        highlights: ['organic curves of animal comfort', 'automotive interiors'],
      },
      process: {
        title: 'Prototyped at full scale',
        body: 'Iterative prototyping through full-scale ergonomic bucks, CNC tooling fixtures and acoustic dampening studies.',
        highlights: ['Iterative prototyping', 'acoustic dampening'],
        materials: {
          title: 'Materials & enclosure',
          body: 'Dual-density expanded polypropylene core encased in impact-resistant anodized aluminium rails.',
          callouts: [
            { label: 'Shock absorption', text: 'Impact-absorbing honeycomb perimeter cell' },
            { label: 'Ventilation', text: 'Micro-perforated circulation baffles' },
          ],
        },
      },
      final: {
        title: 'From car seat to home sanctuary',
        body: 'A secure vehicular pet nest that doubles as an elegant home sanctuary, anchored by magnetic Isofix vehicle latches.',
        highlights: ['vehicular pet nest', 'home sanctuary'],
      },
    },
    specs: [
      { label: 'Weight', value: '4.8 kg' },
      { label: 'Primary shell', value: 'Recycled polycarbonate & anodized 6061 aluminium' },
      { label: 'Safety', value: 'ISO 27955 cargo restraint' },
      { label: 'Dimensions', value: '650 × 480 × 520 mm' },
    ],
    images: {
      card: { src: 'project-01-card.jpg', alt: 'Pet travel pod on a light background' },
      hero: { src: 'project-01-hero.jpg', alt: 'Automotive pet travel pod, three-quarter view' },
      concept: { src: 'project-01-concept.jpg', alt: 'Pet travel pod installed on a car seat' },
      sketch: {
        src: 'project-01-sketch.jpg',
        alt: 'Ideation sketches of the pet travel pod',
        caption: 'Early form sketches',
      },
      process: {
        src: 'project-01-process.jpg',
        alt: 'Exploded materials diagram of the pet travel pod',
        caption: 'Materials & enclosure study',
        annotations: [
          { x: 24, y: 68, label: 'Shock absorption', note: 'Honeycomb perimeter', dx: 14, dy: 14 },
          { x: 70, y: 30, label: 'Ventilation', note: 'Perforated baffles', dx: -14, dy: -14 },
        ],
      },
      final: { src: 'project-01-final.jpg', alt: 'Finished pet travel pod in a home interior' },
    },
  },
  {
    id: 'bentwood-lounger',
    number: '02',
    title: 'Bentwood Monocoque Lounger',
    shortTitle: 'Bentwood Lounger',
    subtitle: 'Furniture · Bent lamination',
    tagline: 'A continuous-lamination bentwood lounger that holds its shape through ergonomic counter-tension.',
    sections: {
      concept: {
        title: 'Structure without fasteners',
        body: 'Investigating how continuous tension curves in cold-pressed birch veneer can eliminate traditional mechanical fasteners.',
        highlights: ['continuous tension curves', 'cold-pressed birch veneer'],
      },
      ideation: {
        title: 'Finding the balance point',
        body: 'Exploring cantilever balance points through 1:5 scale card models and structural load-bearing simulations.',
        highlights: ['cantilever balance points', 'load-bearing simulations'],
      },
      process: {
        title: 'Pressed, layer by layer',
        body: 'Hydraulic male–female mould pressing with alternating grain orientation for structural elasticity.',
        highlights: ['Hydraulic', 'alternating grain orientation'],
        materials: {
          title: 'Layer composition',
          body: 'Twenty-four plies of European birch veneer bound with a zero-VOC bio-resin.',
          callouts: [
            { label: 'Flex zone', text: 'Progressive thinning along the lumbar arc' },
            { label: 'Foot profile', text: 'Felt-lined ground-contact glides' },
          ],
        },
      },
      final: {
        title: 'Light, yet resilient',
        body: 'A visually light yet structurally resilient lounge chair that gently flexes with the occupant’s weight shifts.',
        highlights: ['structurally resilient', 'weight shifts'],
      },
    },
    specs: [
      { label: 'Finish', value: 'Matte natural soap wax' },
      { label: 'Yield load', value: 'Tested to 180 kg cyclic load' },
      { label: 'Material', value: 'FSC-certified Baltic birch' },
      { label: 'Dimensions', value: '880 × 720 × 760 mm' },
    ],
    images: {
      card: { src: 'project-02-card.jpg', alt: 'Bentwood lounger in side profile' },
      hero: { src: 'project-02-hero.jpg', alt: 'Bentwood monocoque lounger, full view' },
      concept: { src: 'project-02-concept.jpg', alt: 'Close-up of the laminated birch curve' },
      sketch: {
        src: 'project-02-sketch.jpg',
        alt: '1:5 scale card models of the lounger',
        caption: '1:5 card models',
      },
      process: {
        src: 'project-02-process.jpg',
        alt: 'Laminated birch layers in the press mould',
        caption: 'Mould pressing',
        annotations: [
          { x: 42, y: 40, label: 'Flex zone', note: 'Lumbar arc', dx: 16, dy: -16 },
          { x: 18, y: 82, label: 'Foot profile', note: 'Felt glides', dx: 14, dy: -8 },
        ],
      },
      final: { src: 'project-02-final.jpg', alt: 'Finished bentwood lounger in a living space' },
    },
  },
  {
    id: 'froggy-art-toy',
    number: '03',
    title: 'Froggy Art Toy & Smart Box',
    shortTitle: 'Froggy Art Toy',
    subtitle: 'Collectible · Packaging · NFC',
    tagline: 'A collectible soft-vinyl figure paired with packaging that tells its story with a single tap.',
    sections: {
      concept: {
        title: 'Toy culture meets provenance',
        body: 'Bridging physical toy culture with digital provenance through tactile rotational-cast vinyl and embedded NFC tags.',
        highlights: ['physical toy culture', 'digital provenance'],
      },
      ideation: {
        title: 'A playful silhouette',
        body: 'Character silhouette studies balancing playful stylized curves with industrial parting lines and undercut reduction.',
        highlights: ['Character silhouette', 'undercut reduction'],
      },
      process: {
        title: 'Sculpted, then slush-moulded',
        body: 'Digital wax sculpting followed by electroformed copper slush moulds for flawless surface fidelity.',
        highlights: ['Digital wax sculpting', 'electroformed copper slush moulds'],
        materials: {
          title: 'Slush moulding',
          body: 'Rotational temperature control ensures an even 2.8 mm wall thickness without air-bubble voids.',
          callouts: [
            { label: 'Soft vinyl', text: 'Phthalate-free Japanese sofubi compound' },
            { label: 'NFC capsule', text: 'High-frequency chip hermetically sealed in the base' },
          ],
        },
      },
      final: {
        title: 'Tap to tell the story',
        body: 'A limited-edition designer toy in a rigid display box that launches companion digital content on tap.',
        highlights: ['limited-edition designer toy', 'companion digital content'],
      },
    },
    specs: [
      { label: 'Edition', value: '250 units worldwide' },
      { label: 'Height', value: '185 mm' },
      { label: 'Finish', value: 'Airbrushed matte acrylic, gloss eyes' },
      { label: 'Chipset', value: 'NTAG213, encrypted' },
    ],
    images: {
      card: { src: 'project-03-card.jpg', alt: 'Froggy vinyl art toy' },
      hero: { src: 'project-03-hero.jpg', alt: 'Froggy art toy beside its smart box' },
      concept: { src: 'project-03-concept.jpg', alt: 'Froggy character close-up' },
      sketch: {
        src: 'project-03-sketch.jpg',
        alt: 'Character silhouette sketches',
        caption: 'Silhouette studies',
      },
      process: {
        src: 'project-03-process.jpg',
        alt: 'Slush-moulded vinyl parts',
        caption: 'Slush moulding',
        annotations: [
          { x: 50, y: 85, label: 'NFC capsule', note: 'Sealed in base', dx: -18, dy: -6 },
          { x: 62, y: 35, label: 'Soft vinyl', note: '2.8 mm wall', dx: 14, dy: -14 },
        ],
      },
      final: { src: 'project-03-final.jpg', alt: 'Froggy toy displayed in its smart box' },
    },
  },
  {
    id: 'monolith-console',
    number: '04',
    title: 'Monolith Haptic Audio Console',
    shortTitle: 'Monolith Console',
    subtitle: 'Audio hardware · Haptic interface',
    tagline: 'A tactile USB-C audio mixer of machined aluminium, walnut and weighted rotary controls.',
    sections: {
      concept: {
        title: 'Physical delight, restored',
        body: 'Restoring physical delight to digital music production through weighted brass flywheels and magnetic detents.',
        highlights: ['physical delight', 'weighted brass flywheels'],
      },
      ideation: {
        title: 'Designing for the fingertips',
        body: 'Fingertip clearance and detent resistance-curve studies for precise, blind tactile adjustment.',
        highlights: ['detent resistance-curve', 'blind tactile adjustment'],
      },
      process: {
        title: 'Machined and oiled',
        body: 'Machined 6061-T6 aluminium knobs paired with optical encoders, amber level meters and oil-rubbed walnut.',
        highlights: ['6061-T6 aluminium', 'optical encoders'],
        materials: {
          title: 'Haptic encoders',
          body: 'Heavy flywheel damping gives silky resistance on every EQ shaft.',
          callouts: [
            { label: 'Anodized aluminium', text: 'Bead-blasted satin with laser-etched index marks' },
            { label: 'Solid walnut', text: 'Hand-rubbed tung oil with dovetail joinery' },
          ],
        },
      },
      final: {
        title: 'Built to age well',
        body: 'A centrepiece audio tool engineered to age with a natural patina — vintage warmth with modern USB-C fidelity.',
        highlights: ['natural patina', 'vintage warmth'],
      },
    },
    specs: [
      { label: 'Materials', value: 'CNC 6061 aluminium & solid walnut' },
      { label: 'Connectivity', value: 'Class-compliant USB-C & balanced XLR' },
      { label: 'Faders', value: '100 mm motorized studio faders' },
      { label: 'Dimensions', value: '420 × 260 × 65 mm' },
    ],
    images: {
      card: { src: 'project-04-card.jpg', alt: 'Monolith audio console from above' },
      hero: { src: 'project-04-hero.jpg', alt: 'Monolith haptic audio console on a desk' },
      concept: { src: 'project-04-concept.jpg', alt: 'Close-up of a weighted rotary control' },
      sketch: {
        src: 'project-04-sketch.jpg',
        alt: 'Layout sketches of the console controls',
        caption: 'Control layout studies',
      },
      process: {
        src: 'project-04-process.jpg',
        alt: 'Machined aluminium knobs and walnut panel',
        caption: 'Materials',
        annotations: [
          { x: 34, y: 38, label: 'Anodized aluminium', note: 'Bead-blasted satin', dx: 14, dy: -16 },
          { x: 72, y: 74, label: 'Solid walnut', note: 'Tung oil', dx: -16, dy: 10 },
        ],
      },
      final: { src: 'project-04-final.jpg', alt: 'Finished Monolith console in a studio' },
    },
  },
];

/* ── Navigation (derived — do not edit by hand) ────────────── */

export const SECTION_IDS = {
  about: 'about',
  cv: 'cv',
  experience: 'experience',
  projects: 'projects',
  contact: 'contact',
} as const;

export const PROJECT_SUBSECTIONS = [
  { key: 'concept', label: 'Concept & Ideation' },
  { key: 'process', label: 'Design process' },
  { key: 'final', label: 'Final product' },
] as const;

export type ProjectSubsectionKey = (typeof PROJECT_SUBSECTIONS)[number]['key'];

export const subsectionId = (projectId: string, key: ProjectSubsectionKey) => `${projectId}-${key}`;

export const navSections: NavItem[] = [
  { id: SECTION_IDS.about, label: 'About' },
  { id: SECTION_IDS.cv, label: 'CV' },
  { id: SECTION_IDS.experience, label: 'Experience' },
  { id: SECTION_IDS.projects, label: 'Projects' },
  ...projects.map((project) => ({
    id: project.id,
    label: `${project.number}  ${project.shortTitle}`,
    children: PROJECT_SUBSECTIONS.map((sub) => ({
      id: subsectionId(project.id, sub.key),
      label: sub.label,
    })),
  })),
  { id: SECTION_IDS.contact, label: 'Contact' },
];

/** Every observable id, in document order (parents before their children). */
export const navIds: string[] = navSections.flatMap((item) => [
  item.id,
  ...(item.children?.map((child) => child.id) ?? []),
]);

/** Top-level nav id that owns `id` (itself, or the parent of a sub-section). */
export function navParentId(id: string): string | undefined {
  return navSections.find(
    (item) => item.id === id || item.children?.some((child) => child.id === id),
  )?.id;
}
