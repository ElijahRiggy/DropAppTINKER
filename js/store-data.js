/*
  Tinkerbench store data.
  Everything a non-coder needs to change lives in this file:
  store settings, categories and the product list.
  All products, prices and delivery times below are PLACEHOLDERS.
*/

const STORE = {
  name: "Tinkerbench",
  currency: "CAD",
  locale: "en-CA",
  contactEmail: "tinkerbench.co@gmail.com",
  flatShipping: 6.95,       // placeholder
  freeShippingOver: 75,     // placeholder
  // true shows the "preview store" banner and keeps checkout switched off.
  previewMode: true,
  // When you have a real checkout (Stripe Payment Link, Shopify, etc.),
  // paste its URL here and set previewMode to false.
  checkoutUrl: ""
};

const CATEGORIES = [
  { id: "all", label: "Everything" },
  { id: "kits", label: "Build kits" },
  { id: "puzzles", label: "Puzzles" },
  { id: "tabletop", label: "Tabletop games" },
  { id: "desk", label: "Desk toys" }
];

/*
  art:   which placeholder drawing to use (see drawArt in app.js).
         Replace with a real photo by adding  image: "images/your-file.jpg"
  tint:  background colour of the product tile
  color: main colour of the toy drawing (also tints the soft glow behind it)
*/
const PRODUCTS = [
  {
    id: "gearworks-orrery", name: "Gearworks Orrery Kit", category: "kits", price: 64.0,
    blurb: "A hand-cranked wooden solar system, 214 laser-cut parts.",
    details: "Placeholder description. Snap-fit plywood gears, no glue needed. Around six hours to build. Ages 14 and up.",
    art: "gear", tint: "#EBE8F8", color: "#6D3FD6"
  },
  {
    id: "pocket-rover", name: "Pocket Rover", category: "kits", price: 38.5,
    blurb: "A solar-powered six-wheeler you build in an afternoon.",
    details: "Placeholder description. Includes motor, solar cell and screwdriver. Runs in direct sunlight. Ages 10 and up.",
    art: "robot", tint: "#EBE8F8", color: "#1FB8D3"
  },
  {
    id: "skyline-stacker", name: "Skyline Stacker", category: "kits", price: 29.0,
    blurb: "Magnetic beams and joints for building towers that lean.",
    details: "Placeholder description. 72 pieces with a storage tin. Ages 8 and up.",
    art: "blocks", tint: "#EBE8F8", color: "#8B63EA"
  },
  {
    id: "bottle-rocket-lab", name: "Bottle Rocket Lab", category: "kits", price: 34.0,
    blurb: "A launch pad, fins and nose cones for any soda bottle.",
    details: "Placeholder description. Pump not included. Outdoor use only. Ages 12 and up.",
    art: "rocket", tint: "#EBE8F8", color: "#1FB8D3", tag: "New"
  },
  {
    id: "burr-cube-no7", name: "Burr Cube No. 7", category: "puzzles", price: 24.0,
    blurb: "Six interlocking walnut pieces, one way back together.",
    details: "Placeholder description. Difficulty: 4 of 5. Solution card in the box, sealed.",
    art: "cube", tint: "#EBE8F8", color: "#8B63EA"
  },
  {
    id: "lockpath-maze", name: "Lockpath Maze Box", category: "puzzles", price: 42.0,
    blurb: "A hidden-maze box that opens only when you map it by feel.",
    details: "Placeholder description. Fits a gift card or a folded note. Difficulty: 3 of 5.",
    art: "maze", tint: "#EBE8F8", color: "#6D3FD6"
  },
  {
    id: "tessel-tiles", name: "Tessel Tiles", category: "puzzles", price: 19.5,
    blurb: "Forty challenges on one tray of nine sliding tiles.",
    details: "Placeholder description. Travel size with a magnetic lid. Ages 8 and up.",
    art: "tiles", tint: "#EBE8F8", color: "#6D3FD6"
  },
  {
    id: "long-odds", name: "Long Odds", category: "tabletop", price: 27.0,
    blurb: "A bluffing dice game for 2 to 6 that takes ten minutes to learn.",
    details: "Placeholder description. 30 dice, six cups, rules in English and French. 20 minutes a round.",
    art: "dice", tint: "#EBE8F8", color: "#6D3FD6"
  },
  {
    id: "night-market", name: "Night Market", category: "tabletop", price: 32.0,
    blurb: "Trade, haggle and outbid your friends in a 120-card deck.",
    details: "Placeholder description. 3 to 5 players, 45 minutes. Ages 12 and up.",
    art: "cards", tint: "#EBE8F8", color: "#1FB8D3", tag: "New"
  },
  {
    id: "topple-tower", name: "Topple Tower Deluxe", category: "tabletop", price: 36.0,
    blurb: "The stacking classic, with dare blocks and a carry case.",
    details: "Placeholder description. 54 hardwood blocks, 12 of them engraved. 2 or more players.",
    art: "tower", tint: "#EBE8F8", color: "#8B63EA"
  },
  {
    id: "orbit-top", name: "Orbit Spinning Top", category: "desk", price: 22.0,
    blurb: "A machined steel top that spins for over five minutes.",
    details: "Placeholder description. Comes with a concave glass base. 38 mm across.",
    art: "top", tint: "#EBE8F8", color: "#1FB8D3"
  },
  {
    id: "marble-switchback", name: "Marble Switchback", category: "desk", price: 48.0,
    blurb: "A desktop marble run with a lift you wind by hand.",
    details: "Placeholder description. Beech and brass, 12 steel marbles. 24 cm tall.",
    art: "marble", tint: "#EBE8F8", color: "#6D3FD6"
  }
];
