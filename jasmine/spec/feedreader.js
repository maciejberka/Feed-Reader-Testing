
//Run tests when DOM is ready
$(function() {
    
    //Tests against feed
    describe('RSS Feeds', function() {
        //Is allFeeds variable defined and not empty?
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
      
        //Did objects in allFeeds have defined URLS?
        it('has defined URLS', function(){
          for(var i = 0; i < allFeeds.length; i++){
            expect(allFeeds[i].url).toBeTruthy();
          }
        });    
        
        //Did objects in allFeeds have defined names?
        it('has defined names', function(){
          for(var i = 0; i < allFeeds.length; i++){
            expect(allFeeds[i].name).toBeTruthy();
          }
        });
      
    });

    //Tests against menu
    describe('The menu', function(){
      
        //Is slide-menu hidden by default? 
        it('is hidden by default', function(){
          var body = document.querySelector('body');
          var isHidden = body.classList.contains('menu-hidden');
          expect(isHidden).toBe(true);
        });      
      
        //Is menu visible after click on menu icon and invisible after second click? 
        it('visibility of menu is changed when the menu icon is clicked', function(){
          var menuIcon = document.querySelector('.menu-icon-link');
          var body = document.querySelector('body');
          
          //Is menu visible after first click?
          menuIcon.click();
          var isHidden = body.classList.contains('menu-hidden');
          expect(isHidden).toBe(false);
          
          //Is menu invisible after second click?
          menuIcon.click();
          isHidden = body.classList.contains('menu-hidden');
          expect(isHidden).toBe(true);
        });
      
    });  
  
    //Tests against initial entries
    describe('Initial Entries', function(){
        
        //loadFeed function is asynchronous, so we have to make our tests when loadFeed complete its work
        beforeEach(function(done) {
          loadFeed(0, done);
        });
        
        //loadFeed function is done. Did feed contain at least one .entry element?
        it('.feed container contain at least one .entry element', function(){
          expect($('.feed .entry').length).toBeGreaterThan(0);
        });
      
    });
  
    //Tests against new feed selection
    describe('New Feed Selection', function(){
        //Is content changing when a new feed is loaded?
      
        //We will store headings in those variables to compare it later
        var firstHeader;
        var secondHeader; 

        //loadFeed is asynchronous, so wait until its complete its work...
        beforeEach(function (done) {
          //Load first feed
          loadFeed(0, function () {
            //and get first header to the variable
            firstHeader = document.querySelector('.feed h2').innerHTML;
            
            //Load second feed
            loadFeed(1, function () {
              //and get first header to the variable
              secondHeader = document.querySelector('.feed h2').innerHTML;
              done();
            });
            
          });
          
        });

        //Is content changing when a new feed is loaded?
        it('Content is changing when a new feed is loaded', function(done) {
          //Compare firstHeader and secondHeader. They should be different, because we switched feeds.
          expect(firstHeader).not.toEqual(secondHeader);
          done();
        });

    });  
  
}());









