// Utility to resolve image paths referenced in JSON to webpack-bundled URLs
const importAll = (r) => r.keys().reduce((acc, key) => {
  const cleaned = key.replace('./', '');
  acc[cleaned] = r(key);
  return acc;
}, {});

// import all images under src/Assets
const images = importAll(require.context('../Assets', true, /\.(png|jpe?g|webp|svg)$/));

const resolveImage = (path) => {
  if (!path) return '';
  if (typeof path !== 'string') return path;
  // remote urls or absolute public paths should be returned as-is
  if (path.startsWith('http') || path.startsWith('/')) return path;

  // normalize paths like "src/Assets/Products/1/shopping.webp" or "Assets/..."
  const rel = path.replace(/^src[\/\\]Assets[\/\\]/, '').replace(/^Assets[\/\\]/, '');

  // try direct match
  if (images[rel]) return images[rel];

  // try decodeURI variant (for spaces / parentheses)
  const decoded = decodeURI(rel);
  if (images[decoded]) return images[decoded];

  // fallback: return original path so browser can attempt to load it
  return path;
};

export default resolveImage;
