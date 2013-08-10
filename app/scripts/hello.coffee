define ["jquery"], ($) ->
  "use strict"

  $(document).ready -> 
    @defAnchorYTriggers = []
    @lastOffset = 0
    @activeDefintion = -1
    @newActiveDefintion = 0
    @lyricsOffset = $(".lyrics").offset().top - 50

    $(".lyrics a").click (event) =>
      event.preventDefault()
      @targetOffset = $(event.target).offset().top - @lyricsOffset
      if $(event.target).hasClass('first')
        @targetOffset -= 13
      $.scrollTo(@targetOffset, 200 )

    $(".lyrics a").each (i,obj) =>
      if @lastOffset != $(obj).offset().top
        @lastOffset = $(obj).offset().top
        @defAnchorYTriggers.push(@lastOffset - @lyricsOffset)
      else # TODO - TEMP FIX - support a second comment on the same line
        @defAnchorYTriggers.push(@lastOffset - @lyricsOffset + 13)

    console.log(@defAnchorYTriggers)

    $(document).scroll (event)  -> 
      @scrollTop = $(document).scrollTop()

      for i in [0...@defAnchorYTriggers.length]
        if @defAnchorYTriggers[i] > @scrollTop 
          @newActiveDefintion = i 
          console.log i,@defAnchorYTriggers[i], @scrollTop 
          break

      if @newActiveDefintion != @activeDefintion
        @activeDefintion = @newActiveDefintion
        $(".definition.show").removeClass('show')
        $(".definition").eq(@activeDefintion).addClass('show')
        $(".lyrics a.highlight").removeClass('highlight')
        $(".lyrics a").eq(@activeDefintion).addClass('highlight')
        
      @scrollTop = @scrollTop - (@scrollTop % 26) + 12
      @defLineTop = @scrollTop + 420
      if (parseInt($("#definitions_line").css('top'),10) != @defLineTop)
        $("#definitions_line").css('top',@defLineTop)
    
