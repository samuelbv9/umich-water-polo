# README

In this document, you will learn about the structure of the website, how it is hosted, how to open the website on a local machine, how to deploy it to Apache, and how modify the sites content!

## Getting Started
The project repository can be found at this link: https://github.com/akaipainen/um-polo-website

The project is coded in Node.js with the React framework. To run the application on a local host, you must first install node.js from the Node website. Once you have node, clone the repo: `git clone`

Once the repo is on your local machine, navigate to the folder in the Node.js command prompt. To open the project, you will first have to enter the following command:`npm install`

This will install all of the the project's dependencies. You can find a list of the dependencies in package.json but running npm install will install all of them for you.

Once that is finished, you can run the following command to serve the site on your local network on the default port, port 3000: `npm start`

And just like that, you have the project up and running. 

## Making a simple change
A simple change is defined as any change that has to do with the content on the roster, schedule, Eboard, fundraising chair, slideshow pictures, awards, or news. To change one of these, simply load navigate to Project>src> Data. The data is served to the website through the JSON files in this folder. To make a change, simply add/alter/remove object in the appropriate file. Simply read the first couple of entries to understand how the modifications must be formatted. To upload images for the files (should it be necessary for the section you are modifying), upload the image into project>public>folder that matches desire. Use SVGs when possible and always optimize images with imageoptim or svgo.


## Deployment
To deploy the site, run the following command in the node terminal to create a build folder:`npm run build`
Now, upload the entire contents of the build folder to the private UMpolo sub-directory. This can be done either manually or through SFTP. The command I use is `rsync -rtvaz --delete ./build/ [uniqname]@login.engin.umich.edu:/afs/umich.edu/group/soas/umpolo/Private/html/`

Happy Coding!