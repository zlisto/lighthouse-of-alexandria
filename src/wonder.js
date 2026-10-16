// The Lighthouse of Alexandria: everything about this world in one place. World.jsx, layout.js,
// the guide and the chat all read from here; Scene.jsx draws the island and the lighthouse.
const HUB = 'https://zlisto.github.io/hub_world/'

// the island of Pharos and the causeway (the Heptastadion) that joined it to the city
export const ISLAND = { x0: -45, x1: 45, z0: -115, z1: -10, h: 0.5 }
export const CAUSEWAY = { x0: -6, x1: 6, z0: -10, z1: 70, h: 0.5 }
export const TOWER = { x: 0, z: -62 }

export default {
  id: 'lighthouse_of_alexandria',
  name: 'Lighthouse of Alexandria',
  place: 'Pharos, Alexandria, Egypt · c. 280 BCE',
  blurb: 'Walk the causeway to the island of Pharos at dusk, as the fire is lit atop the tallest lighthouse ever built. Pharobubu the lightkeeper will tell you its story.',

  guideName: 'Pharobubu',
  guideRole: 'keeper of the Pharos light',
  guideIcon: '🔥',
  greeting: (v) =>
    `Ahoy and welcome to Pharos${v ? `, ${v}` : ''}! I'm Pharobubu, keeper of the great light. Every night we haul fuel up to the top and light the fire, so ships can find Alexandria across the dark sea. Ask me anything.`,
  facts: [
    {
      q: 'Who built it, and when?',
      a: `It was begun under **Ptolemy I Soter**, Alexander the Great's general who became king of Egypt, and finished around **280 BCE** under his son **Ptolemy II**.

Its architect was **Sostratus of Cnidus**. The story goes that he carved his own name in the stone under the plaster dedication to the king, so that when the plaster wore away, his name would show.`,
    },
    {
      q: 'How tall was it?',
      a: `Probably **over 100 m**, with estimates ranging up to about 130 m, roughly a 30-story building. It was one of the tallest human-made structures in the world for centuries, and the tallest lighthouse ever built.

This one is scaled to about 80 m.`,
    },
    {
      q: 'What did it look like?',
      a: `It had **three tiers**:
- A tall **square** base, with rooms for the keepers and the fuel.
- An **eight-sided** middle.
- A **round** top holding the **fire**.
Above it all stood a statue, probably **Zeus the Savior** or Poseidon. Later writers told of a great **mirror**, perhaps polished bronze, that reflected the fire and sunlight far out to sea, though how far is surely exaggerated.`,
    },
    {
      q: 'Why did Alexandria need it?',
      a: `The Egyptian coast here is **flat and low**, with few landmarks, and the approach to the harbor hides dangerous reefs and sandbanks.

The tower was a landmark by day, and its fire a beacon by night, guiding ships into one of the busiest ports of the ancient world.`,
    },
    {
      q: 'Is that where the word "lighthouse" comes from?',
      a: `In many languages, yes. The island's name, **Pharos**, became the word for lighthouse:
- *phare* in French
- *faro* in Italian and Spanish
- *farol* in Portuguese
- *far* in Romanian
English took a different route, with "lighthouse."`,
    },
    {
      q: 'What happened to it?',
      a: `It stood for about **1,600 years**, damaged again and again by **earthquakes**, especially in 956, 1303 and 1323.

The traveler **Ibn Battuta** went inside it in 1326, but on a return visit in 1349 he found it too ruined to enter. In **1477**, Sultan **Qaitbay** built a fortress on the site, partly from its stones. The Citadel of Qaitbay still stands there.`,
    },
    {
      q: 'Have its remains been found?',
      a: `Yes, underwater. Since **1994**, divers led by French archaeologist **Jean-Yves Empereur** have mapped thousands of huge stone blocks, columns and statues on the harbor floor near the citadel.

Some of these, possibly from the lighthouse, have been lifted out and put on display.`,
    },
  ],

  outfit: {
    fur: '#b08a62',
    expression: 'happy',
    shirt: '#e3d6bd', // a sailor's tunic
    skirt: '#3f5f8a',
    skirtLength: 0.24,
    parts: [['pilos', { a: '#3f5f8a' }], ['lantern']],
  },

  env: {
    sky: '#f0ae7c',
    fog: '#f3c9a0',
    fogNear: 140,
    fogFar: 520,
    ground: '#d9c79c',
    hemiSky: '#ffd9b0',
    hemiGround: '#6a7a8a',
    hemi: 0.85,
    sun: [-80, 22, -120],
    sunColor: '#ffbf80',
    sunIntensity: 1.4,
  },
  speed: { walk: 12, run: 20 },
  bound: 140,
  spawn: { x: 0, z: 52, yaw: 0 },
  portal: { x: -3, z: 60, rot: Math.PI, href: HUB, spawn: 'by_lighthouse_of_alexandria' },
  guide: { x: 3, z: 46, rot: Math.atan2(-3, 6) },
  platforms: [{ ...ISLAND }, { ...CAUSEWAY }],
  boxes: [
    // the sea all around the island and the causeway
    { x0: -1000, x1: CAUSEWAY.x0, z0: ISLAND.z1, z1: 1000 },
    { x0: CAUSEWAY.x1, x1: 1000, z0: ISLAND.z1, z1: 1000 },
    { x0: -1000, x1: 1000, z0: CAUSEWAY.z1, z1: 1000 },
    { x0: -1000, x1: ISLAND.x0, z0: -1000, z1: ISLAND.z1 },
    { x0: ISLAND.x1, x1: 1000, z0: -1000, z1: ISLAND.z1 },
    { x0: -1000, x1: 1000, z0: -1000, z1: ISLAND.z0 },
    // the lighthouse's base and its walled court
    { x0: TOWER.x - 13, x1: TOWER.x + 13, z0: TOWER.z - 13, z1: TOWER.z + 13 },
  ],
  areas: [
    { x: TOWER.x, z: TOWER.z, r: 26, label: 'at the foot of the lighthouse' },
    { x: 0, z: -60, r: 50, label: 'on the island of Pharos' },
    { x: 0, z: 30, r: 40, label: 'on the causeway to Pharos' },
  ],
  elsewhere: 'by the harbor of Alexandria',
}
