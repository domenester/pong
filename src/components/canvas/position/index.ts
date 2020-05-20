export class Position {

  private initialX: number
  private initialY: number

  constructor(
    private X: number,
    private Y: number
  ) {
    this.initialX = Math.ceil(X)
    this.initialY = Math.ceil(Y)
  }

  reset = () => {
    this.setX(this.initialX)
    this.setY(this.initialY)
  }

  getX = () => {
    return this.X
  }

  getY = () => {
    return this.Y
  }

  setX = (value: number) => {
    this.X = Math.ceil(value)
  }

  setY = (value: number) => {
    this.Y = Math.ceil(value)
  }
}