import fs from 'fs';

function generateFactoryFile(modelName: string, fileName: string): void {
  const generateMethodName = 'generate';

  const factoryCode = `import faker from 'faker';
  import type { SeedData } from '@stacksjs/types'

function ${generateMethodName}(): SeedData {
  return {
    // fields here
  };
}

export { ${generateMethodName} };
`;

  fs.writeFileSync(fileName, factoryCode);
}

export {
  generateFactoryFile
}
