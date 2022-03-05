const UnitSize = 240
const GutterSize = 20

const getPx = (
  units: number,
  unitSize = UnitSize,
  gutterSize = GutterSize
): number => units * unitSize - gutterSize

export { UnitSize, GutterSize, getPx }
