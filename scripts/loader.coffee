class window.RootLoader
    
    opacityValue : 0
    event : null
    menu : null


    MAXCONNECTIONS              : 15.0

    TABLET_MAXCONNECTIONS       : 3.0

    constructor:->    

        

        @loader = new createjs.LoadQueue false

        @loader.setMaxConnections @MAXCONNECTIONS

        

        @loader.addEventListener 'error', @error

        @loader.addEventListener 'complete', @complete

        @loader.addEventListener 'progress', @progress        


        @start()


    start :=>

        @HAS_ERROR = false


        @assets = [

            # Complete your asset with this sheme to preload them

            {id : '0', src : 'images/'},
            {id : '1', src : 'images/'}

            
         

        ]        


        @loader.loadManifest @assets


    progress : ( event_ ) =>


        # use percent value to animate your loading screen

        percent = Math.round( @loader.progress * 100) 
        console.log " Loading : "+ percent
       






    complete : ( event_ ) =>  

        @main = new main()



    error : ( e_ ) =>

        @HAS_ERROR = true
        console.log 'ERROR : AppLoader', e_         

        









  
                       



            
