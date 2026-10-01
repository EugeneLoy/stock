const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, 'isometric-icons');
const CONFIG_PATH = path.join(__dirname, 'config.json');
const SKIP = ['vehicleTiles'];

const categoryNames = {
  buildingTiles:     'Будівлі та споруди',
  cityDetails:       'Деталі міського середовища',
  cityTiles:         'Міські квартали',
  landscapeTiles:    'Природні ландшафти',
  transportDetails:  'Деталі транспорту',
  transportTiles:    'Транспортні розв\'язки',
  vehicleTiles_flat: 'Транспортні засоби (плоский стиль)',
};

const dirs = fs.readdirSync(ICONS_DIR).filter(entry => {
  const fullPath = path.join(ICONS_DIR, entry);
  return fs.statSync(fullPath).isDirectory() && !SKIP.includes(entry);
});

const config = dirs.map(dir => {
  const categoryName = categoryNames[dir] || dir;
  const dirPath = path.join(ICONS_DIR, dir);
  const images = fs.readdirSync(dirPath)
    .filter(f => /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(f))
    .map(f => ({ url: `/isometric-icons/${dir}/${f}` }));
  console.log(`  ${dir} → "${categoryName}" (${images.length} images)`);
  return { categoryName, images };
});

fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
console.log(`\nDone. Wrote ${config.length} categories to config.json`);
