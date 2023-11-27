# NEXIOUS LIBRARY

<!-- - Official database for nexious.tech -->

## Download

- npm
  - npm i -S nexious-library
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
       formId: string;                        // give your form an Id, is only required with Paginate Form
       <!-- optional -->
       heading?: string;                      // title of the form
       previewLabel?: string;                 // add preview label for button to view changes on form
       responseErr?: string;                  // add error message after AJAX request failed
       submitLabel?: string;                  // use your custom submit button label
       theme?: string;                        // overwrite styling with your own
       hideLabels?: boolean;                  // hide form labels
       hideSubmit?: boolean;                  // hide submit button
       withFileUpload?: boolean;              // this is required to upload files
      dataList?: {[key:string]:  {            // name of field affected
          name:"",
         value:"",
          label:""
         } []} // data list for field with input type === select
       labels?:  {[key: string]: string} ;      // use your custom labels for your form field  e.g. { appName:"enter new app name " }
       placeholders?:  {[key: string]: string}; // use your custom placeholders
       types?:  {[key: string]: string};       // use your custom field types
       schema?: {
         required: string[], // field name of required data
          unique?: {
            name: "" // field name affected
            list: string[] // fist of string values that data cannot be
            }
        };       // enter your desired schema for
       fieldHeading?: { [key: string]: string }; // enter custom field heading
       addEntry?: {                           // works with type ="checkbox" and adds new field values when a
         [key: string]: {                      // name of field affected
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
       onSubmit?: (e: any) => void;            // create your custom submit function it will work with out it but it will do nothing
       onChange?: (e: any) => void;           // create your custom onChange event handlers
       onCancel?: () => void;           // add custom function for cancelling
       onViewPreview?: (e: any) => void;           // create your custom function to view data
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
            formId: string;                        // give your form an Id, is only required with Paginate Form
            <!-- optional -->
            heading?: string;                      // title of the form
            previewLabel?: string;                 // add preview label for button to view changes on form
            responseErr?: string;                  // add error message after AJAX request failed
            submitLabel?: string;                  // use your custom submit button label
            theme?: string;                        // overwrite styling with your own
            hideLabels?: boolean;                  // hide form labels
            hideSubmit?: boolean;                  // hide submit button
            withFileUpload?: boolean;              // this is required to upload files
            dataList?: {[key:string]:  {            // name of field affected
                name:"",
              value:"",
                label:""
              } []} // data list for field with input type === select
            labels?:  {[key: string]: string} ;      // use your custom labels for your form field  e.g. { appName:"enter new app name " }
            placeholders?:  {[key: string]: string}; // use your custom placeholders
            types?:  {[key: string]: string};       // use your custom field types
            schema?: {
              required: string[], // field name of required data
                unique?: {
                  name: "" // field name affected
                  list: string[] // fist of string values that data cannot be
                  }
              };       // enter your desired schema for
            fieldHeading?: { [key: string]: string }; // enter custom field heading
            addEntry?: {                           // works with type ="checkbox" and adds new field values when a
              [key: string]: {                      // name of field affected
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
            onSubmit?: (e: any) => void;            // create your custom submit function it will work with out it but it will do nothing
            onChange?: (e: any) => void;           // create your custom onChange event handlers
            onCancel?: () => void;           // add custom function for cancelling
            onViewPreview?: (e: any) => void;           // create your custom function to view data
      }   ];
         onFormSumbit={(e:any)=>void }                     // create your custom onFormSubmit function
       <!-- optional props -->
         navigationHeading?: string ;                   // add custom navigation title
            theme?: string;                        // overwrite styling with your own
         page?: number;                                   //  default is 0
         responseErr?: string;                  // add error message after AJAX request failed
         order?: string[]; default is orginal order      // use your custom order to traverse form
         previewPage?: <YourOwnComponent  preview={formData} />;                  // add your own custom component
         hideNavigation?: boolean;                     //  hide paginated navigation
         setNewPage={(e:any)=>void }                     //   create your custom setNewPage function
         onCancel={(e:any)=>void }                     //   cancel form function
         onPageClick={(e:any)=>void }                     //   navigation button pressed
         onDialogClose={(e:any)=>void }                     //   Dialog close button pressed
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
