
const RADIUS = 100;
function polarToCartesian(centerX, centerY, radius, angleInRadians) {
  // var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, angle1, angle2, largeArc){

    const startAngle = angle1 < angle2 ? angle1 : angle2;
    const endAngle = angle1 < angle2 ? angle2 : angle1;

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArc ? "1" : "0", angle1 > angle2 ? "0" : "1", end.x, end.y
    ].join(" ");

    return d;       
}

const Angle = ({angle1, angle2, delta}) => {
  return (
    <svg height="210" width="500">
      <line x1="250" y1="105" x2={RADIUS*Math.cos(angle1)+250} y2={RADIUS*Math.sin(angle1)+105} style={{stroke: "red", strokeWidth:2}} />
      <line x1="250" y1="105" x2={RADIUS*Math.cos(angle2)+250} y2={RADIUS*Math.sin(angle2)+105} style={{stroke: "red", strokeWidth:2}} />
      <path d={describeArc(250, 105, 20, angle1, angle2, delta)} fill="none" strokeWidth="2" stroke="#446688"></path>
    </svg>
  )
}

export default Angle;