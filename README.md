# NEXIOUS LIBRARY

<!-- - Official database for nexious.tech -->

## Download

- npm
  - npm i nexious-library
  - npm install nexious-library
- Yarn:
  - yarn add nexious-library

## Setting up TS its a starter guide

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

3. update index.html script tag to point to new ts file
   - old index.html = `<script type="module" src="/src/main.jsx"></script>`
   - new index.html = `<script type="module" src="/src/main.tsx"></script>`
4. update scripts in package.json file to include a watch file to watch for changes
   - add command `"watch": "tsc -p tsconfig.json -w"`
5. if you are adding typescript to an existing application dont rename files manually.
   - run terminal on root `cd node_modules/nexious-library && npm run renameFile src 'jsx' 'tsx'`
   - this command takes 3 required arguments:
     1. first is the path usually src
     2. second is the file extension of the files you want to rename probably 'jsx'
     3. third is the desired file extension name
   - this will run a shell script. that will:
     - rename all files to desired the extention name in the desired path

## Techstack

  <!-- 1. Style guide used [Eslint + Airbnb + Prettier configuration guide]( https://medium.com/@ErikKyleNielsen/setting-up-eslint-prettier-airbnb-base-and-typescript-27b3f9538f0d) -->

1. This app was built using typescript scss and compiles to js and css
2. Typescript
3. Javascript
4. Vite + React

## Import CSS

- find your index file and add `import "nexious-library/@index.css"`

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
           onDayClick?: (e: unknown) => void; when day is clicked
           setDay?: (a: unknown) => void; set new current date
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
       initialValues: { [key:string]:any };   // e.g. { appName:"", isNewApp:true }
       onSubmit: (e: unknown) => void;            // create your custom submit function
       formName: string;                      // give your form any name
       <!-- optional -->
       heading?: string;                      // title of the form
       onChange?: (e: unknown) => void;           // create your custom onChange event handlers
       hideLabels?: boolean;                  // hide form labels
       hideSubmit?: boolean;                  // hide submit button
       theme?: string;                        // use your custom classname to overwrite app theme
       labels?:  {[key: string]: string} ;    // use your custom labels for your form field
                                              // e.g. { appName:"enter new app name " }
       placeholders?:  {[key: string]: string}; // use your custom placeholders
       types?:  {[key: string]: string};       // use your custom field types
       submitLabel?: string;                  // use your custom submit button label
       schema?: { required: string[] };       // enter your desired schema for
       fieldHeading?: { [key: string]: string }; // enter custom field heading
       selectList?: {                          // this is required if type = "select"
         name: string;
         value: string;
         isDisabled?: boolean;
         uid?: string }[];
       addEntry?: {                           // works with type ="checkbox" and adds new field values when a
         [key: string]: {                      // checkbox is checked
           additionLabel: string;
           removalLabel: string;
           initialValues: {[key:string]:any};
           fieldHeading: string;
           labels?:  {[key: string]: string} ;
           placeholders?:  {[key: string]: string} ;
           types?:  {[key: string]: string} ;
           canMultiply?: boolean;
         };
       };
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
       initialValues: { [key:string]:any };   // e.g. { appName:"", isNewApp:true }
       onSubmit: (e: unknown) => void;            // create your custom submit function
       formName: string;                      // give your form any name
       <!-- optional -->
       heading?: string;                      // title of the form
       onChange?: (e: unknown) => void;           // create your custom onChange event handlers
       hideLabels?: boolean;                  // hide form labels
       hideSubmit?: boolean;                  // hide submit button
       theme?: string;                        // use your custom classname to overwrite app theme
       labels?:  {[key: string]: string} ;    // use your custom labels for your form field
                                              // e.g. { appName:"enter new app name " }
       placeholders?:  {[key: string]: string}; // use your custom placeholders
       types?:  {[key: string]: string};       // use your custom field types
       submitLabel?: string;                  // use your custom submit button label
       schema?: { required: string[] };       // enter your desired schema for
       fieldHeading?: { [key: string]: string }; // enter custom field heading
       selectList?: {                          // this is required if type = "select"
         name: string;
         value: string;
         isDisabled?: boolean;
         uid?: string }[];
       addEntry?: {                           // works with type ="checkbox" and adds new field values when a
         [key: string]: {                      // checkbox is checked
           additionLabel: string;
           removalLabel: string;
           initialValues: {[key:string]:any};
           fieldHeading: string;
           labels?:  {[key: string]: string} ;
           placeholders?:  {[key: string]: string} ;
           types?:  {[key: string]: string} ;
           canMultiply?: boolean;
         };
       };
           }
         ];
         onFormSumbit={(e:any)=>void }                     // create your custom onFormSubmit function
       <!-- optional props -->
         setNewPage={(e:any)=>void }                     // create your custom setNewPage function
         page?: number; default is 0
         order?: string[]; default is orginal order      // use your custom order to traverse form
         hideNavigation?: boolean;                     //  hide paginated navigation
     />
   ```

Visit <www.nexious.tech/docs> for more advanced settings

## MORE COMING SOON

With more comming soon

<!--
TODO:
## Rename files in directory

Auto rename files from .js to jsx run on terminal:

- npx nexious-library rename.sh

Auto rename files from .jsx to tsx run on terminal:

- npx nexious-library renameToTsx.sh -->
