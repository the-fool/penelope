'use strict';

describe('Penelope', function () {

    beforeEach(module('penelopeApp'));
    beforeEach(module('penelopeServices'));

    describe('library view directive', function () {
        var scope, $compile, $httpBackend, library, libctrl, $timeout;

        beforeEach(module('penelopeDirectives'));

        beforeEach(module('/static/partials/templates/library_view.html'));

        beforeEach(inject(function (_$httpBackend_, _$rootScope_, $compile, _$timeout_) {
            $timeout = _$timeout_;
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', 'api/library').
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

            library = $('<library-view id="library"></library-view>');
            scope = _$rootScope_.$new();
            $httpBackend.expectGET('api/library');
            $compile(library)(scope);
            scope.$digest();
            $httpBackend.flush();
            $timeout.flush();
            libctrl = library.isolateScope().libctrl;
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should have an unordered list', function () {
            var list = library.find('ul');
            expect(list.length).not.toBeLessThan(1);

        });

        it('should initially have invisible tracklistings', inject(function ($compile, $rootScope) {
            var listing = library.find('li.package-header').find('ul.package-listing').first();
            expect(listing).toHaveClass('ng-hide');
        }));

        it('should show its track listings ordered by track_num', function () {
            var tracks = library.find('li.package-header').first().find('li.track');
            tracks.each(function (index, el) {
                expect(index == (parseInt($(el).text()) - 1)).toBeTruthy()
            });
        });

        describe("Library item click interface", function () {
            var e, sel, packs, tracks;

            beforeEach(function () {
                e = $.Event('click');
                sel = libctrl.selectedTracks;
                packs = library.find('li.package-header');
                tracks = $(packs[0]).find('li.track');
            });

            it('should have an initially empty selected track object', function () {
                expect(Object.keys(sel).length).toBe(0);
            });

            it('selects a single track on track click', function () {
                var i = Math.floor(Math.random() * (tracks.length));
                var t = $(tracks[i]);

                expect(t).not.toHaveClass('selected');
                $(tracks[i]).trigger(e);
                expect(t).toHaveClass('selected');
            });

            it('should store selected tracks in an object', function () {
                var track = $(packs[0]).find('li.track').first();
                $(track).trigger(e);

                expect(Object.keys(sel).length).toBe(1);
            });

            it('should organize selected tracks by album package pk', function () {
                $(packs[0]).find('li.track').first().trigger(e);
                expect(Object.keys(sel).length).toBe(1);
                expect(sel[$(packs[0]).data('pk')].length).toBe(1);
            });

            it('should limit selected items to 1 on ordinary clicks', function () {
                for (var i = 0; i < 3; i++) {
                    $(tracks[i]).trigger(e);
                    expect(Object.keys(sel).length).toBe(1);
                    var key = Object.keys(sel)[0];
                    expect(sel[key].length).toBe(1);
                }
            });

            it('should deselect all when a single item is clicked', function () {
                for (var i = 0; i < 4; i++) {
                    $(tracks[i]).trigger(e);
                    $(tracks[i + 1]).trigger(e);
                    // allow time to $digest
                    $timeout(function () {
                        expect($(tracks[i])).not.toHaveClass('selected');
                        expect($(tracks[i + 1])).toHaveClass('selected');
                    }, 60);
                }
            });

            it('should select multiple items with ctrl/meta+click', function () {
                e.ctrlKey = true;
                e.metaKey = true;
                for (var i = 0; i < 4; i++) {
                    $(tracks[i]).trigger(e);
                    // allow time to $digest
                    $timeout(function () {
                        for (var j = 0; j <= i; j++) {
                            expect($(tracks[j])).toHaveClass('selected');
                        }
                    }, 60);
                }
            });

            it('should deselect multiple items with ctrl/meta+click', function () {
                e.ctrlKey = true;
                e.metaKey = true;
                for (var i = 0; i < 4; i++) {
                    $(tracks[i]).trigger(e);
                }
                for (var i = 0; i < 3; i++) {
                    $(tracks[i]).trigger(e);
                    // allow time to $digest
                    $timeout(function () {
                        for (var j = 0; j <= i; j++) {
                            expect($(tracks[j + 1])).toHaveClass('selected');
                            expect($(tracks[j])).not.toHaveClass('selected');
                        }
                    }, 60);
                }
            });
            
            it('supports selection clicks in multiple packages', function () {
                e.ctrlKey = true;
                e.metaKey = true;

                $(packs[0]).find('li.track').first().trigger(e);
                $(packs[1]).find('li.track').first().trigger(e);
                scope.$digest();
                $timeout(function() {expect(Object.keys(sel).length).toBe(2)});
            });

            it('clears all packages and add a single item with a normal click', function () {
                e.ctrlKey = true;
                e.metaKey = true;

                var tracks1 = $(packs[0]).find('li.track'),
                    tracks2 = $(packs[1]).find('li.track');
                //console.log($(packs[0]).find('li.track'));
                for (var i = 0; i < 3; i++) {
                    $(tracks1[i]).trigger(e);
                    $(tracks2[i]).trigger(e);
                }
                $timeout(function () {
                    for (var k in sel) {
                        expect(sel[k].length).toBe(3);
                    }
                });
                e.ctrlKey = false;
                e.metaKey = false;
                $(tracks1[3]).trigger(e);
                $timeout(function() {
                   expect(Object.keys(sel).length).toBe(1);
                });
            });
            
            it('should expand and minimize a listing when the anchor is clicked', function() {
                var listing = $(library.find('ul.package-listing')).first();
                expect(listing).toHaveClass('ng-hide');
                library.find('a.expand-listing').first().click(); 
                $timeout(function() {expect(listing).not.toHaveClass('ng-hide');});
                 library.find('a.expand-listing').first().click(); 
                $timeout(function() {expect(listing).toHaveClass('ng-hide');});
            });
            
            it('should clear a packgaes selection when a pack is minimized', function() {
                var anchor = library.find('a.expand-listing').first();
                anchor.click();
                
                for (var i = 0; i < 3; i++) {
                    $(tracks[i]).trigger(e);
                }
                anchor.click();
                expect(Object.keys(sel).length).toBe(0);
                
            });
        });
    });
});
