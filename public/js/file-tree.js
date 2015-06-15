$.fn.fileTree = function(api_url){
    function _renderTree($node, diretories, files){
        var $newList = $('<ul class="list"></ul>');
        $node.after();

        for(var i in diretories){
            $('<a class="dir"></a>').attr('href', $node.attr('href')+'/'+diretories[i])
                                   .text(diretories[i])
                                   .appendTo($newList);
        }

        for(var j in files){
            $('<a class="file"></a>').attr('href', $node.attr('href')+'/'+files[j])
                                   .text(files[j])
                                   .appendTo($newList);
        }  

        $newList.find('a').wrap('<li>');
        $node.parent().append($newList);
    }

    function _openDir($node){
        $node.parent().addClass('opened'); 
        $.getJSON(api_url+'/'+$node.attr('href'), function(list){
               if(list && list.diretories, list.files) {
                   _renderTree($node, list.diretories, list.files);
               }
        });
    }

    function _closeDir($node){
        $node.parent().removeClass('opened'); 
        $node.parent().find('.list').remove();   
    }

    $(this).on('click', 'a.dir', function(){
        event.preventDefault();
        var $node = $(this);

        if($node.parent().hasClass('opened')){
            _closeDir($node);
        }else{
            _openDir($node);
        }
    });
};

$(function(){
    $('#fileTree').fileTree('http://localhost:8080');
});
