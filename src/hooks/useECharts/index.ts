
/**
 * 鼠标悬浮显示全部文字
 * @param {*} chart 图标
 */
export const useMouseOverFull = (chart: any, location: string) => {
  let tipName = 'EChartsTipName'
  let el = document.querySelector(`#${tipName}`) as HTMLElement;
  let html = document.querySelector('html') as HTMLElement;
  if(!el){
    el = document.createElement('div');
    el.id = tipName;
    // el.style.width = 'max-content';
    el.style.fontSize = '16px';
    el.style.color = '#ffffff';
    el.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    el.style.padding = '5px 8px';
    el.style.borderRadius = '5px';
    el.style.display = 'inline';
    el.style.position = 'absolute';
    html.append(el)
  }

  chart.on('mouseover', (event: any) => {
    if(event.componentType === location){
      el.style.display = 'inline';
      el.innerHTML = event.value;
    }

    html.addEventListener('mousemove', setCoordinate)
  });

  chart.on('mouseout', (event: any) => {
    if(event.componentType === location){
      el.style.display = 'none';
      html.removeEventListener('mousemove', setCoordinate)
    }
  })

  const setCoordinate = (event: MouseEvent) => {
    let x = event.pageX - 20;
    let y = event.pageY + 20;
    
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  }
}