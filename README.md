This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To Run
 npm install
 npm run server
 npm run client

 this build is a proof of concept.  because requests to the Abstract API come from the client, they hit against a CORS error.  To bypass this error for the sake of demo, install this plugin (or a similar one) to the Chrome browser: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi

 Request an API key from abstract here: https://app.goabstract.com/account/tokens
 Create a .ENV file in the root of the project
 Add this line with your unique key: 
    ABSTRACT_TOKEN= key_here
    SKIP_PREFLIGHT_CHECK=true

 Add .env to your .gitignore so you don't accidentally share this private key



##This Program
Displays a comment feed for your Abstract Projects. Once setup, use the left menu to select a project, then branch and view all of your comments alongside a preview of the artboard, sorted by commit.
<img src="/public/view.png"
     alt="View"
     style="float: left; margin-right: 10px;" />

![View](View.png)

Thanks to the Abstract SDK, Sketch, and Andrea Burton!