function createEle(){
    const container = document.getElementById('cesiumContainer');
    let disLonLat = document.createElement('div');
    disLonLat.id = 'inputText';
    disLonLat.style.border = 'none';
    disLonLat.style.zIndex = 5;
    disLonLat.style.position = 'absolute';
    disLonLat.style.bottom = 0;
    disLonLat.style.lineHeight = 18 + 'px';
    disLonLat.style.left = 0;
    disLonLat.style.backgroundColor = '#707266';
    disLonLat.style.fontSize = 16 + 'px';
    disLonLat.style.color = 'white';
    disLonLat.style.width = 100 + 'vw';
    disLonLat.style.height = 20 + 'px';

    container.appendChild(disLonLat);
}
createEle();

var inputText=document.getElementById('inputText');
new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas).setInputAction(function(event){
    //屏幕坐标转世界坐标
    let ray=viewer.camera.getPickRay(event.endPosition);
    let cartesian=viewer.scene.globe.pick(ray,viewer.scene);
    if(cartesian){
        //将笛卡尔坐标转换为地理坐标
        let cartographic=Cesium.Cartographic.fromCartesian(cartesian);
        //将弧度转换为度的十进制表示
        let lon=Cesium.Math.toDegrees(cartographic.longitude);
        let lat=Cesium.Math.toDegrees(cartographic.latitude);
        //获取海拔高度
        let height = cartographic.height;
        //let height=viewer.scene.globe.getHeight(cartographic);
        //viewer.scene.debugShowFramesPerSecond = false;  //是否展示FPS和MS
        inputText.innerText=`经度：${lon.toFixed(3)}，纬度：${lat.toFixed(3)}，高程：${height.toFixed(3)}`;
    }
},Cesium.ScreenSpaceEventType.MOUSE_MOVE);