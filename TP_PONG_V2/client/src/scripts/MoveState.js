const LEFT = Symbol(0);
const RIGHT = Symbol(1);
const UP = Symbol(2);
const DOWN = Symbol(3);
const DOWNRIGHT = Symbol(4)
const DOWNLEFT = Symbol(5);
const UPRIGHT = Symbol(6)
const UPLEFT = Symbol(7);
const NONE = Symbol(8);

export default class MoveState {
  static get LEFT() {return LEFT;}
  static get RIGHT() {return RIGHT;}
  static get UP() {return UP;}
  static get DOWN() {return DOWN;}
  static get DOWNRIGHT() {return DOWNRIGHT;}
  static get DOWNLEFT() {return DOWNLEFT;}
  static get UPRIGHT() {return UPRIGHT;}
  static get UPLEFT() {return UPLEFT;}
  static get NONE() {return NONE;}
}
