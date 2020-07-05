# Timetable

## Developer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0
Supported by Mapbox Gl when a map is needed. The static map source of it is supported by openstreetmap https://www.openstreetmap.org/. 
The protocol of GTFS-Realtime can be seen in timetable.d.ts and timetable.js, which is automatic written by protobufjs https://github.com/protobufjs/protobuf.js/blob/master/README.md.

The software is only for educational or personal used purposes. All right reserved.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 
ng serve limit its memory to 1500mb. This project use a special protocol to test, so it is not enough.
You can use a new script `npm run build-serve`
The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `docs/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## User

Users can use this tool in an easy way.

### File upload and download

Click the side-navigator, which hidden in the left side. And then click the File-Upload Button. The software supports Drag and drop, as well as click and upload. One thing you may mention is that if you upload two .zip as well as two .pb files at the same thing. The latest version will overwrite the older one.
Gtfs Files support only one .zip and Realtime support only one .pb
You can also edit both of them without upload anything. But only the stops and routes you added to the static file can be used later in the Realtime Files.

### Edit

You need to save the file before you leave the page. A warning will be added later if needed.

### Download
Use both of the download button in the side navigator to download Files.

#### GTFS File

Empty File will not be added to the downloaded .zip when it is not required.

#### GTFS Realtime

The protocol will exam all the Date before it is downloaded. Follow the instruction when there is a problem.




