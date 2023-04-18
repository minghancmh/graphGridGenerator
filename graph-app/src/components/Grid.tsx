import React from 'react';


interface CartesianGridProps {
  width: any;
  height: any;
  showXaxis: any;
  showYaxis: any;
  scaleX : any;
  scaleY : any;
  xStep : any;
  yStep : any;
  fontFamily: any;
  axisLabelFont:any;
  axisTicksFont:any;
  gridLineColor:any;
  axisThickness: any;
  separatorThickness: any;
  
}


const CartesianGrid = (props: CartesianGridProps) => {

  
  // const width = 200; // 24cm converted to mm
  // const height = 240; // 20cm converted to mm
  const spacing = 10; // 2cm converted to mm
  const darkLineThickness = 0.5; // thickness of darker lines in mm
  const lightLineThickness = 0.1; // thickness of lighter lines in mm
  const mediumLineThickness = 0.25
  const arrowThickness = 1.0;



  const darkLines = [];
  const lightLines = [];
  const mediumLines = [];
  const axisLines = [];
  const interval = 20;
  const verticalLines = [];
  const horizontalLines = []
  const intervaly = 20;



  // vertical lines
  for (let x = 0; x <= props.width; x += spacing) {
    const thickness = x%(2*spacing) === 0? darkLineThickness : mediumLineThickness;
    const line = (
      <line
        key={`v${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={props.height}
        stroke={props.gridLineColor}
        strokeWidth={thickness}
      />
    );
    thickness === darkLineThickness ? darkLines.push(line) : mediumLines.push(line);
  }
  // vertical lines

  const x=props.scaleY*20; // y-axis
  const thicknessX = props.axisThickness;
  const lineX = (
    <svg>
       <defs>
    <marker
      id="triangle"
      viewBox="0 0 10 10"
      refX={props.height*2}
      refY="5"
      markerUnits="userSpaceOnUse"
      markerWidth="5"
      markerHeight="10"
      orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#00" transform='rotate(180,5,5)'/>
    </marker>
  </defs>
      <line
      x1={x}
      y1={1}
      x2={x}
      y2={props.height}
      stroke="black"
      strokeWidth={thicknessX}
      markerEnd="url(#triangle)"
    />

    </svg>
    
  );
  if (props.showYaxis) {
    axisLines.push(lineX);
    const axislabelY = (
      <text
      key={`axislabelY${x}`}
      x={x-5}
      y={5}
      textAnchor="middle"
      fontSize={props.axisLabelFont}
      fill="black"
      fontFamily={props.fontFamily}
      fontStyle='italic'
    >
      y
    </text>
      );
      verticalLines.push(axislabelY)
    for (let y = 20; y < props.height; y += intervaly) {

    
      const labely = (
        <text
          key={`labely${y}`}
          x={x-6}
          y={y+1.5}
          textAnchor="middle"
          fontSize={props.axisTicksFont}
          fill="black"
          fontFamily={props.fontFamily}
        >
          {(props.height-y-props.scaleX*20)/(20/props.yStep)===0?"":(props.height-y-props.scaleX*20)/(20/props.yStep)}


        </text>
      );
      verticalLines.push(labely);
    

        const separator = (
          <line
            key={`separator${y}`}
            x1={x-2.5}
            y1={y}
            x2={x+2.5}
            y2={y}
            stroke="black"
            strokeWidth={props.separatorThickness}
          />
        );

        {(props.height-y-props.scaleX*20)/(20/props.yStep)===0?"":horizontalLines.push(separator)}
        
    
    }
  } 


const y=props.height-20*props.scaleX; // x-axis
const thicknessY = props.axisThickness;
const lineY = (
  <svg>
  <defs>
<marker
 id="axis"
 viewBox="0 0 10 10"
 refX="0"
 refY="5"
 markerUnits="userSpaceOnUse"
 markerWidth="5"
 markerHeight="10"
 orient="auto">
 <path d="M 0 0 L 10 5 L 0 10 z" fill="#00" />
</marker>
</defs>
  <line
    x1={0}
    y1={y}
    x2={props.width-5}
    y2={y}
    stroke="black"
    strokeWidth={thicknessY}
    markerEnd='url(#axis)'
  />
  
  </svg>
);
if (props.showXaxis) {
  axisLines.push(lineY);
  const axislabelX = (
  <text
  key={`axislabelX${x}`}
  x={props.width-5}
  y={y+7}
  textAnchor="middle"
  fontSize={props.axisLabelFont}
  fill="black"
  fontFamily={props.fontFamily}
  fontStyle='italic'
>
  x
</text>
  );
  verticalLines.push(axislabelX)

  const zeroLabel = (
    <text
    key={`zeroLabel${x}`}
    x={props.scaleY*20 -4}
    y={y+7}
    textAnchor="middle"
    fontSize={props.axisTicksFont}
    fill="black"
    fontFamily={props.fontFamily}
  >
    0
  </text>
    );
    verticalLines.push(zeroLabel)
  


for (let x = 20; x < props.width; x += interval) {

  const label = (
    <text
      key={`label${x}`}
      x={x}
      y={y+7}
      textAnchor="middle"
      fontSize={props.axisTicksFont}
      fill="black"
      fontFamily={props.fontFamily}
    >
      {(x-props.scaleY*20)/(20/props.xStep)===0?"":(x-props.scaleY*20)/(20/props.xStep)}
    </text>
  );
  verticalLines.push(label);


    const separator = (
      <line
        key={`separator${x}`}
        x1={x}
        y1={y-2.5}
        x2={x}
        y2={y+2.5}
        stroke="black"
        strokeWidth={props.separatorThickness}
      />
    );
    {(x-props.scaleY*20)/(20/props.xStep)===0?"":verticalLines.push(separator)}
    

}
} 

  for (let x = 0; x <= props.width; x += 2) {
    const thickness = lightLineThickness;
    const line = (
      <line
        key={`v${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={props.height}
        stroke={props.gridLineColor}
        strokeWidth={thickness}
      />
    );
    lightLines.push(line);
  }

  // horizontal lines
  for (let y = 0; y <= props.height; y += spacing) {
    const thickness = y%(2*spacing) === 0? darkLineThickness : mediumLineThickness;
    const line = (
      <line
        key={`h${y}`}
        x1={0}
        y1={y}
        x2={props.width}
        y2={y}
        stroke={props.gridLineColor}
        strokeWidth={thickness}
      />
    );
    thickness === darkLineThickness ? darkLines.push(line) : mediumLines.push(line);
}

      for (let y = 0; y <= props.height; y += 2) {
        const thickness = lightLineThickness;
        const line = (
          <line
          key={`h${y}`}
          x1={0}
          y1={y}
          x2={props.width}
          y2={y}
          stroke={props.gridLineColor}
          strokeWidth={thickness}
          />
        );
        lightLines.push(line);
      }

  return (
    <svg viewBox={`0 0 ${props.width} ${props.height}`} xmlns="http://www.w3.org/2000/svg">


      {darkLines}
      {lightLines}
      {mediumLines}
      {axisLines}
      {verticalLines}
      {horizontalLines}
    </svg>
  );
};

export default CartesianGrid;


