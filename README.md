This project build a tool that help initiate react structure fast. And it bootstrap [Create React App](https://github.com/facebook/create-react-app).  
**How to use this package**  
Open termial and run following commands:
1. `npm install -g cra-structure-cli`
2. `cra-structure-cli my-app`

You can choose to initiate project with typescript by add --typescript or -ts parameter like:  
`npx cra-`
  
Wait a few minutes and this will create for you a folder named `my-app` and this is your project folder.

**How to test your project**
1. `cd my-app`
2. `npm start`

**Any issues please let me know by open issues**

**Folder Structure**  
my-app  
├── README.md  
├── .git  
├── .gitignore  
├── node_modules  
├── package.json  
├── .gitignore  
├── .editorconfig  
├── public  
│   ├── favicon.ico  
│   ├── index.html  
│   └── manifest.json  
└── src  
    ├── components/  
    ├── constants/  
    ├── containers/  
    ├── middlewares/  
    ├── store/  
    ├── utils/  
    ├── index.js  
    └── serviceWorker.js  

**Components**: Contains any components for the app, offen resuable and stataless component.  
**Containers**: Offen a container is a view pagem, where connect react to redux.  
**Constants**: Define any constant for the app.  
**Middlewares**: Where create middleware for redux.
**Store**: Where create store for the app.  
**Utils**: Where create function that can reusable.
