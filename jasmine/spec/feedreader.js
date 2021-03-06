/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */


$(function() {

        /* This is our first test suite - a test suite just contains
        * a related set of tests. This suite is all about the RSS
        * feeds definitions, the allFeeds variable in our application.
        */

    var entriesStart,
        entriesEnd;


        describe('RSS Feeds', function() {

            /* This is our first test - it tests to make sure that the
             * allFeeds variable has been defined and that it is not
             * empty. Experiment with this before you get started on
             * the rest of this project. What happens when you change
             * allFeeds in app.js to be an empty array and refresh the
             * page?
             */
            it('allFeeds is defined and not empty', function() {
                expect(allFeeds).toBeDefined();
                expect(allFeeds.length).not.toBe(0);
            });

            /* Test looping through each feed
             * in the allFeeds object and ensures it has a URL defined
             * and that the URL is not empty.
             */
            it('urls are defined and not empty', function () {
                for (var i = 0; i < allFeeds.length; i++) {
                    expect(allFeeds[i].url).toBeDefined();
                    expect(allFeeds[i].url.length).not.toBe(0);
                };
            });

            /* Test looping through each feed
             * in the allFeeds object and ensures it has a name defined
             * and that the name is not empty.
             */
            it('names are defined and not empty', function () {
                for (var i = 0; i < allFeeds.length; i++) {
                    expect(allFeeds[i].name).toBeDefined();
                    expect(allFeeds[i].name.length).not.toBe(0);
                };
            });
        });


        /* Test suite named "The menu" */
        describe('The Menu', function () {

            /* Test that ensures the menu element is
             * hidden by default.
             */
            it('menu element is hidden by default', function () {
                expect($('body').hasClass('menu-hidden')).toEqual(true);
            });

             /* Test that ensures the menu changes
              * visibility when the menu icon is clicked.
              * This test have two expectations: does the menu display when
              * clicked and does it hide when clicked again.
              */
            it('menu toggles display/hide when clicked', function () {
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(false);
                $('.menu-icon-link').trigger('click');
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });
        });


        /* Test suite named "Initial Entries" */
        describe('Initial Entries', function () {

            /* Test that ensures when the loadFeed
             * function is called and completes its work, there is at least
             * a single .entry element within the .feed container.
             * As loadFeed() is asynchronous so this test makes
             * use of Jasmine's beforeEach and asynchronous done() function.
             */
            beforeEach(function (done) {
                loadFeed(0, function () {
                    done();
                });
            });

            it('check if there is at least a single entry', function () {
                expect($('.feed .entry').length).toBeGreaterThan(0);
            });
        });


        /* Test suite named "New Feed Selection" */
        describe('New Feed Selection', function () {

            /* Test that ensures when a new feed is loaded
             * by the loadFeed function that the content actually changes.
             * As loadFeed() is asynchronous so this test makes
             * use of Jasmine's beforeEach and asynchronous done() function.
             */
            beforeEach(function (done) {
                loadFeed(0, function () {
                    entriesStart = $('.feed').html();
 	                loadFeed(1, function () {
	                    entriesEnd = $('.feed').html();
	                    done();
	                });
                });
            });

            it('check if new feed is loaded', function () {
                expect(entriesStart).not.toBe(entriesEnd);
            });
        });

}());
