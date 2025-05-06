const RADIUS = 100;
function polarToCartesian(centerX, centerY, radius, angleInRadians) {
  // var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, angle1, angle2, largeArc) {
  const startAngle = angle1 < angle2 ? angle1 : angle2;
  const endAngle = angle1 < angle2 ? angle2 : angle1;

  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArc ? '1' : '0',
    angle1 > angle2 ? '0' : '1',
    end.x,
    end.y,
  ].join(' ');

  return d;
}

const HEIGHT = 200;
const WIDTH = 300;
const ARC_RADIUS = 20;
const LINE_COLOUR = '#DF6247';
const ARC_COLOUR = '#446688';

export function Angle({ angle1, angle2, largeArc }) {
  return (
    <div>
      <svg height={HEIGHT} width={WIDTH}>
        <path
          d={describeArc(
            WIDTH / 2,
            HEIGHT / 2,
            ARC_RADIUS,
            angle1,
            angle2,
            largeArc
          )}
          fill="none"
          strokeWidth="2"
          stroke={ARC_COLOUR}
        ></path>
        <line
          x1={WIDTH / 2}
          y1={HEIGHT / 2}
          x2={RADIUS * Math.cos(angle1) + WIDTH / 2}
          y2={RADIUS * Math.sin(angle1) + HEIGHT / 2}
          style={{ stroke: LINE_COLOUR, strokeWidth: 2 }}
        />
        <line
          x1={WIDTH / 2}
          y1={HEIGHT / 2}
          x2={RADIUS * Math.cos(angle2) + WIDTH / 2}
          y2={RADIUS * Math.sin(angle2) + HEIGHT / 2}
          style={{ stroke: LINE_COLOUR, strokeWidth: 2 }}
        />
        <circle
          cx={WIDTH / 2}
          cy={HEIGHT / 2}
          r={3}
          fill="black"
          stroke="white"
        />
      </svg>
    </div>
  );
}
