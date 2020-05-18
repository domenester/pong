export default []
// import { Position } from "./position";
// import { Panel } from "./panel";

// export class InfoBar {

//   private fontSize: number

//   constructor(
//     private ctx: any,
//     private position: Position,
//     private panel: Panel
//   ){
//     this.fontSize = this.panel.width / 50
//   }

//   printScore = () => {
//     this.ctx.beginPath();
//     this.ctx.fillStyle = '#000';
//     this.ctx.font = `${this.fontSize}px Arial`
//     this.ctx.fillText(
//       `Score: ${this.panel.score}`,
//       this.panel.width / 2 - (this.panel.width / 3),
//       this.panel.height / 15
//     );
//   }

//   printHigherScore = () => {
//     this.ctx.beginPath();
//     this.ctx.fillStyle = '#000';
//     this.ctx.font = `${this.fontSize}px Arial`;
//     this.ctx.fillText(
//       `Higher: ${this.panel.higherScore}`,
//       this.panel.width / 2 + (this.panel.width / 10),
//       this.panel.height / 15
//     );
//   }

//   print = () => {
//     this.ctx.beginPath();
//     this.ctx.fillStyle = '#CCC';
//     const { getX, getY } = this.position
//     this.ctx.fillRect(
//       getX(),
//       getY(),
//       this.panel.width,
//       this.panel.barHeight
//     );
//     this.printScore()
//     this.printHigherScore()
//   }
// }