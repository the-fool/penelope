'use strict';

describe('Penelope', function () {

    beforeEach(module('penelopeApp'));

    describe('library view directive', function () {
        var scope, $compile, $httpBackend, library;
    
        beforeEach(module('penelopeDirectives'));

        beforeEach(module('/static/partials/templates/library_view.html'));

        beforeEach(inject(function (_$httpBackend_, _$rootScope_, $compile) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('api/library').
            respond([{
                    "name": "Blackstar",
                    "artist": "David Bowie",
                    "num_tracks": 7,
                    "tracks": [{
                        "title": "Blackstar",
                        "track_num": 1,
                        "length": 597,
                        "pk": 14
                }, {
                        "title": "Dollar Days",
                        "track_num": 6,
                        "length": 284,
                        "pk": 15
                }, {
                        "title": "I Can't Give Everything Away",
                        "track_num": 7,
                        "length": 347,
                        "pk": 16
                }, {
                        "title": "Lazarus",
                        "track_num": 3,
                        "length": 382,
                        "pk": 17
                }, {
                        "title": "Tis A Pity She Was A Whore",
                        "track_num": 2,
                        "length": 292,
                        "pk": 18
                }, {
                        "title": "Girl Loves Me",
                        "track_num": 5,
                        "length": 291,
                        "pk": 19
                }, {
                        "title": "Sue (Or In A Season Of Crime)",
                        "track_num": 4,
                        "length": 280,
                        "pk": 20
                }],
                    "year": 2016,
                    "pk": 1
            },
                {
                    "name": "Currents",
                    "artist": "Tame Impala",
                    "num_tracks": 13,
                    "tracks": [{
                        "title": "Yes I\u2019m Changing",
                        "track_num": 4,
                        "length": 270,
                        "pk": 1
                }, {
                        "title": "Let It Happen",
                        "track_num": 1,
                        "length": 466,
                        "pk": 2
                }, {
                        "title": "The Less I Know The Better",
                        "track_num": 7,
                        "length": 218,
                        "pk": 3
                }, {
                        "title": "Past Life",
                        "track_num": 8,
                        "length": 227,
                        "pk": 4
                }, {
                        "title": "Nangs",
                        "track_num": 2,
                        "length": 108,
                        "pk": 5
                }, {
                        "title": "The Moment",
                        "track_num": 3,
                        "length": 255,
                        "pk": 6
                }, {
                        "title": "New Person, Same Old Mistakes",
                        "track_num": 13,
                        "length": 362,
                        "pk": 7
                }, {
                        "title": "\u2018Cause I\u2019m A Man",
                        "track_num": 10,
                        "length": 241,
                        "pk": 8
                }, {
                        "title": "Eventually",
                        "track_num": 5,
                        "length": 319,
                        "pk": 9
                }, {
                        "title": "Gossip",
                        "track_num": 6,
                        "length": 55,
                        "pk": 10
                }, {
                        "title": "Love Paranoia",
                        "track_num": 12,
                        "length": 186,
                        "pk": 11
                }, {
                        "title": "Reality In Motion",
                        "track_num": 11,
                        "length": 252,
                        "pk": 12
                }, {
                        "title": "Disciples",
                        "track_num": 9,
                        "length": 108,
                        "pk": 13
                }],
                    "year": 2015,
                    "pk": 2
            }]);

            library = angular.element('<library-view id="library"></library-view>');
            scope = _$rootScope_;
            $compile(library)(scope);
            scope.$digest();
        }));

        it('should have an unordered list', inject(function ($compile, $rootScope) {
            var list = library.find('ul');

            expect(list.length).not.toBeLessThan(1);
          
        }));

    });


});
