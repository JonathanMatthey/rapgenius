(function() {
  define([], function() {
    var App, clearFlashes, getTrendingStats, refreshStats, reorderRows,
      _this = this;
    this.trendingJSON = [
      {
        "id": "t1",
        "song_views": 3210,
        "annotation_count": 90,
        "verified_count": 42,
        "unreviewed_count": 5
      }, {
        "id": "t2",
        "song_views": 2900,
        "annotation_count": 66,
        "verified_count": 31,
        "unreviewed_count": 3
      }, {
        "id": "t3",
        "song_views": 2421,
        "annotation_count": 50,
        "verified_count": 24,
        "unreviewed_count": 3
      }, {
        "id": "t4",
        "song_views": 1902,
        "annotation_count": 44,
        "verified_count": 14,
        "unreviewed_count": 0
      }, {
        "id": "t5",
        "song_views": 1829,
        "annotation_count": 38,
        "verified_count": 10,
        "unreviewed_count": 5
      }, {
        "id": "t6",
        "song_views": 1790,
        "annotation_count": 10,
        "verified_count": 5,
        "unreviewed_count": 0
      }
    ];
    clearFlashes = function() {
      return $(".flash").removeClass('flash');
    };
    getTrendingStats = function() {
      var i, _i, _ref;
      for (i = _i = 0, _ref = this.trendingJSON.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (Math.floor((Math.random() * 3) + 1) === 1) {
          this.trendingJSON[i].song_views += Math.floor((Math.random() * 10000) + 1);
        }
        if (Math.floor((Math.random() * 10) + 1) === 1) {
          this.trendingJSON[i].annotation_count += Math.floor((Math.random() * 10) + 1);
        }
        if (Math.floor((Math.random() * 20) + 1) === 1) {
          this.trendingJSON[i].verified_count += Math.floor((Math.random() * 5) + 1);
        }
        if (Math.floor((Math.random() * 20) + 1) === 1) {
          if (Math.floor((Math.random() * 2) + 1) === 1) {
            this.trendingJSON[i].unreviewed_count += Math.floor((Math.random() * 3) + 1);
          } else {
            this.trendingJSON[i].unreviewed_count -= Math.floor((Math.random() * 3) + 1);
            if (this.trendingJSON[i].unreviewed_count < 0) {
              this.trendingJSON[i].unreviewed_count = 0;
            }
          }
        }
      }
      this.trendingJSON = _.sortBy(this.trendingJSON, function(stat) {
        return -stat.song_views;
      });
      return this.trendingJSON;
    };
    reorderRows = function(stats) {
      var $table, i, _i, _ref, _results;
      $table = $(".activity-module");
      _results = [];
      for (i = _i = 0, _ref = stats.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        _results.push($table.find("#" + stats[i].id).css('top', (25 + 55 * i) + "px"));
      }
      return _results;
    };
    refreshStats = function(stats) {
      var $row, $table, i, _i, _ref, _results;
      $table = $(".activity-module");
      _results = [];
      for (i = _i = 0, _ref = stats.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        $row = $table.find("#" + stats[i].id);
        if (parseInt($row.find('.song_views').children('.count').html(), 10) !== stats[i].song_views) {
          $row.find('.song_views').children('.count').html(stats[i].song_views);
          $row.find('.song_views').addClass('flash');
        }
        if (parseInt($row.find('.annotation_count').children('.count').html(), 10) !== stats[i].annotation_count) {
          $row.find('.annotation_count').children('.count').html(stats[i].annotation_count);
          $row.find('.annotation_count').addClass('flash');
        }
        if (parseInt($row.find('.verified_count').children('.count').html(), 10) !== stats[i].verified_count) {
          $row.find('.verified_count').children('.count').html(stats[i].verified_count);
          $row.find('.verified_count').addClass('flash');
        }
        if (parseInt($row.find('.unreviewed_count').children('.count').html(), 10) !== stats[i].unreviewed_count) {
          $row.find('.unreviewed_count').children('.count').html(stats[i].unreviewed_count);
          _results.push($row.find('.unreviewed_count').addClass('flash'));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    App = function() {
      console.log('p2 ready !');
      _this.offsets = [];
      $(".activity-module li").each(function(i, obj) {
        return _this.offsets.push($(obj).position().top);
      });
      $(".activity-module li").each(function(i, obj) {
        return $(obj).css({
          'position': 'absolute',
          'top': _this.offsets[i] + 'px'
        });
      });
      return setInterval(function() {
        this.stats = getTrendingStats();
        console.log(_.pluck(this.stats, 'song_views'));
        console.log(_.pluck(this.stats, 'id'));
        reorderRows(this.stats);
        refreshStats(this.stats);
        return setTimeout(function() {
          return clearFlashes();
        }, 1000);
      }, 3000);
    };
    return App;
  });

}).call(this);
