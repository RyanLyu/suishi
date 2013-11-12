/**
 * Created by Lyu on 13-11-3.
 */

/**
 * For layout
 */

$(document).ready(function(){
//    console.log('test for jquery!');
    checkCarHeightBound();
    removeOneBound();
    submitMenuBound();
    closeSubmitMenuBound();
    matchFoodBound();
    countUpdateBound();
});

//对于购物车高度的判断
var checkCarHeight = function(){
    var $cobj = $("#car_item");
    var h1 = $cobj.height();
    var h2 = 66;
    var h3 = 8;
    var allH = h1 + h2 + h3;
    var $obj2 = $("#menu_order_container");
    $obj2.css("height",allH);
}
var checkCarHeightBound = function(){
    $("#submit_car_item").bind("click",function(){
        addNewFood();
        checkCarHeight();
    });
}
//将餐单添加到购物车中
var addNewFood = function(){
    var $food1 = $("#food_1");
    var $food2 = $("#food_2");
    var $count = $("#food_count");
    var $price = $("#calc_price");
    var name1 = $food1.val();
    var name2 = $food2.val();
    var count = $count.val();
    var price = $price.text();
    var $car = $("#car_item_clear");
    if( name1 != "点选菜品" && name2 != "点选菜品" ){
        //add
        var $html =$("<div class='foodlist'><span>&nbsp;<label>1份</label></span><div class='del'></div><div class='clear'></div></div>");
        var text = name1 + " + " + name2 + " <label>"+count+"份</label>";
        $html.find("span").html(text);
        $html.attr("data-foodinfo",name1+","+name2+","+count+","+price);
        $car.before($html);
        resetFoood();
        calcAll();
    }
}
// reset food
var resetFoood = function(){
    $("#food_1").val("点选菜品");
    $("#food_2").val("点选菜品");
    $("#food_count").val("0");
}

//移除一道配菜
var removeOne = function(self){
    var $self = $(self);
    $self.parent().animate({"width":0},100,function(){
        $(this).remove();
        checkCarHeight();
        calcAll();
    });
    //var str = "<div class='clear'></div>";
}
var removeOneBound = function(){
    $("#car_item").delegate(".del","click",function(){
        removeOne(this);
    });
}

//submit menu
var submitMenu = function(){
    var $cobj = $("#submit_menu_form_container");
    $cobj.fadeIn(300);
};
var submitMenuBound = function(){
    $("#submit_menu_form").click(function(){
        submitMenu();
    });
};
//close menu
var closeSubmitMenu = function(){
    var $cobj = $("#submit_menu_form_container");
    $cobj.fadeOut(300);
}
var closeSubmitMenuBound = function(){
    $("#close_menu_form").click(function(){
        closeSubmitMenu();
    });
}
//match food
var matchFood = function(self){
    var $self = $(self);
    var name = $self.attr('data-name');
    var price = $self.attr('data-price');
    var $food1 = $("#food_1");
    var $food2 = $("#food_2");
    if($food1.val() == "点选菜品"){
        $food1.val(name).attr('data-price',price);
        return;
    }
    if($food2.val() == "点选菜品"){
        $food2.val(name).attr('data-price',price);
    }
    $("#food_count").val("1");
    //计算价格
    calcPrice();
    return;
}
var matchFoodBound = function(){
    $("#food_choice div[data-func=matchFood]").click(function(){
        matchFood(this);
    });
}
//数字加工厂
var returnNum = function(str){
    var num = parseFloat(str);
    return num;
}
var calcPrice = function(){
    var showPrice = $("#calc_price");
    var $food1 = $("#food_1");
    var $food2 = $("#food_2");
    var $count = $("#food_count");
    var count = returnNum($count.val());
    if( !count ){
        showPrice.text("0");
        return;
    }
    var price1 = returnNum($food1.attr('data-price'));
    var price2 = returnNum($food2.attr('data-price'));
    var calcResult = (price1 + price2 * count);
    showPrice.text(calcResult);
    $count.attr('data-count',count);
}
//修改数量后重新计算
var countUpdate = function(){
    //对比前后的数量
    var $cobj = $("#food_count");
    var count1 = returnNum($cobj.attr('data-count'));
    var count2 = returnNum($("#food_count").val());
//    if( count2 == "NaN" ){
//        console.log('ad');
//    }
    if( count1 == count2 ){
        return;
    }
    calcPrice();
}
var countUpdateBound = function(){
    $("#food_count").blur(function(){
        countUpdate();
    });
}
//计算总价
var calcAll = function(){
    var priceAll = 0;
    var arr = $("#car_item div.foodlist");
    if( arr.length < 1 ){
        $("#calc_price").text("0");
        return;
    }
    $.each( arr , function( index , val ){
        var $val = $(val);
        var price = $val.attr("data-foodinfo").split(',')[3];
        price = returnNum(price);
        priceAll += price;
    });
    $("#calc_price").text(priceAll);
}