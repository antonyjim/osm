# Code Name THQ

This project contains the source code for a Node.js based API and a website that is driven from said API. The API/Server side code is written in 100% Typescript, while the client code is written in javascript using React and Bootstrap as the front end framework.

The source code for the server is located in `/src/server` and is further subdivided into `routes/`, `lib/` and `middleware/`. Most of the logic and functionality of the application and API are located in the `lib/` directory, while the routes (served by `express`) are located in the `routes/` directory. The `middleware/` directory is primarily used for middleware used in the `routes/` files (most notably the token validation).

To build:

```shell
npm i
npm run build
npm run start
```

To debug in VSCode:

1.  Launch debugger
2.  Run task "Launch via NPM"

###### FAIR USE STATEMENT

This site may contain copyrighted material the use of which has not always been specifically authorized by the copyright owner. We are making such material available in an effort to advance understanding of environmental, political, human rights, economic, democracy, scientific, and social justice issues, etc. we believe this constitutes a ‘fair use’ of any such copyrighted material as provided for in section 107 of the US Copyright Law.

In accordance with Title 17 U.S.C. Section 107, the material on this site is distributed without profit to those who have expressed a prior interest in receiving the included information for research and educational purposes. For more information go to: http://www.law.cornell.edu/uscode/17/107.shtml

If you wish to use copyrighted material from this site for purposes of your own that go beyond ‘fair use’, you must obtain permission from the copyright owner.
