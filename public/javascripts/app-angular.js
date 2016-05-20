angular.module("productManager", [])
  .controller("ProductList", function($scope, $http){

    //每页显示商品数量
    $scope.itemsNum = 5;


    //获取指定路径中的商品数据,并将结果对象赋值给scope.products;可用于ajax
    $http.get("data/products.json").success(function(res){
      if(res.length < 1){
        $scope.products = {}
      }else{
        $scope.products = res;
      }
    });
  })
  .directive("findBtn", function(){
    return {
      link: function(scope, element){
        element.on('click', function(event){
          
        })
      }
    }
  })
  .directive("pList", function(){
      return {
        restrict : "E",
        template : "<ul><li ng-repeat='x in data'><span ng-bind='x.P_barcode |currency:$'></span><span ng-bind='x.P_brand'></span><span ng-bind='x.P_name'></span></li></ul>",
        replace  : true,
        scope    : {
          //从该元素的属性名为"da"的属性中获取其值做为本作用于中"data"的值
          data : "=da"
        }
        /*
         link: function(scope, element, attrs) {
         element.append("<li ng-repeat='x in value'><span>{{ x.P_barcode }}</span><span>{{ x.P_brand }}</span><span>{{ x.P_name }}</span></li>");
         scope.$apply("products");
         }
         */
      }
    }
  )
;
