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
  projects: {
    label: 'selected work',
    title: 'Projects',
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
    id: 'furniture-family',
    number: '01',
    title: 'Furniture Family',
    shortTitle: 'Furniture Family',
    subtitle: 'Furniture Design · Product Development',
    tagline: 'A furniture collection combining traditional materials with contemporary geometries.',
    sections: {
      concept: {
        title: 'Timeless everyday pieces',
        body: 'A furniture collection that combines traditional materials with contemporary geometries. The goal is to create timeless, everyday pieces with strong proportions, quality materials, and a sense of permanence.',
        highlights: ['traditional materials with contemporary geometries', 'a sense of permanence'],
      },
      ideation: {
        title: 'Translating language into furniture',
        body: 'Dark wood, leather, concrete and metal meet clean silhouettes, chamfered edges and subtle curves — timeless, everyday pieces that feel familiar without looking dated.',
        highlights: ['clean silhouettes, chamfered edges and subtle curves', 'familiar without looking dated'],
      },
      process: {
        title: 'Proportions and construction',
        body: 'Sketches, 3D models and manufacturing planning; CNC-cut MDF templates, hand finishing and precise joinery. Each piece explores the relationship between proportions, materials, and construction, while keeping the collection visually consistent.',
        highlights: ['CNC-cut MDF templates, hand finishing and precise joinery'],
        materials: {
          title: 'Materials & Manufacturing',
          body: 'A consistent palette of solid wood, natural leather, concrete, and metal.',
          callouts: [
            {
              label: 'Concrete parts',
              text: 'Cast concrete panels add weight and contrast to the wood and leather.',
            },
            {
              label: 'Template routing',
              text: 'MDF templates guide the router so every piece is cut to the same profile, then finished by hand.',
            },
          ],
        },
      },
      final: {
        title: 'Furniture Family',
        body: 'A table, lounge chair and lamp for contemporary homes, in one consistent material palette.',
        highlights: ['contemporary homes'],
      },
    },
    specs: [
      { label: 'Materials', value: 'Wood, leather, concrete' },
      { label: 'Pieces', value: 'Table, lounge chair, lamp' },
      { label: 'Fabrication', value: 'Template routing & hand finishing' },
      { label: 'Assembly', value: 'Mechanical joinery' },
    ],
    images: {
      card: { src: 'project-01-card.jpg', alt: 'Furniture Family lounge chair and lamp' },
      hero: { src: 'project-01-hero.jpg', alt: 'Furniture Family table, lounge chair and lamp in a concrete room' },
      concept: { src: 'project-01-concept.jpg', alt: 'Wireframe 3D model of the lounge chair' },
      sketch: {
        src: 'project-01-sketch.jpg',
        alt: 'Cast concrete panels for the collection',
        caption: 'Concrete panels',
      },
      process: {
        src: 'project-01-process.jpg',
        alt: 'Routing a wooden part on a router table',
        caption: 'Template routing',
      },
      final: { src: 'project-01-final.jpg', alt: 'Finished Furniture Family lounge chair, side table and lamp' },
    },
  },
  {
    id: 'vigia-carajo',
    number: '02',
    title: 'Vigía — Watch Brand',
    shortTitle: 'Vigía',
    subtitle: 'Product Design · Brand Identity',
    tagline: 'A Mexican watch brand focused on timeless design, honest materials and quality at a fair price.',
    sections: {
      concept: {
        title: 'Timeless design & honest materials',
        body: 'Vigía is a Mexican watch brand focused on timeless design, honest materials, and quality at a fair price. The goal is to create products that combine functionality and character without relying on trends or unnecessary details.',
        highlights: ['timeless design, honest materials, and quality at a fair price'],
      },
      ideation: {
        title: 'Simple, distinctive identity',
        body: 'Brand and watch were developed together — name, logo and dark palette connect traditional watchmaking with a contemporary approach. Carajo, the first model, is built for everyday wear and longevity.',
        highlights: ['developed together', 'everyday wear and longevity'],
      },
      process: {
        title: 'Product & brand developed together',
        body: 'Logo, visual identity, watch design, leather box design, proportions and finishes were designed in parallel; laser engraving adds personalization. Each decision was made to keep the product and the brand consistent.',
        highlights: ['designed in parallel'],
        materials: {
          title: 'Materials & Details',
          body: 'The stainless-steel case, clean silhouette, and restrained details give the watch its character.',
          callouts: [
            {
              label: 'Leather box',
              text: 'A brown leather box with a brass stud carries the logo and completes the unboxing.',
            },
            {
              label: 'Personalization',
              text: 'Laser engraving allows each watch to be customized while maintaining the original design.',
            },
          ],
        },
      },
      final: {
        title: 'Carajo',
        body: 'Vigía’s first watch: an everyday automatic built for quality and longevity.',
        highlights: ['quality and longevity'],
      },
    },
    specs: [
      { label: 'Case', value: '40 mm · 316L steel' },
      { label: 'Crystal', value: 'Sapphire' },
      { label: 'Movement', value: 'Japanese automatic' },
      { label: 'Water resistance', value: '5 ATM' },
    ],
    images: {
      card: { src: 'project-02-card.jpg', alt: 'Vigía watch worn with a coffee in hand' },
      hero: { src: 'project-02-hero.jpg', alt: 'Vigía Carajo watch on the wrist' },
      concept: { src: 'project-02-concept.jpg', alt: 'Vigía logo' },
      sketch: {
        src: 'project-02-sketch.jpg',
        alt: 'Vigía leather watch box',
        caption: 'Leather box',
      },
      process: {
        src: 'project-02-process.jpg',
        alt: 'Assembling the watch hands with gloves and tweezers',
        caption: 'Assembly',
      },
      final: { src: 'project-02-final.jpg', alt: 'Final Carajo automatic watch on the wrist' },
    },
  },
  {
    id: 'room-lamp',
    number: '03',
    title: 'Room Lamp',
    shortTitle: 'Room Lamp',
    subtitle: 'Lighting · Ceramic slip casting',
    tagline: 'A small, rounded ceramic lamp for children’s rooms — organic form, soft geometry.',
    sections: {
      concept: {
        title: 'Organic form & soft geometry',
        body: 'A minimalistic rounded small lamp made for children’s rooms. The design draws inspiration from organic shapes, soft geometry, rounded profiles, and visual balance. Team: Ana Gabriela Aguilar Maya, Pablo Cobián Borobia, Maria Jose Burelo Diaz.',
        highlights: ['organic shapes, soft geometry'],
      },
      ideation: {
        title: 'Spherical lamp silhouettes',
        body: 'Spherical silhouettes explored for proportions that feel playful, warm and approachable, finished with glazed stripes and a soft spherical glow.',
        highlights: ['playful, warm and approachable'],
      },
      process: {
        title: '3D modeling and slip casting',
        body: '3D-printed mould, plaster casting and ceramic slip casting (barbotina); glazed and kiln-fired. Gypsum plaster was mixed precisely to cast and demould the ceramic body.',
        highlights: ['3D-printed mould', 'ceramic slip casting'],
        materials: {
          title: 'Ceramics & lighting',
          body: 'Ceramic slip-cast body with a spherical light fixture, finished with glazes and fired in a kiln.',
          callouts: [
            { label: 'Body Construction', text: 'Slip-cast ceramic body with smooth, rounded contours' },
            {
              label: 'Lighting Integration',
              text: 'Spherical light source providing a warm, gentle glow for children’s rooms',
            },
          ],
        },
      },
      final: {
        title: 'Room Lamp',
        body: 'A rounded ceramic lamp with glazed stripes and a soft, warm glow for kids’ bedrooms.',
        highlights: ['soft, warm glow'],
      },
    },
    specs: [
      { label: 'Material', value: 'Slip-cast ceramic' },
      { label: 'Type', value: 'Table lamp' },
      { label: 'Finish', value: 'Glazed, custom colours' },
      { label: 'For', value: 'Children’s rooms' },
    ],
    images: {
      card: { src: 'project-03-card.jpg', alt: 'Two striped ceramic Room Lamps' },
      hero: { src: 'project-03-hero.jpg', alt: 'Room Lamps in blue and black stripes' },
      concept: { src: 'project-03-concept.jpg', alt: 'Pair of glazed Room Lamps' },
      sketch: {
        src: 'project-03-sketch.jpg',
        alt: 'Plaster mould for slip casting',
        caption: 'Plaster mould',
      },
      process: {
        src: 'project-03-process.jpg',
        alt: 'Unglazed slip-cast lamp bodies on the workbench',
        caption: 'Slip-cast bodies',
        annotations: [
          { x: 50, y: 85, label: 'Body Construction', note: 'Slip-cast ceramic', dx: -18, dy: -6 },
          { x: 62, y: 35, label: 'Lighting Integration', note: 'Spherical light source', dx: -14, dy: -14 },
        ],
      },
      final: { src: 'project-03-final.jpg', alt: 'Room Lamps glowing in a dark room' },
    },
  },
  {
    id: 'library-chair',
    number: '04',
    title: 'Library Chair',
    shortTitle: 'Library Chair',
    subtitle: 'Furniture Design · Room Ergonomics',
    tagline: 'A reading bench for my nephew — seat, bookshelf and play space in one piece.',
    sections: {
      concept: {
        title: 'Seat, shelf and play space',
        body: 'A reading bench designed for my nephew that brings a seat, a bookshelf and a play space together in one piece of furniture.',
        highlights: ['a seat, a bookshelf and a play space'],
      },
      ideation: {
        title: 'Made to a child’s scale',
        body: 'Stepped side towers frame a cushioned seat, while open cubbies keep books within a child’s reach. Softly curved sides and a warm tinted finish make it feel friendly and at home in the room.',
        highlights: ['within a child’s reach', 'friendly and at home in the room'],
      },
      process: {
        title: 'From 3D model to pine build',
        body: '3D model and cut planning; pine panels cut, glued and joined, then sanded and sealed with a tinted varnish.',
        highlights: ['pine panels cut, glued and joined'],
        materials: {
          title: 'Materials & Finish',
          body: 'Solid pine panels sealed with a warm tinted varnish, with a cushioned seat.',
          callouts: [
            { label: 'Stepped towers', text: 'Side towers frame the seat and double as shelves.' },
            { label: 'Open cubbies', text: 'Books stay within a child’s reach.' },
          ],
        },
      },
      final: {
        title: 'Library Chair',
        body: 'A seat, bookshelf and play space in one, made for my nephew’s room.',
        highlights: ['made for my nephew’s room'],
      },
    },
    specs: [
      { label: 'Material', value: 'Solid pine' },
      { label: 'Finish', value: 'Tinted varnish' },
      { label: 'Function', value: 'Seat & book storage' },
      { label: 'Made for', value: 'My nephew’s room' },
    ],
    images: {
      card: { src: 'project-04-card.jpg', alt: 'Library Chair in tinted pine with a white cushion' },
      hero: { src: 'project-04-hero.jpg', alt: 'Library Chair reading bench' },
      concept: { src: 'project-04-concept.jpg', alt: 'Library Chair with stepped towers and open cubbies' },
      sketch: {
        src: 'project-04-sketch.jpg',
        alt: '3D model of the Library Chair',
        caption: '3D model',
      },
      process: {
        src: 'project-04-process.jpg',
        alt: 'Pine panels clamped during glue-up',
        caption: 'Glue-up',
      },
      final: { src: 'project-04-final.jpg', alt: 'Library Chair in use in the room' },
    },
  },
];

/* ── Navigation (derived — do not edit by hand) ────────────── */

export const SECTION_IDS = {
  about: 'about',
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
