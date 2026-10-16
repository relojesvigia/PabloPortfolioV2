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
    id: 'vigia-carajo',
    number: '01',
    title: 'Vigía — Carajo Automatic Watch',
    shortTitle: 'Vigía',
    subtitle: 'Product Design · Brand Identity',
    tagline: 'A Mexican watch brand focused on timeless design, honest materials, and quality at a fair price.',
    sections: {
      concept: {
        title: 'Timeless design & honest materials',
        body: 'Vigía is a Mexican watch brand focused on timeless design, honest materials, and quality at a fair price. The goal is to create products that combine functionality and character without relying on trends or unnecessary details.',
        highlights: ['timeless design, honest materials, and quality at a fair price'],
      },
      ideation: {
        title: 'Simple, distinctive identity',
        body: 'The brand identity was developed around the idea of creating something simple but distinctive. The name, logo, dark color palette, and visual language connect traditional watchmaking with a more contemporary approach to design.',
        highlights: ['simple but distinctive'],
      },
      process: {
        title: 'Product & brand developed together',
        body: 'The project involved developing the brand and the watch together, from the logo and visual identity to the product’s proportions, materials, finishes, and personalization. Each decision was made to keep the product and the brand consistent.',
        highlights: ['developing the brand and the watch together'],
        materials: {
          title: 'Materials & Details',
          body: 'The stainless-steel case, clean silhouette, and restrained details give the watch its character.',
          callouts: [
            {
              label: 'Brand Identity',
              text: 'The logo and visual language establish a recognizable identity across the watch, packaging, and communication.',
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
      { label: 'Case', value: '40 mm, 316L steel' },
      { label: 'Crystal', value: 'Sapphire' },
      { label: 'Movement', value: 'Japanese automatic' },
      { label: 'Water resistance', value: '5 ATM' },
    ],
    images: {
      card: { src: 'project-01-card.jpg', alt: 'Vigía watch thumbnail' },
      hero: { src: 'project-01-hero.jpg', alt: 'Vigía Carajo banner image' },
      concept: { src: 'project-01-concept.jpg', alt: 'Concept visualization of the Vigía watch' },
      sketch: {
        src: 'project-01-sketch.jpg',
        alt: 'Brand identity and watch sketches',
        caption: 'Early form sketches',
      },
      process: {
        src: 'project-01-process.jpg',
        alt: 'Materials and laser engraving process',
        caption: 'Materials & enclosure study',
        annotations: [
          { x: 24, y: 68, label: 'Brand Identity', note: 'Logo & visual language', dx: 14, dy: 14 },
          { x: 70, y: 30, label: 'Personalization', note: 'Laser engraving', dx: -14, dy: -14 },
        ],
      },
      final: { src: 'project-01-final.jpg', alt: 'Final Carajo automatic watch photo' },
    },
  },
  {
    id: 'furniture-family',
    number: '02',
    title: 'Furniture Family',
    shortTitle: 'Furniture Family',
    subtitle: 'Furniture Design · Product Development',
    tagline:
      'A furniture collection combining traditional materials with contemporary geometries to create timeless, everyday pieces.',
    sections: {
      concept: {
        title: 'Timeless everyday pieces',
        body: 'A furniture collection that combines traditional materials with contemporary geometries. The goal is to create timeless, everyday pieces with strong proportions, quality materials, and a sense of permanence.',
        highlights: ['traditional materials with contemporary geometries', 'a sense of permanence'],
      },
      ideation: {
        title: 'Translating language into furniture',
        body: 'The collection explores how the design language behind Vigía can translate into furniture. Dark wood, leather, and metal are combined with clean silhouettes, chamfered edges, and subtle curves to create pieces that feel familiar without looking outdated.',
        highlights: ['design language behind Vigía', 'familiar without looking outdated'],
      },
      process: {
        title: 'Proportions and construction',
        body: 'The project developed through sketching, 3D modeling, and planning the manufacturing process. Each piece explores the relationship between proportions, materials, and construction, while keeping the collection visually consistent.',
        highlights: ['proportions, materials, and construction'],
        materials: {
          title: 'Materials & Manufacturing',
          body: 'A consistent palette of solid wood, natural leather, concrete, and metal.',
          callouts: [
            {
              label: 'Table Design',
              text: 'Chamfered edges and contrasting wood and concrete balance solid forms and lighter structural elements.',
            },
            {
              label: 'Lounge Chair & Lamp',
              text: 'Wood, leather, and concrete combine to extend the collection’s material language into seating and lighting.',
            },
          ],
        },
      },
      final: {
        title: 'Furniture Family',
        body: 'Furniture and lighting for contemporary homes, in one consistent material palette.',
        highlights: ['contemporary homes'],
      },
    },
    specs: [
      { label: 'Materials', value: 'Solid wood, leather, concrete' },
      { label: 'Fabrication', value: 'CNC templates & hand finishing' },
      { label: 'Assembly', value: 'Mechanical joinery' },
    ],
    images: {
      card: { src: 'project-02-card.jpg', alt: 'Furniture collection thumbnail' },
      hero: { src: 'project-02-hero.jpg', alt: 'Furniture Family banner image' },
      concept: { src: 'project-02-concept.jpg', alt: 'Concept visualization of the furniture collection' },
      sketch: {
        src: 'project-02-sketch.jpg',
        alt: 'Ideation sketches of table and chair',
        caption: '1:5 card models',
      },
      process: {
        src: 'project-02-process.jpg',
        alt: 'Material samples and manufacturing process',
        caption: 'Mould pressing',
        annotations: [
          { x: 42, y: 40, label: 'Table Design', note: 'Chamfered edges & wood', dx: 16, dy: -16 },
          {
            x: 18,
            y: 82,
            label: 'Materials & Manufacturing',
            note: 'Solid wood, leather & concrete',
            dx: 14,
            dy: -8,
          },
        ],
      },
      final: { src: 'project-02-final.jpg', alt: 'Finished Furniture Family photo in interior' },
    },
  },
  {
    id: 'room-lamp',
    number: '03',
    title: 'Room Lamp',
    shortTitle: 'Room Lamp',
    subtitle: 'Lighting · Ceramic slip casting',
    tagline:
      'A minimalistic rounded small lamp designed for children’s rooms, combining organic form with soft geometry.',
    sections: {
      concept: {
        title: 'Organic form & soft geometry',
        body: 'A minimalistic rounded small lamp made for kids rooms generally. The design draws inspiration from organic shapes, soft geometry, rounded profiles, and visual balance.',
        highlights: ['organic shapes, soft geometry'],
      },
      ideation: {
        title: 'Spherical lamp silhouettes',
        body: 'Ideation focused on spherical lamp designs and circular forms, exploring proportions that feel playful, warm, and approachable for children’s spaces.',
        highlights: ['playful, warm, and approachable'],
      },
      process: {
        title: '3D modeling and slip casting',
        body: 'The process involved 3D modeling the form, 3D printing the mold, laser-cutting MDF boxes for structural containment, preparing ceramic slip casting (colada de barbotina), and precise gypsum plaster mixing to cast and demould the ceramic body.',
        highlights: ['3D printing the mold', 'ceramic slip casting'],
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
      { label: 'Team', value: 'Ana Gabriela Aguilar Maya, Pablo Cobián Borobia, Maria Jose Burelo Diaz' },
    ],
    images: {
      card: { src: 'project-03-card.jpg', alt: 'Room lamp thumbnail' },
      hero: { src: 'project-03-hero.jpg', alt: 'Room lamp banner image' },
      concept: { src: 'project-03-concept.jpg', alt: 'Concept sketching and inspiration' },
      sketch: {
        src: 'project-03-sketch.jpg',
        alt: 'Spherical lamp sketches',
        caption: 'Silhouette studies',
      },
      process: {
        src: 'project-03-process.jpg',
        alt: 'Plaster mold casting and ceramic slip process',
        caption: 'Slush moulding',
        annotations: [
          { x: 50, y: 85, label: 'Body Construction', note: 'Slip-cast ceramic', dx: -18, dy: -6 },
          { x: 62, y: 35, label: 'Lighting Integration', note: 'Spherical light source', dx: 14, dy: -14 },
        ],
      },
      final: { src: 'project-03-final.jpg', alt: 'Finished Room Lamp in a setting' },
    },
  },
  {
    id: 'project-04',
    number: '04',
    title: 'Lorem Ipsum Title',
    shortTitle: 'Lorem Ipsum',
    subtitle: 'Category · Subtitle',
    tagline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    sections: {
      concept: {
        title: 'Lorem Ipsum Concept',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolor sit amet magna aliqua.',
      },
      ideation: {
        title: 'Lorem Ipsum Ideation',
        body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      process: {
        title: 'Lorem Ipsum Design Process',
        body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        materials: {
          title: 'Lorem Materials',
          body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          callouts: [
            { label: 'Callout 1', text: 'Lorem ipsum dolor sit amet' },
            { label: 'Callout 2', text: 'Consectetur adipiscing elit' },
          ],
        },
      },
      final: {
        title: 'Lorem Ipsum Final Product',
        body: 'Sed ut perspiciatis unde omnis iste natus error.',
      },
    },
    specs: [
      { label: 'Specification 1', value: 'Value' },
      { label: 'Specification 2', value: 'Value' },
      { label: 'Specification 3', value: 'Value' },
    ],
    images: {
      card: { src: 'project-04-card.jpg', alt: 'Lorem ipsum thumbnail' },
      hero: { src: 'project-04-hero.jpg', alt: 'Lorem ipsum hero image' },
      concept: { src: 'project-04-concept.jpg', alt: 'Lorem ipsum concept image' },
      sketch: {
        src: 'project-04-sketch.jpg',
        alt: 'Lorem ipsum sketch image',
        caption: 'Control layout studies',
      },
      process: {
        src: 'project-04-process.jpg',
        alt: 'Lorem ipsum process image',
        caption: 'Materials',
        annotations: [
          { x: 34, y: 38, label: 'Label 1', note: 'Short note', dx: 14, dy: -16 },
          { x: 72, y: 74, label: 'Label 2', note: 'Short note', dx: -16, dy: 10 },
        ],
      },
      final: { src: 'project-04-final.jpg', alt: 'Lorem ipsum final image' },
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
