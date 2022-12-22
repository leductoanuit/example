// @flow

import _ from 'lodash';

//$FlowFixMe[cannot-resolve-module]
import colorLib from '@kurkle/color';

const names = [
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'grey',
  'blue-grey',
];

const levels = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  'a-100',
  'a-200',
  'a-400',
  'a-700',
];

const layouts = ['default', 'light', 'dark'];

const colorsData = [
  [
    //red
    ['ffebee', 'ffffff', 'ccb9bc'],
    ['ffcdd2', 'ffffff', 'cb9ca1'],
    ['ef9a9a', 'ffcccb', 'ba6b6c'],
    ['e57373', 'ffa4a2', 'af4448'],
    ['ef5350', 'ff867c', 'b61827'],
    ['f44336', 'ff7961', 'ba000d'],
    ['e53935', 'ff6f60', 'ab000d'],
    ['d32f2f', 'ff6659', '9a0007'],
    ['c62828', 'ff5f52', '8e0000'],
    ['b71c1c', 'f05545', '7f0000'],
    ['ff8a80', 'ffbcaf', 'c85a54'],
    ['ff5252', 'ff867f', 'c50e29'],
    ['ff1744', 'ff616f', 'c4001d'],
    ['d50000', 'ff5131', '9b0000'],
  ],
  [
    //pink
    ['fce4ec', 'fce4ec', 'c9b2ba'],
    ['f8bbd0', 'ffeeff', 'c48b9f'],
    ['f48fb1', 'ffc1e3', 'bf5f82'],
    ['f06292', 'ff94c2', 'ba2d65'],
    ['ec407a', 'ff77a9', 'b4004e'],
    ['e91e63', 'ff6090', 'b0003a'],
    ['d81b60', 'ff5c8d', 'a00037'],
    ['c2185b', 'fa5788', '8c0032'],
    ['ad1457', 'e35183', '78002e'],
    ['880e4f', 'bc477b', '560027'],
    ['ff80ab', 'ffb2dd', 'c94f7c'],
    ['ff4081', 'ff79b0', 'c60055'],
    ['f50057', 'ff5983', 'bb002f'],
    ['c51162', 'fd558f', '8e0038'],
  ],
  [
    //purple
    ['f3e5f5', 'ffffff', 'c0b3c2'],
    ['e1bee7', 'fff1ff', 'af8eb5'],
    ['ce93d8', 'ffc4ff', '9c64a6'],
    ['ba68c8', 'ee98fb', '883997'],
    ['ab47bc', 'df78ef', '790e8b'],
    ['9c27b0', 'd05ce3', '6a0080'],
    ['8e24aa', 'c158dc', '5c007a'],
    ['7b1fa2', 'af52d5', '4a0073'],
    ['6a1b9a', '9c4dcc', '38006b'],
    ['4a148c', '7c43bd', '12005e'],
    ['ea80fc', 'ffb2ff', 'b64fc8'],
    ['e040fb', 'ff79ff', 'aa00c7'],
    ['d500f9', 'ff5bff', '9e00c5'],
    ['aa00ff', 'e254ff', '7200ca'],
  ],
  [
    //deep-purple
    ['ede7f6', 'ffffff', 'bbb5c3'],
    ['d1c4e9', 'fff7ff', 'a094b7'],
    ['b39ddb', 'e6ceff', '836fa9'],
    ['9575cd', 'c7a4ff', '65499c'],
    ['7e57c2', 'b085f5', '4d2c91'],
    ['673ab7', '9a67ea', '320b86'],
    ['5e35b1', '9162e4', '280680'],
    ['512da8', '8559da', '140078'],
    ['4527a0', '7953d2', '000070'],
    ['311b92', '6746c3', '000063'],
    ['b388ff', 'e7b9ff', '805acb'],
    ['7c4dff', 'b47cff', '3f1dcb'],
    ['651fff', 'a255ff', '0100ca'],
    ['6200ea', '9d46ff', '0a00b6'],
  ],
  [
    // indigo
    ['e8eaf6', 'ffffff', 'b6b8c3'],
    ['c5cae9', 'f8fdff', '9499b7'],
    ['9fa8da', 'd1d9ff', '6f79a8'],
    ['7986cb', 'aab6fe', '47599b'],
    ['5c6bc0', '8e99f3', '26418f'],
    ['3f51b5', '757de8', '002984'],
    ['3949ab', '6f74dd', '00227b'],
    ['303f9f', '666ad1', '001970'],
    ['283593', '5f5fc4', '001064'],
    ['1a237e', '534bae', '000051'],
    ['8c9eff', 'c0cfff', '5870cb'],
    ['536dfe', '8f9bff', '0043ca'],
    ['3d5afe', '8187ff', '0031ca'],
    ['304ffe', '7a7cff', '0026ca'],
  ],
  [
    //blue
    ['e3f2fd', 'ffffff', 'b1bfca'],
    ['bbdefb', 'eeffff', '8aacc8'],
    ['90caf9', 'c3fdff', '5d99c6'],
    ['64b5f6', '9be7ff', '2286c3'],
    ['42a5f5', '80d6ff', '0077c2'],
    ['2196f3', '6ec6ff', '0069c0'],
    ['1e88e5', '6ab7ff', '005cb2'],
    ['1976d2', '63a4ff', '004ba0'],
    ['1565c0', '5e92f3', '003c8f'],
    ['0d47a1', '5472d3', '002171'],
    ['82b1ff', 'b6e3ff', '4d82cb'],
    ['448aff', '83b9ff', '005ecb'],
    ['2979ff', '75a7ff', '004ecb'],
    ['2962ff', '768fff', '0039cb'],
  ],
  [
    //light-blue
    ['e1f5fe', 'ffffff', 'afc2cb'],
    ['b3e5fc', 'e6ffff', '82b3c9'],
    ['81d4fa', 'b6ffff', '4ba3c7'],
    ['4fc3f7', '8bf6ff', '0093c4'],
    ['29b6f6', '73e8ff', '0086c3'],
    ['03a9f4', '67daff', '007ac1'],
    ['039be5', '63ccff', '006db3'],
    ['0288d1', '5eb8ff', '005b9f'],
    ['0277bd', '58a5f0', '004c8c'],
    ['01579b', '4f83cc', '002f6c'],
    ['80d8ff', 'b5ffff', '49a7cc'],
    ['40c4ff', '82f7ff', '0094cc'],
    ['00b0ff', '69e2ff', '0081cb'],
    ['0091ea', '64c1ff', '0064b7'],
  ],
  [
    //cyan
    ['e0f7fa', 'ffffff', 'aec4c7'],
    ['b2ebf2', 'e5ffff', '81b9bf'],
    ['80deea', 'b4ffff', '4bacb8'],
    ['4dd0e1', '88ffff', '009faf'],
    ['26c6da', '6ff9ff', '0095a8'],
    ['00bcd4', '62efff', '008ba3'],
    ['00acc1', '5ddef4', '007c91'],
    ['0097a7', '56c8d8', '006978'],
    ['00838f', '4fb3bf', '005662'],
    ['006064', '428e92', '00363a'],
    ['84ffff', 'baffff', '4bcbcc'],
    ['18ffff', '76ffff', '00cbcc'],
    ['00e5ff', '6effff', '00b2cc'],
    ['00b8d4', '62ebff', '0088a3'],
  ],
  [
    //teal
    ['e0f2f1', 'ffffff', 'aebfbe'],
    ['b2dfdb', 'e5ffff', '82ada9'],
    ['80cbc4', 'b2fef7', '4f9a94'],
    ['4db6ac', '82e9de', '00867d'],
    ['26a69a', '64d8cb', '00766c'],
    ['009688', '52c7b8', '00675b'],
    ['00897b', '4ebaaa', '005b4f'],
    ['00796b', '48a999', '004c40'],
    ['00695c', '439688', '003d32'],
    ['004d40', '39796b', '00251a'],
    ['a7ffeb', 'dbffff', '75ccb9'],
    ['64ffda', '9effff', '14cba8'],
    ['1de9b6', '6effe8', '00b686'],
    ['00bfa5', '5df2d6', '008e76'],
  ],
  [
    //green
    ['e8f5e9', 'ffffff', 'b6c2b7'],
    ['c8e6c9', 'fbfffc', '97b498'],
    ['a5d6a7', 'd7ffd9', '75a478'],
    ['81c784', 'b2fab4', '519657'],
    ['66bb6a', '98ee99', '338a3e'],
    ['4caf50', '80e27e', '087f23'],
    ['43a047', '76d275', '00701a'],
    ['388e3c', '6abf69', '00600f'],
    ['2e7d32', '60ad5e', '005005'],
    ['1b5e20', '4c8c4a', '003300'],
    ['b9f6ca', 'ecfffd', '88c399'],
    ['69f0ae', '9fffe0', '2bbd7e'],
    ['00e676', '66ffa6', '00b248'],
    ['00c853', '5efc82', '009624'],
  ],
  [
    //light-green
    ['f1f8e9', 'ffffff', 'bec5b7'],
    ['dcedc8', 'fffffb', 'aabb97'],
    ['c5e1a5', 'f8ffd7', '94af76'],
    ['aed581', 'e1ffb1', '7da453'],
    ['9ccc65', 'cfff95', '6b9b37'],
    ['8bc34a', 'bef67a', '5a9216'],
    ['7cb342', 'aee571', '4b830d'],
    ['689f38', '99d066', '387002'],
    ['558b2f', '85bb5c', '255d00'],
    ['33691e', '629749', '003d00'],
    ['ccff90', 'ffffc2', '99cc60'],
    ['b2ff59', 'e7ff8c', '7ecb20'],
    ['76ff03', 'b0ff57', '32cb00'],
    ['64dd17', '9cff57', '1faa00'],
  ],
  [
    //lime
    ['f9fbe7', 'ffffff', 'c6c8b5'],
    ['f0f4c3', 'fffff6', 'bdc192'],
    ['e6ee9c', 'ffffce', 'b3bc6d'],
    ['dce775', 'ffffa6', 'a8b545'],
    ['d4e157', 'ffff89', 'a0af22'],
    ['cddc39', 'ffff6e', '99aa00'],
    ['c0ca33', 'f5fd67', '8c9900'],
    ['afb42b', 'e4e65e', '7c8500'],
    ['9e9d24', 'd2ce56', '6c6f00'],
    ['827717', 'b4a647', '524c00'],
    ['f4ff81', 'ffffb3', 'bfcc50'],
    ['eeff41', 'ffff78', 'b8cc00'],
    ['c6ff00', 'fdff58', '90cc00'],
    ['aeea00', 'e4ff54', '79b700'],
  ],
  [
    //yellow
    ['fffde7', 'ffffff', 'cccab5'],
    ['fff9c4', 'fffff7', 'cbc693'],
    ['fff59d', 'ffffcf', 'cbc26d'],
    ['fff176', 'ffffa8', 'cabf45'],
    ['ffee58', 'ffff8b', 'c9bc1f'],
    ['ffeb3b', 'ffff72', 'c8b900'],
    ['fdd835', 'ffff6b', 'c6a700'],
    ['fbc02d', 'fff263', 'c49000'],
    ['f9a825', 'ffd95a', 'c17900'],
    ['f57f17', 'ffb04c', 'bc5100'],
    ['ffff8d', 'ffffbf', 'cacc5d'],
    ['ffff00', 'ffff5a', 'c7cc00'],
    ['ffea00', 'ffff56', 'c7b800'],
    ['ffd600', 'ffff52', 'c7a500'],
  ],
  [
    //amber
    ['fff8e1', 'ffffff', 'ccc5af'],
    ['ffecb3', 'ffecb3', 'ffecb3'],
    ['ffe082', 'ffffb3', 'caae53'],
    ['ffd54f', 'ffff81', 'c8a415'],
    ['ffca28', 'fffd61', 'c79a00'],
    ['ffc107', 'fff350', 'c79100'],
    ['ffb300', 'ffe54c', 'c68400'],
    ['ffa000', 'ffd149', 'c67100'],
    ['ff8f00', 'ffc046', 'c56000'],
    ['ff6f00', 'ffa040', 'c43e00'],
    ['ffe57f', 'ffffb0', 'cab350'],
    ['ffd740', 'ffff74', 'c8a600'],
    ['ffc400', 'fff64f', 'c79400'],
    ['ffab00', 'ffdd4b', 'c67c00'],
  ],
  [
    //orange
    ['fff3e0', 'ffffff', 'ccc0ae'],
    ['ffe0b2', 'ffffe4', 'cbae82'],
    ['ffcc80', 'ffffb0', 'ca9b52'],
    ['ffb74d', 'ffe97d', 'c88719'],
    ['ffa726', 'ffd95b', 'c77800'],
    ['ff9800', 'ffc947', 'c66900'],
    ['fb8c00', 'ffbd45', 'c25e00'],
    ['f57c00', 'ffad42', 'bb4d00'],
    ['ef6c00', 'ff9d3f', 'b53d00'],
    ['e65100', 'ff833a', 'ac1900'],
    ['ffd180', 'ffffb1', 'caa052'],
    ['ffab40', 'ffdd71', 'c77c02'],
    ['ff9100', 'ffc246', 'c56200'],
    ['ff6d00', 'ff9e40', 'c43c00'],
  ],
  [
    //deep-orange
    ['fbe9e7', 'ffffff', 'c8b7b5'],
    ['ffccbc', 'ffffee', 'cb9b8c'],
    ['ffab91', 'ffddc1', 'c97b63'],
    ['ff8a65', 'ffbb93', 'c75b39'],
    ['ff7043', 'ffa270', 'ffa270'],
    ['ff5722', 'ff8a50', 'c41c00'],
    ['f4511e', 'ff844c', 'b91400'],
    ['e64a19', 'ff7d47', 'ac0800'],
    ['d84315', 'ff7543', '9f0000'],
    ['bf360c', 'f9683a', '870000'],
    ['ff9e80', 'ffd0b0', 'c96f53'],
    ['ff6e40', 'ffa06d', 'c53d13'],
    ['ff3d00', 'ff7539', 'c30000'],
    ['dd2c00', 'ff6434', 'a30000'],
  ],
  [
    //brown
    ['efebe9', 'ffffff', 'bdb9b7'],
    ['d7ccc8', 'fffffb', 'a69b97'],
    ['bcaaa4', 'efdcd5', '8c7b75'],
    ['a1887f', 'd3b8ae', '725b53'],
    ['8d6e63', 'be9c91', '5f4339'],
    ['795548', 'a98274', '4b2c20'],
    ['6d4c41', '9c786c', '40241a'],
    ['5d4037', '8b6b61', '321911'],
    ['4e342e', '7b5e57', '260e04'],
    ['3e2723', '6a4f4b', '1b0000'],
  ],
  [
    //grey
    ['fafafa', 'ffffff', 'c7c7c7'],
    ['f5f5f5', 'ffffff', 'c2c2c2'],
    ['eeeeee', 'ffffff', 'bcbcbc'],
    ['e0e0e0', 'ffffff', 'aeaeae'],
    ['bdbdbd', 'efefef', 'efefef'],
    ['efefef', 'cfcfcf', 'cfcfcf'],
    ['757575', 'a4a4a4', '494949'],
    ['616161', '8e8e8e', '373737'],
    ['424242', '6d6d6d', '1b1b1b'],
    ['212121', '484848', '000000'],
  ],
  [
    //blue-grey
    ['eceff1', 'ffffff', 'babdbe'],
    ['cfd8dc', 'ffffff', '9ea7aa'],
    ['b0bec5', 'e2f1f8', '808e95'],
    ['90a4ae', 'c1d5e0', '62757f'],
    ['78909c', 'a7c0cd', '4b636e'],
    ['607d8b', '8eacbb', '34515e'],
    ['546e7a', '819ca9', '29434e'],
    ['455a64', '718792', '1c313a'],
    ['37474f', '62727b', '102027'],
    ['263238', '4f5b62', '000a12'],
  ],
];

export function getColor(key: string, layout?: string): any {
  let ind = key.lastIndexOf('-');
  let name = key.substring(0, ind);
  let nameInd = names.findIndex((it) => it === name);
  if (nameInd < 0) {
    console.log('Invalid color name: ', key);
    return null;
  }
  let level = key.substring(name.length);
  if (!level.startsWith('-')) {
    console.log('Invalid color key: ', key);
    return null;
  }
  level = level.substring(1);
  let levelInd = levels.indexOf(level);
  if (levelInd < 0) {
    console.log('Invalid level: ', level);
  }
  layout = layout || 'default';
  let layoutInd = layouts.indexOf(layout);
  if (layoutInd < 0) {
    layoutInd = 0;
  }
  let nameData = colorsData[nameInd];
  if (nameData.length <= levelInd) {
    console.log('Level out of range');
    return null;
  }
  let valueData = nameData[levelInd];
  let res = valueData[layoutInd];
  if (res) {
    res = `#${res}`;
  }
  return res;
}

export function randColor(lvlMin?: number, lvlMax?: number): any {
  let nameInd = _.random(0, names.length - 1);
  let nameData = colorsData[nameInd];
  let nbData = nameData.length;
  let nbLvl = levels.length;
  console.log('nbLvl', nbLvl);

  let _inRange = (v: number, vMin: number, vMax: number) => {
    return !isNaN(v) && v >= vMin && v < vMax;
  };

  let min = _inRange(lvlMin || 0, 0, nbLvl) ? lvlMin : 0;

  let max: number = _inRange(lvlMax || 0, 0, nbLvl) ? lvlMax || 0 : nbLvl;
  if (max <= 0) {
    max = nbLvl;
  }
  max = max <= nbData ? max : nbData;
  // console.log('max', max);

  let levelInd = _.random(min, max - 1);
  return '#' + nameData[levelInd][0];
}

export function randColors(nbColors: number, distinct?: boolean): any[] {
  let res = [];
  if (distinct === undefined) {
    distinct = true;
  }
  for (let i = 0; i < nbColors; i++) {
    let nc = randColor();
    while (distinct && res.includes(nc)) {
      nc = randColor();
    }
    res = [...res, nc];
  }
  return res;
}

export function randHighColors(nbColors: number, distinct?: boolean): ?(any[]) {
  let res: any[] = [];
  if (distinct === undefined) {
    distinct = true;
  }
  let minLvl = 4;
  for (let i = 0; i < nbColors; i++) {
    let nc: any = randColor(minLvl);
    while (distinct && res.includes(nc)) {
      nc = randColor(minLvl);
    }
    res = [...res, nc];
  }
  return res;
}

export function transparentize(value: any, opacity: any): any {
  var alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}
