# providers
1. Don't use Ionic CLI to create provider

2.  Class name : {{name}}ServiceProvider (Pascal case) 
    e.g. 

    @Injectable()
    export class UserServiceProvider{}

3. Whenever you are injecting this in costructor inject this like
    e.g.

    constructor(private userService: UserServiceProvider){}

4. All ionic API or Services for controllers (e.g. AlertController, LoadingController) should be written under ion-service folder.

5. File name should be like : UserServiceProvider - user-service.ts
                              HttpServiceProvider - http-service.ts

#Instructions
 1. create folder example-service
 2. under that create file example-service.ts
 3. user @injectable decorator and export class named 'ExampleServiceProvider'
 4. add this into providers.module.ts
