(function () {
'use strict';

angular.module('MagicApp',[])
.controller('AddController', AddController)
.service('ShoppingListService',ShoppingListService)
.component('shoppingList',{
  templateUrl: 'shoppinglist.html',
  controller: ShoppingListComponentController,
  bindings: {
    items: '<',
    myTitle: '@title',
    onRemove: '&'
  }
});
//.filter('change', changeThem);

// function ListItemDescription(){
//   var ddo={
//     template: '{{item.quantity}} of {{item.name}}'
//   }
//   return ddo;
// }

function ShoppingListComponentController(){
  var $ctrl= this;

  $ctrl.cookiesInList= function () {
  for (var i=0; i<$ctrl.items.length; i++){
    var name= $ctrl.items[i].name;
    if (name.toLowerCase().indexOf("cookie") !== -1){
      return true;
    }
  }

  return false;
};
}

AddController.$inject=['ShoppingListService','$scope'];
function AddController (ShoppingListService, $scope) {
  //$scope.itemName="";
  //$scope.itemQuantity="";
  var shoppinglist=this;

  shoppinglist.items=ShoppingListService.getItems();
  var origTitle= "";
  shoppinglist.title= origTitle + ""+ shoppinglist.items.length + " Thẻ";

  shoppinglist.itemName="";
  shoppinglist.itemQuantity="";

  shoppinglist.Abrakadabra=function(){
      ShoppingListService.addItem(shoppinglist.itemName,shoppinglist.itemQuantity);
      shoppinglist.title= origTitle + ""+shoppinglist.items.length+ " Thẻ";
      shoppinglist.itemName="";
      shoppinglist.itemQuantity="";
    }

  shoppinglist.print=function(){
        var printContents = document.getElementById('mainContent').innerHTML;
        var popupWin = window.open('', '_blank', 'width=800,height=800');
        popupWin.document.open();
        popupWin.document.write('<html><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
      };

  shoppinglist.removeItem=function(itemIndex){
    this.lastRemoved="Đã xóa thẻ " + this.items[itemIndex].name;
    ShoppingListService.removeItem(itemIndex);
    this.title= origTitle + ""+shoppinglist.items.length+ " Thẻ";
  };

}

function ShoppingListService(){
  var service=this;
  var items=[];

  service.addItem= function(itemName, itemQuantity) {
    var item={
      name: itemName,
      quantity: itemQuantity
    };
    items.unshift(item);
  };

  service.getItems= function(){
    return items;
  };

  service.removeItem= function(itemIndex){
    items.splice(itemIndex,1);
  };


}

})();
