# NEXIOUS LIBRARY

- Official database for nexious.tech
- Built using typescript scss and compiles to js and css

# Download

```
NPM:
npm i nexious-library

Yarn:
yarn add nexious-library
```
# Usage
1. Works out of the box with following initial props:
  * value is the only as required prop used to tell the component currentdate value
  * Calendar Usage: 
    - <Calendar
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
  * Output
    - Calendar with month as default view


2. Works out of the box with following initial props:
  * initialValues and onSubmit as required props
  * Form Usage: 
    - <Form
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
  * Output
  - Form with initial values as fields with a submit button for form submition

3. Works out of the box with following initial props:
  * paginate is array with initialValues and onSubmit as required props
  * PaginatedForm Usage:   
    - <PaginateForm  
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
  * Outputs Paginated Form 

# MORE COMING SOON!
<!-- 
TODO: 
## Rename files in directory

Auto rename files from .js to jsx run on terminal:

- npx nexious-library rename.sh  
  
Auto rename files from .jsx to tsx run on terminal:

- npx nexious-library renameToTsx.sh -->

## Style guide

Eslint + Airbnb + Prettier configuration guide: https://medium.com/@ErikKyleNielsen/setting-up-eslint-prettier-airbnb-base-and-typescript-27b3f9538f0d

