// 16:9 Wide Videos (Previously in Editorial or Mixed) -> Now strictly for Editorial "ZigZag"
export interface VideoItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  isVertical?: boolean;
}

export const featuredWorkVideos: VideoItem[] = [
  // Moving Square Videos here for the 3D Carousel (Album Cover Look)
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
  // Moved from Editorial (Square-ish product renders)
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
  {
    id: 'booty-botique',
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770354761/Demo_For_Booty_Botique_aawqja.mp4',
    title: 'Booty Botique',
    caption: 'Fitness — High Energy Promo',
  },
];

export const editorialVideos: VideoItem[] = [
  // Wide Videos for the ZigZag Scroll
  {
    id: 'craze-freak', // Moved from Featured
    src: 'https://res.cloudinary.com/dxez9kmnn/video/upload/v1770354769/Craze_Freak_Warm_Hoodie_jzx110.mp4',
    title: 'Craze Freak',
    caption: 'Craze — Textile Physics & Motion',
    isVertical: true, // User requested vertical
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
    isVertical: true, // User requested vertical
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
    isVertical: true, // User requested vertical
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
