// 16:9 Wide Videos (Previously in Editorial or Mixed) -> Now strictly for Editorial "ZigZag"
export interface VideoItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  isVertical?: boolean;
  isSquare?: boolean;
}

export const featuredWorkVideos: VideoItem[] = [
  {
    id: 'nike-air-jordan',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1771634791/Nike_Shoes_vjbnke.mp4',
    title: 'Nike Air Jordan',
    caption: 'Nike — Product Aesthetic Commercial'
  },
  {
    id: 'chanel-perfume',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770579190/Chanel_Perfume_Video_dztprl.mp4',
    title: 'Chanel Perfume',
    caption: 'Chanel — 3D Product Animation'
  },
  {
    id: 'ralph-lauren',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770595783/Ralph_Lauren_Short_Video_dfhwc2.mp4',
    title: 'Ralph Lauren',
    caption: 'Ralph Lauren — Cinematic Showcase'
  },
  {
    id: 'gucci-ad',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770807093/Gucci_Ad_Commercial_Video_xegnml.mp4',
    title: 'GUCCI',
    caption: 'Gucci — Commercial Edit'
  },
  {
    id: 'poedagar-watch',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770807093/Watch_Video_mcazsa.mp4',
    title: 'Poedagar Watch',
    caption: 'Luxury — Timepiece Showcase',
    isSquare: true
  }
];

export const editorialVideos: VideoItem[] = [
  // Moved from Featured Work (Square-ish / 4:5 type videos)
  {
    id: 'levis',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770596095/Levi_s_nlemhy.mp4',
    title: "Levi's",
    caption: "Levi's — Dynamic Fashion Edit",
    isSquare: true
  },
  {
    id: 'pran-sauce',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770354760/Pran_Sauce_Video_i0pe9n.mp4',
    title: 'Pran Sauce',
    caption: 'Pran — Fluid Dynamic Visualization',
  },
  {
    id: 'acuteck',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770354778/Acuteck-Blood-Glucose-Monitor-Lifetime-Guarantee.Mp4_chr1ne.mp4',
    title: 'Acuteck Monitor',
    caption: 'Acuteck — 3D Product Rendering',
  },
  {
    id: 'dabur-real-fruit-2',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770354773/Dabur_Real_Fruit_Power_2_wxtsfm.mp4',
    title: 'Real Fruit Power',
    caption: 'Dabur — Liquid Simulation & Composition',
  },
  // Main Embra moved to grid (below index 4)
  {
    id: 'booty-botique',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770354761/Demo_For_Booty_Botique_aawqja.mp4',
    title: 'Booty Botique',
    caption: 'Fitness — High Energy Promo',
  },
  {
    id: 'embra-tshirt-black',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770354772/Gk_Tshirt_Black_yfzoav.mp4',
    title: 'EMBRA',
    caption: 'EMBRA — Dark Mode Aesthetic',
  },
  {
    id: 'embra-tshirt-bisk',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770354759/Gk_T-Shirt_Bisk_yc9cfl.mp4',
    title: 'EMBRA Beige',
    caption: 'Studio — Light Setup Reveal',
  },
  // Existing Editorial Videos
  {
    id: 'craze-freak',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770354769/Craze_Freak_Warm_Hoodie_jzx110.mp4',
    title: 'Craze Freak',
    caption: 'Craze — Textile Physics & Motion',
    isVertical: true,
  },
  {
    id: 'property-lifts',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770354784/Property_Lifts_Video_10_upomrf.mp4',
    title: 'Property Lifts',
    caption: 'Architecture — Structural Visualization',
  },
  {
    id: 'raindrops-promo',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770354774/Raindrops_Jackets_Sweat_Shirts_Promo_mhsj1f.mp4',
    title: 'Raindrops Promo',
    caption: 'Fashion — Kinetic Typography',
    isVertical: true,
  },
  {
    id: 'safemet',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770354768/Safemet_Video_5_bszi0w.mp4',
    title: 'Safemet',
    caption: 'Industrial — Safety Systems',
  },
  {
    id: 'real-fruit-power',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770354773/Dabur_Bd_Real_Fruit_Power_Short_ej2532.mp4',
    title: 'Real Fruit Power',
    caption: 'Commercial — Short Form Edit',
  },
  {
    id: 'raindrops-2',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770354765/Raindrops_tfkyku.mp4',
    title: 'Raindrops',
    caption: 'Lookbook — Digital Catalog',
    isVertical: true,
  },
  {
    id: 'regal-furniture-2',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770354775/Regal_Furniture_Demo_Video_2_kepk5q.mp4',
    title: 'Regal Furniture',
    caption: 'Interior — Space Planning Demo',
  },
  {
    id: 'regal-furniture-1',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770354776/Regal_Furniture_Demo_1_Sound_Improved_bwmkdj.mp4',
    title: 'Regal Suite',
    caption: 'Interior — Texture detailing',
  },
];
