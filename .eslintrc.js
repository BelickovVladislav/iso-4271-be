module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint/eslint-plugin", "simple-import-sort"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // External packages.
          [
            // Import type
            "^(typeorm|dotenv|@nestjs|fs|path|helmet|express-rate-limit|express-basic-auth|express|body-parser|class-validator|class-transformer|nodemailer|jsonwebtoken|crypto|pg|child_process|rxjs|@symfa-inc|ejs|multer|exceljs|qs|moment|pdf-lib|os|puppeteer|xml|stream|supertest|@faker-js|sharp|uuid)(/.*\\u0000|.*\\u0000$)",
            "^(typeorm|dotenv|@nestjs|fs|path|helmet|express-rate-limit|express-basic-auth|express|body-parser|class-validator|class-transformer|nodemailer|jsonwebtoken|crypto|pg|child_process|rxjs|@symfa-inc|ejs|multer|exceljs|qs|moment|pdf-lib|os|puppeteer|xml|stream|supertest|@faker-js|sharp|uuid)(/.*|$)"
          ],
          // Internal packages.
          [
            // Import type
            "^(@core|@db|@models|@modules|@fixtures)(/.*\\u0000|.*\\u0000$)",
            "^(@core|@db|@models|@modules|@fixtures)(/.*|$)"
          ],
          [
            // Import type
            "^@?\\w.*\\u0000$",
            "^[^.].*\\u0000$",
            "^\\..*\\u0000$",
            // Side effect imports.
            "^\\u0000",
            // Parent imports. Put `..` last.
            "^\\.\\.(?!/?$)",
            "^\\.\\./?$",
            // Other relative imports. Put same-folder imports and `.` last.
            "^\\./(?=.*/)(?!/?$)",
            "^\\.(?!/?$)",
            "^\\./?$"
          ]
        ]
      }
    ]
  }
};
