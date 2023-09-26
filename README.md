# NEXIOUS LIBRARY

<!-- - Official database for nexious.tech -->

## Download

- npm
  - npm i nexious-library
  - npm install nexious-library
- Yarn:
  - yarn add nexious-library

## Setting up TS

1. download typescript and associated types as dev dependency
2. create ts.config.json for ts linting
    - tsconfig.json

    ```text
        {
          "compilerOptions": {
            "target": "ES2022", // if code runs on the browser Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
            "module": "ES2020",
            "moduleResolution": "Node",
            "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
            "allowSyntheticDefaultImports": true, // e.i import package from 'library'
            "jsx": "react-jsx" /* Specify what JSX code is generated. */,
            "baseUrl": "src" /* Specify the base directory to resolve non-relative module names. */,
            "paths": {
              // "@context/*": ["src/utils/context/*"]
            } // Specify a set of entries that re-map imports to additional lookup locations. */,
            "forceConsistentCasingInFileNames": true,
            "declaration": true /* Generate .d.ts files from TypeScript and JavaScript files in your project. */,
            "sourceMap": true /* Create source map files for emitted JavaScript files. */,
            "outDir": "dist" /* Specify an output folder for all emitted files. */,
            "isolatedModules": true,
            "strict": true /* Enable all strict type-checking options. */,
            "lib": ["ES5", "ES2015", "ES2016", "DOM", "ESNext", "DOM.Iterable"],
            "declarationMap": true /* Create sourcemaps for d.ts files. */,
            "inlineSources": true /* Include source code in the sourcemaps inside the emitted JavaScript. */
          },
          "include": ["src/*"],
          "exclude": ["node_modules"]
        }
      ```
3. update scripts in package.json file
    - add command ```text "watch": "tsc -p tsconfig.json -w"```

## Techstack

  <!-- 1. Style guide used [Eslint + Airbnb + Prettier configuration guide]( https://medium.com/@ErikKyleNielsen/setting-up-eslint-prettier-airbnb-base-and-typescript-27b3f9538f0d) -->
  1. This app was built using typescript scss and compiles to js and css

## Usage

Works out of the box with following initial props:

1. Calendar Usage

    - value is the only as required prop used to tell the component currentdate value
    - Outputs Calendar with month as default view:
  
    ```text
        <Calendar
          <!-- required props -->
            value: Date; for initial date use today = new Date();  
          <!-- optional props -->
            minDate?: Date; the mininum date the calendar will go back 
            onDayClick?: (e: any) => void; when day is clicked 
            setDay?: (a: any) => void; set new current date 
            theme?: string;
            events?: [
              <!-- display calendar events on calendar -->
              {
              date: string; 
              list: [{
                      date: string; 
                      start: number, 
                      end: number, 
                      isOpen:boolean,
                      uid: string 
                }]}];  
        />
      ```

2. Form Usage:
    - initialValues and onSubmit as required props

    ```text
    <Form
    <!-- required props -->
        initialValues: { [key: string]: any };
        onSubmit: (e: any) => void;
        <!-- optional with app init defaults -->
        placeholders?: { [key: string]: string };
        labels?: { [key: string]: string; default is labels on (Link to init form labels) };
        types?: { [key: string]: string; default is text on form input fields };
        <!-- optional no defaults -->
        hideLabels?: boolean;
        hideSubmit?: boolean;
        submitLabel?: string;
        schema?: { required: string[] };
        theme?: string;
    />
    ```

3. PaginatedForm Usage

- paginate is array with initialValues and onSubmit as required props

    ```text
    <PaginateForm  
    <!-- required props -->
      paginate: [
        {
          <!-- required props -->
          initialValues: { [key: string]: any };
          onSubmit: (e: any) => void;
          <!-- optional with app init defaults -->
          placeholders?: { [key: string]: string };
          labels?: { [key: string]: string; default is labels on (Link to init form labels) };
          types?: { [key: string]: string; default is text on form input fields };
          <!-- optional no defaults -->
          hideLabels?: boolean;
          hideSubmit?: boolean;
          submitLabel?: string;
          schema?: { required: string[] };
          theme?: string;
        }
      ];
    <!-- optional props -->
      startPage?: number; default is 0
      pageNumber?: number; default is 0
      totalPages?: number; default is paginate length
    /> 
    ```

## MORE COMING SOON
<!-- 
TODO: 
## Rename files in directory

Auto rename files from .js to jsx run on terminal:

- npx nexious-library rename.sh  
  
Auto rename files from .jsx to tsx run on terminal:

- npx nexious-library renameToTsx.sh -->
