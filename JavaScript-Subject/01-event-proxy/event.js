/* 
 * 事件默认的执行时间是在冒泡阶段执行，而非在捕获阶段,
 * 如果addEventListener第三个参数为true，则事件在捕获阶段执行，
 * 如果第三个参数为false，则事件在冒泡阶段执行;
 */

addEventListener('click', function(event) {}, false); // 第三个参数默认为 false 