(function() {
  define(["jquery"], function($) {
    "use strict";
    return $(document).ready(function() {
      var _this = this;
      this.defAnchorYTriggers = [];
      this.lastOffset = 0;
      this.activeDefintion = -1;
      this.newActiveDefintion = 0;
      this.lyricsOffset = $(".lyrics").offset().top - 50;
      $(".lyrics a").click(function(event) {
        event.preventDefault();
        _this.targetOffset = $(event.target).offset().top - _this.lyricsOffset;
        if ($(event.target).hasClass('first')) {
          _this.targetOffset -= 13;
        }
        return $.scrollTo(_this.targetOffset, 200);
      });
      $(".lyrics a").each(function(i, obj) {
        if (_this.lastOffset !== $(obj).offset().top) {
          _this.lastOffset = $(obj).offset().top;
          return _this.defAnchorYTriggers.push(_this.lastOffset - _this.lyricsOffset);
        } else {
          return _this.defAnchorYTriggers.push(_this.lastOffset - _this.lyricsOffset + 13);
        }
      });
      console.log(this.defAnchorYTriggers);
      return $(document).scroll(function(event) {
        var i, _i, _ref;
        this.scrollTop = $(document).scrollTop();
        for (i = _i = 0, _ref = this.defAnchorYTriggers.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          if (this.defAnchorYTriggers[i] > this.scrollTop) {
            this.newActiveDefintion = i;
            console.log(i, this.defAnchorYTriggers[i], this.scrollTop);
            break;
          }
        }
        if (this.newActiveDefintion !== this.activeDefintion) {
          this.activeDefintion = this.newActiveDefintion;
          $(".definition.show").removeClass('show');
          $(".definition").eq(this.activeDefintion).addClass('show');
          $(".lyrics a.highlight").removeClass('highlight');
          $(".lyrics a").eq(this.activeDefintion).addClass('highlight');
        }
        this.scrollTop = this.scrollTop - (this.scrollTop % 26) + 12;
        this.defLineTop = this.scrollTop + 420;
        if (parseInt($("#definitions_line").css('top'), 10) !== this.defLineTop) {
          return $("#definitions_line").css('top', this.defLineTop);
        }
      });
    });
  });

}).call(this);
