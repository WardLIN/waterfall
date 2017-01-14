window.onload=function(){
	waterFall('main','box');
	//模拟后台相应数据json
	var dataInt={
		"data":
		[
         {"src":"0.jpg"},
         {"src":"1.jpg"},
         {"src":"2.jpg"},
         {"src":"3.jpg"},
         {"src":"4.jpg"},
         {"src":"5.jpg"},
         {"src":"6.jpg"}
		]
	}
	window.onscroll=function(){
		if(checkScrollSlide){
			//将数据块渲染到当前页面的尾部
		  var oParent=document.getElementById("main");
		  for(var i=0;i<dataInt.data.length;i++){
	          var oBox=document.createElement("div");
	          oBox.className="box";
	          oParent.appendChild(oBox);
	          var oPic=document.createElement("div");
	          oPic.className="pic";
	          oBox.appendChild(oPic);
	          var img=document.createElement("img");
	          img.setAttribute("src",dataInt.data[i]);
	          img.src="pic/"+dataInt.data[i].src;
	          oPic.appendChild(img);
         }
          dataInt=null;//清空数据块，防止无限加载
          waterFall('main','box');//对页面新元素进行布局渲染
		}
	}
}
function waterFall(parent,box){
	//将main下的class为box的所有元素取出来
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	console.log(oBoxs.length);
	//计算整个页面显示的列数（页面宽/box宽）
	var oBoxW=oBoxs[0].offsetWidth;
	// console.log(oBoxW);
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
	// console.log(cols);
	//设置main的宽
	oParent.style.cssText="width:"+oBoxW*cols+"px;margin:0 auto;"
	var hArr=[];//存放每列高度的数组
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null,hArr);//获取当前数组最小高度值
			// console.log(minH);
			var index=getMinhIndex(hArr,minH);//获取数组最小高度的索引
			//console.log(index);
			oBoxs[i].style.position="absolute";//将之后的图片依次绝对定位
			oBoxs[i].style.top=minH+"px";
			oBoxs[i].style.left=index*oBoxW+"px";//计算新图片所在的位置并赋值
			hArr[index]+=oBoxs[i].offsetHeight;//变化数组列的高度值，因为加上了一张图片
		}
		//console.log(hArr);
	}

}
//根据class获取元素
function getByClass(parent,clsName){
   var boxArr=new Array(),//用来存储获取到的所有class为box的元素
       oElements=parent.getElementsByTagName("*");
       for(var i=0;i<oElements.length;i++){
       	if(oElements[i].className==clsName){
       		boxArr.push(oElements[i]);
       	}
       }
    return boxArr;
}
function getMinhIndex(arr,val){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==val){
			return i;
		}
	}

}
//检测是否具备滚动条加载数据块条件
function checkScrollSlide(){
	var oParent=document.getElementById("main");
	var oBoxs=getByClass(oParent,"box");
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;//混杂模式和标准模式下的scrollTop获取
	//console.log(scrollTop);
    var height=document.body.clientHeight||document.documentElement.clientHeight;//混杂模式和标准模式下的浏览器窗口高度获取
    return (lastBoxH<scrollTop+height)?true:false;//检测最后一个box高度是否小于滚动高度+窗口高度，返回布尔值

}